/**
 * Dynamic basePath detection for subpath deployments.
 * Works at runtime — no build-time env vars needed.
 * Same build serves both:
 *   - senseikatana.com/works/whm-withnext (with subpath)
 *   - 8cc79ec9.insforge.site (without subpath)
 */

const KNOWN_PREFIXES = ["/works/whm-withnext"];

let cached: string | null = null;

/**
 * Returns the basePath prefix if the app is served under a subpath.
 * Returns "" if served at root.
 */
export function getBasePath(): string {
	if (cached !== null) return cached;

	if (typeof window === "undefined") {
		cached = "";
		return cached;
	}

	const pathname = window.location.pathname;
	for (const prefix of KNOWN_PREFIXES) {
		if (pathname.startsWith(prefix)) {
			cached = prefix;
			return cached;
		}
	}

	cached = "";
	return cached;
}

/**
 * Prepends the basePath to a relative path.
 * withBasePath("/api/products") → "/works/whm-withnext/api/products"
 */
export function withBasePath(path: string): string {
	const base = getBasePath();
	if (!base) return path;
	return `${base}${path}`;
}
