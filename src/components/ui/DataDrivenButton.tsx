import type { ReactNode } from "react";
import { Button } from "@patternfly/react-core";
import type { ButtonProps } from "@patternfly/react-core";
import { ExternalLinkSquareAltIcon } from "@patternfly/react-icons";
import type { DataLink } from "@site/src/types/content";
import "./DataDrivenButton.css";

type DataDrivenButtonProps = Omit<ButtonProps, "component"> & {
  link: DataLink;
};

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

export default function DataDrivenButton({
  link,
  variant = "link",
  isInline,
  icon,
  children,
  ...rest
}: DataDrivenButtonProps): ReactNode {
  const external = link.isExternal ?? isExternalHref(link.href);

  return (
    <Button
      variant={variant}
      isInline={isInline}
      component="a"
      href={link.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      icon={icon ?? (external ? <ExternalLinkSquareAltIcon /> : undefined)}
      iconPosition="end"
      {...rest}
      className={`data-driven-button ${rest.className ?? ""}`}
    >
      {children ?? link.label}
    </Button>
  );
}
