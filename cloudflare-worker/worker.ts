/**
 * Cloudflare Worker — Reverse Proxy + Landing Page
 *
 * - / → Landing page (portfolio)
 * - /works/whm-withnext/* → Proxy a InsForge (WarehouseFlow SGA)
 * - /works/* → Libre para otros proyectos
 */

interface Env {
	[key: string]: string;
}

interface WorkerHandler {
	fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response>;
}

const UPSTREAM: string = "https://8cc79ec9.insforge.site";
const PROJECT_PATH: string = "/works/whm-withnext";

const REDIRECT_STATUSES: readonly number[] = [301, 302, 303, 307, 308];

const LANDING_HTML: string = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>senseikatana — Portfolio</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #0a0a0a;
      color: #ededed;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }
    h1 { font-size: 2rem; margin-bottom: 1rem; }
    p { color: #a1a1aa; max-width: 400px; text-align: center; line-height: 1.6; }
    .links { margin-top: 2rem; display: flex; flex-direction: column; gap: 1rem; }
    a {
      color: #818cf8;
      text-decoration: none;
      padding: 0.75rem 1.5rem;
      border: 1px solid #27272a;
      border-radius: 0.75rem;
      transition: all 0.2s;
    }
    a:hover { background: #18181b; border-color: #818cf8; }
  </style>
</head>
<body>
  <h1>senseikatana</h1>
  <p>Proyectos y experimentos de desarrollo.</p>
  <div class="links">
    <a href="/works/whm-withnext">WarehouseFlow SGA</a>
  </div>
</body>
</html>`;

const worker: WorkerHandler = {
	async fetch(request: Request, _env: Env, _ctx: ExecutionContext): Promise<Response> {
		const url: URL = new URL(request.url);
		const pathname: string = url.pathname;

		// Landing page en la raíz
		if (pathname === "/" || pathname === "") {
			return new Response(LANDING_HTML, {
				headers: { "Content-Type": "text/html; charset=utf-8" },
			});
		}

		// Solo interceptar rutas que empiecen con /works/whm-withnext
		if (!pathname.startsWith(PROJECT_PATH)) {
			return fetch(request);
		}

		// Construir la URL upstream: quitar el prefijo de subruta
		const upstreamPath: string = pathname.slice(PROJECT_PATH.length) || "/";
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

				// Reescribir rutas absolutas de Next.js
				body = body.replace(
					/(href|src|action)="\/(?!works\/whm-withnext)/g,
					`$1="${PROJECT_PATH}/`,
				);
				body = body.replace(
					/(href|src|action)='\/(?!works\/whm-withnext)/g,
					`$1='${PROJECT_PATH}/`,
				);

				// Reescribir URLs en scripts inline
				body = body.replace(/fetch\("\/api\//g, `fetch("${PROJECT_PATH}/api/`);
				body = body.replace(/fetch\('\/api\//g, `fetch('${PROJECT_PATH}/api/`);

				const newHeaders: Headers = new Headers(response.headers);
				newHeaders.delete("Content-Length");

				return new Response(body, {
					status: response.status,
					statusText: response.statusText,
					headers: newHeaders,
				});
			}

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
			return `${originalUrl.origin}${PROJECT_PATH}${redirectUrl.pathname}${redirectUrl.search}`;
		}
		return location;
	} catch {
		if (location.startsWith("/")) {
			return `${PROJECT_PATH}${location}`;
		}
		return location;
	}
}

export default worker;
