/**
 * Cloudflare Worker — Reverse Proxy + Landing Page
 *
 * - / → Landing page (portfolio)
 * - /works/whm-withnext/* → Proxy a InsForge (WarehouseFlow SGA)
 * - /works/* → Libre para otros proyectos
 *
 * Note: basePath is handled by Next.js (app/lib/base-path.ts).
 * The Worker only strips the prefix and proxies.
 */

interface Env {
	[key: string]: string;
}

interface WorkerHandler {
	fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response>;
}

const UPSTREAM = "https://8cc79ec9.insforge.site";
const PROJECT_PATH = "/works/whm-withnext";

const REDIRECT_STATUSES: readonly number[] = [301, 302, 303, 307, 308];

const LANDING_HTML = `<!DOCTYPE html>
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
	async fetch(request: Request): Promise<Response> {
		const url = new URL(request.url);
		const pathname = url.pathname;

		// Landing page
		if (pathname === "/" || pathname === "") {
			return new Response(LANDING_HTML, {
				headers: { "Content-Type": "text/html; charset=utf-8" },
			});
		}

		// Only intercept /works/whm-withnext
		if (!pathname.startsWith(PROJECT_PATH)) {
			return fetch(request);
		}

		// Strip prefix and proxy
		const upstreamPath = pathname.slice(PROJECT_PATH.length) || "/";
		const upstreamUrl = new URL(upstreamPath + url.search, UPSTREAM);

		const headers = new Headers(request.headers);
		headers.set("Host", upstreamUrl.host);
		headers.set("X-Forwarded-Host", url.host);
		headers.set("X-Forwarded-Proto", url.protocol.replace(":", ""));

		try {
			const response = await fetch(
				new Request(upstreamUrl.toString(), {
					method: request.method,
					headers,
					body: request.body,
					redirect: "manual",
				}),
			);

			// Rewrite redirects
			if (REDIRECT_STATUSES.includes(response.status)) {
				const location = response.headers.get("Location");
				if (location) {
					const newHeaders = new Headers(response.headers);
					newHeaders.set("Location", rewriteRedirect(location, upstreamUrl, url));
					return new Response(response.body, {
						status: response.status,
						statusText: response.statusText,
						headers: newHeaders,
					});
				}
			}

			return response;
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : "Unknown error";
			return new Response(`Proxy Error: ${message}`, { status: 502 });
		}
	},
};

function rewriteRedirect(location: string, upstreamUrl: URL, originalUrl: URL): string {
	try {
		const redirectUrl = new URL(location, upstreamUrl);
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
