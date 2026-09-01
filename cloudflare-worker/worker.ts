/**
 * Cloudflare Worker — Reverse Proxy
 * senseikatana.com/works/whm-withnext/* → 8cc79ec9.insforge.site/*
 *
 * Este worker reescribe las URLs para servir el proyecto
 * desde la subruta /works/whm-withnext sin que Next.js
 * detecte un basePath incorrecto.
 */

interface Env {
	[key: string]: string;
}

interface WorkerHandler {
	fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response>;
}

const UPSTREAM: string = "https://8cc79ec9.insforge.site";
const BASE_PATH: string = "/works/whm-withnext";

const REDIRECT_STATUSES: readonly number[] = [301, 302, 303, 307, 308];

const worker: WorkerHandler = {
	async fetch(request: Request, _env: Env, _ctx: ExecutionContext): Promise<Response> {
		const url: URL = new URL(request.url);
		const pathname: string = url.pathname;

		// Solo interceptar rutas que empiecen con /works/whm-withnext
		if (!pathname.startsWith(BASE_PATH)) {
			return fetch(request);
		}

		// Construir la URL upstream: quitar el prefijo de subruta
		const upstreamPath: string = pathname.slice(BASE_PATH.length) || "/";
		const upstreamUrl: URL = new URL(upstreamPath + url.search, UPSTREAM);

		// Clonar headers y añadir los necesarios para el proxy
		const headers: Headers = new Headers(request.headers);
		headers.set("Host", upstreamUrl.host);
		headers.set("X-Forwarded-Host", url.host);
		headers.set("X-Forwarded-Proto", url.protocol.replace(":", ""));
		headers.set("X-Original-Path", pathname);

		// Crear la request al upstream
		const upstreamRequest: Request = new Request(upstreamUrl.toString(), {
			method: request.method,
			headers,
			body: request.body,
			redirect: "manual",
		});

		try {
			const response: Response = await fetch(upstreamRequest);

			// Si es un redirect, reescribir la Location header
			if (REDIRECT_STATUSES.includes(response.status)) {
				const location: string | null = response.headers.get("Location");
				if (location) {
					const newLocation: string = rewriteRedirect(location, upstreamUrl, url);
					const newHeaders: Headers = new Headers(response.headers);
					newHeaders.set("Location", newLocation);
					return new Response(response.body, {
						status: response.status,
						statusText: response.statusText,
						headers: newHeaders,
					});
				}
			}

			// Para respuestas HTML, reescribir las URLs de assets
			const contentType: string = response.headers.get("Content-Type") || "";
			if (contentType.includes("text/html")) {
				let body: string = await response.text();

				// Reescribir rutas absolutas de Next.js (/assets/, /_next/, etc.)
				body = body.replace(
					/(href|src|action)="\/(?!works\/whm-withnext)/g,
					`$1="${BASE_PATH}/`,
				);
				body = body.replace(
					/(href|src|action)='\/(?!works\/whm-withnext)/g,
					`$1='${BASE_PATH}/`,
				);

				// Reescribir URLs en scripts inline (fetch, etc.)
				body = body.replace(/fetch\("\/api\//g, `fetch("${BASE_PATH}/api/`);
				body = body.replace(/fetch\('\/api\//g, `fetch('${BASE_PATH}/api/`);

				const newHeaders: Headers = new Headers(response.headers);
				newHeaders.delete("Content-Length");

				return new Response(body, {
					status: response.status,
					statusText: response.statusText,
					headers: newHeaders,
				});
			}

			// Para assets (JS, CSS, imágenes), servir directamente
			return response;
		} catch (err: unknown) {
			const message: string = err instanceof Error ? err.message : "Unknown error";
			return new Response(`Proxy Error: ${message}`, { status: 502 });
		}
	},
};

/**
 * Reescribe redirects del upstream para apuntar a la subruta correcta.
 */
function rewriteRedirect(location: string, upstreamUrl: URL, originalUrl: URL): string {
	try {
		const redirectUrl: URL = new URL(location, upstreamUrl);
		if (redirectUrl.host === upstreamUrl.host) {
			return `${originalUrl.origin}${BASE_PATH}${redirectUrl.pathname}${redirectUrl.search}`;
		}
		return location;
	} catch {
		if (location.startsWith("/")) {
			return `${BASE_PATH}${location}`;
		}
		return location;
	}
}

export default worker;
