import { useBaseUrlUtils } from "@docusaurus/useBaseUrl";

/**
 * Checks if a URL is external (starts with http:// or https://)
 */
export function isExternalUrl(url: string): boolean {
  return url.startsWith("http://") || url.startsWith("https://");
}

/**
 * Returns helper functions for working with URLs:
 * - getSafeHref: Applies useBaseUrlUtils for internal URLs, returns external URLs as-is
 * - isExternal: Checks if a URL is external
 *
 * Can be safely used in loops and iterations.
 */
export function useSafeHref() {
  const { withBaseUrl } = useBaseUrlUtils();

  return {
    getSafeHref: (href: string): string => {
      if (isExternalUrl(href)) {
        return href;
      }
      return withBaseUrl(href);
    },
    isExternal: isExternalUrl,
  };
}
