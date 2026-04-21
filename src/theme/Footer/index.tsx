import type { ReactNode } from "react";
import { Flex, FlexItem, PageSection, Title } from "@patternfly/react-core";
import { useColorMode } from "@docusaurus/theme-common";
import useBaseUrl from "@docusaurus/useBaseUrl";
import SafeLink from "@site/src/components/ui/SafeLink";
import navigationData from "@site/data/navigation.yaml";
import type { NavigationData } from "@site/src/types/content";

const data = (navigationData as unknown as NavigationData).footer;

const LOGO_LIGHT = "/img/konflux.svg";
const LOGO_DARK = "/img/konflux-dark.svg";

export default function FooterWrapper(): ReactNode {
  const { colorMode } = useColorMode();
  const logo = useBaseUrl(colorMode === "dark" ? LOGO_LIGHT : LOGO_DARK);
  return (
    <PageSection
      component="footer"
      style={{
        padding:
          "var(--pf-t--global--spacer--2xl) var(--pf-t--global--spacer--lg) 0",
        borderTop: "1px solid var(--pf-t--global--border--color--default)",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Main footer content: logo+tagline + link columns */}
        <Flex
          direction={{ default: "column", lg: "row" }}
          justifyContent={{ default: "justifyContentFlexStart" }}
          gap={{ default: "gapXl" }}
          style={{ paddingBottom: "var(--pf-t--global--spacer--2xl)" }}
        >
          {/* Column 1: Logo + Tagline */}
          <FlexItem flex={{ default: "flex_1" }} style={{ maxWidth: "320px" }}>
            <img
              src={logo}
              alt="Konflux"
              width={140}
              height={36}
              style={{ marginBottom: "var(--pf-t--global--spacer--md)" }}
            />
            <p
              style={{
                color: "var(--pf-t--global--text--color--subtle)",
                fontSize: "var(--pf-t--global--font--size--sm)",
                lineHeight: "1.6",
              }}
            >
              {data.tagline}
            </p>
          </FlexItem>

          {/* Link columns */}
          {data.columns.map((column) => (
            <FlexItem key={column.heading} flex={{ default: "flex_1" }}>
              <Title
                headingLevel="h4"
                size="md"
                style={{
                  color: "var(--pf-t--global--text--color--subtle)",
                  fontSize: "var(--pf-t--global--font--size--xs)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "var(--pf-t--global--spacer--md)",
                  fontWeight: 600,
                }}
              >
                {column.heading}
              </Title>
              <Flex
                direction={{ default: "column" }}
                gap={{ default: "gapSm" }}
              >
                {column.links.map((link) => (
                  <FlexItem key={link.label}>
                    <SafeLink
                      href={link.href}
                      style={{
                        color: "var(--pf-t--global--text--color--regular)",
                        fontSize: "var(--pf-t--global--font--size--sm)",
                        textDecoration: "none",
                      }}
                    >
                      {link.label}
                    </SafeLink>
                  </FlexItem>
                ))}
              </Flex>
            </FlexItem>
          ))}
        </Flex>

        {/* Divider */}
        <div
          style={{
            borderTop: "1px solid var(--pf-t--global--border--color--default)",
          }}
        />

        {/* Bottom bar */}
        <Flex
          justifyContent={{ default: "justifyContentSpaceBetween" }}
          alignItems={{ default: "alignItemsCenter" }}
          direction={{ default: "column", md: "row" }}
          gap={{ default: "gapSm" }}
          style={{
            padding: "var(--pf-t--global--spacer--md) 0",
          }}
        >
          <FlexItem>
            <p
              style={{
                color: "var(--pf-t--global--text--color--subtle)",
                fontSize: "var(--pf-t--global--font--size--xs)",
                margin: 0,
              }}
            >
              {data.bottomBar.copyright}
            </p>
          </FlexItem>
          <FlexItem>
            <Flex gap={{ default: "gapMd" }}>
              {data.bottomBar.links.map((link) => (
                <FlexItem key={link.label}>
                  <SafeLink
                    href={link.href}
                    style={{
                      color: "var(--pf-t--global--text--color--subtle)",
                      fontSize: "var(--pf-t--global--font--size--xs)",
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </SafeLink>
                </FlexItem>
              ))}
            </Flex>
          </FlexItem>
        </Flex>
      </div>
    </PageSection>
  );
}
