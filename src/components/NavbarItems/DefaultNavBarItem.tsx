import React from "react";
import type { ReactNode } from "react";
import { Button } from "@patternfly/react-core";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import isInternalUrl from "@docusaurus/isInternalUrl";
import { isRegexpStringMatch } from "@docusaurus/theme-common";
import clsx from "clsx";

// Import the type from Docusaurus
import type { Props as DefaultNavbarItemProps } from "@theme/NavbarItem/DefaultNavbarItem";
import { ExternalLinkSquareAltIcon } from "@patternfly/react-icons";
import "./DefaultNavBarItem.css";

export default function DefaultNavbarItem({
  activeBasePath,
  activeBaseRegex,
  to,
  href,
  label,
  html,
  isDropdownLink = false,
  isDropdownItem = false,
  prependBaseUrlToHref,
  className,
  mobile = false,
  position,
  ...props
}: DefaultNavbarItemProps & { mobile?: boolean }): ReactNode {
  const toUrl = useBaseUrl(to);
  const activeBaseUrl = useBaseUrl(activeBasePath);
  const normalizedHref = useBaseUrl(href, { forcePrependBaseUrl: true });
  const isExternalLink = label && href && !isInternalUrl(href);

  // Determine active className based on mobile/desktop
  const activeClassName =
    props.activeClassName ??
    (mobile ? "menu__link--active" : "navbar__link--active");

  // Link content (html XOR label) - html prop is from trusted Docusaurus config
  const linkContent = html ? (
    <span dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <>{label}</>
  );

  // PatternFly Button for both mobile and desktop
  const buttonElement = (
    <Button
      variant="plain"
      style={{
        marginInlineEnd: mobile ? undefined : "var(--pf-t--global--spacer--sm)",
        width: mobile ? "100%" : undefined,
        justifyContent: mobile ? "flex-start" : undefined,
        marginBlockEnd: mobile ? "var(--pf-t--global--spacer--sm)" : undefined,
      }}
      icon={isExternalLink ? <ExternalLinkSquareAltIcon /> : undefined}
      iconPosition="end"
      component={(componentProps: any) => {
        const linkClasses = clsx(
          mobile
            ? "menu__link"
            : isDropdownItem
              ? "dropdown__link"
              : "navbar__item navbar__link",
          className,
          componentProps.className,
        );

        if (href) {
          return (
            <Link
              href={prependBaseUrlToHref ? normalizedHref : href}
              {...componentProps}
              {...props}
              className={linkClasses}
            />
          );
        }
        return (
          <Link
            to={toUrl}
            isNavLink
            {...((activeBasePath || activeBaseRegex) && {
              isActive: (_match: any, location: any) =>
                activeBaseRegex
                  ? isRegexpStringMatch(activeBaseRegex, location.pathname)
                  : location.pathname.startsWith(activeBaseUrl),
            })}
            {...componentProps}
            {...props}
            className={linkClasses}
            activeClassName={activeClassName}
          />
        );
      }}
    >
      {linkContent}
    </Button>
  );

  // Wrap in <li> for mobile or dropdown items
  if (mobile) {
    return <li className="menu__list-item">{buttonElement}</li>;
  }

  if (isDropdownItem) {
    return <li>{buttonElement}</li>;
  }

  return buttonElement;
}
