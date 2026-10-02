// src/features/sidebar/nav-utils.ts

// URL gốc cần match chính xác (không match prefix)
const ROOT_URLS = new Set<string>(['/dashboard']);

export function normalizePath(p: string): string {
    if (!p) return '/';
    const withSlash = p.startsWith('/') ? p : `/${p}`;
    return withSlash.replace(/\/+$/, '') || '/';
}

export function isPathActive(
    pathname: string,
    href: string,
    options: { exact?: boolean } = {},
): boolean {
    const { exact = false } = options;
    const target = normalizePath(href);
    const current = normalizePath(pathname);

    if (current === target) return true;
    if (exact) return false;
    return current.startsWith(target + '/');
}

export function isNavActive(pathnameWithQuery: string, href: string): boolean {
    const [hrefPath, hrefQuery = ''] = href.split('?');
    const [curPath, curQuery = ''] = pathnameWithQuery.split('?');

    const exact = ROOT_URLS.has(normalizePath(hrefPath));
    if (!isPathActive(curPath, hrefPath, { exact })) return false;

    if (hrefQuery) {
        const hrefParams = new URLSearchParams(hrefQuery);
        const curParams = new URLSearchParams(curQuery);
        for (const [k, v] of hrefParams) {
            if (curParams.get(k) !== v) return false;
        }
    }
    return true;
}