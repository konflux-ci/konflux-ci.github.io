import type { ReactNode, CSSProperties } from "react";
import Link from "@docusaurus/Link";
import { isExternalUrl } from "@site/src/hooks/useSafeHref";

interface SafeLinkProps {
  href: string;
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
}

/**
 * SafeLink component that automatically:
 * - Uses Docusaurus Link for internal URLs (handles base URL automatically)
 * - Uses anchor tag for external URLs with target="_blank" and rel attributes
 * - Uses anchor tag for placeholder "#" links
 */
export default function SafeLink({
  href,
  children,
  style,
  className,
}: SafeLinkProps) {
  const external = isExternalUrl(href);
  const isPlaceholder = href === "#";

  // Use anchor tag for external URLs and placeholders
  if (external || isPlaceholder) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        style={style}
        className={className}
      >
        {children}
      </a>
    );
  }

  // Use Docusaurus Link for internal URLs
  return (
    <Link to={href} style={style} className={className}>
      {children}
    </Link>
  );
}
