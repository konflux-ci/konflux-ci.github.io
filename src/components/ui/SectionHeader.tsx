import type { ReactNode } from "react";
import { Content, Flex, FlexItem, Title } from "@patternfly/react-core";

interface SectionHeaderProps {
  sectionLabel: string;
  heading: string;
  subtitle: string;
}

export default function SectionHeader({
  sectionLabel,
  heading,
  subtitle,
}: SectionHeaderProps): ReactNode {
  return (
    <>
      <FlexItem>
        <Content
          component="p"
          className="section-label"
          style={{
            textAlign: "center",
            marginBottom: "var(--pf-t--global--spacer--md)",
          }}
        >
          {sectionLabel}
        </Content>
      </FlexItem>

      <FlexItem>
        <Title
          headingLevel="h2"
          size="2xl"
          style={{
            color: "var(--pf-t--global--text--color--regular)",
            textAlign: "center",
            maxWidth: "700px",
            marginBottom: "var(--pf-t--global--spacer--md)",
          }}
        >
          {heading}
        </Title>
      </FlexItem>

      <FlexItem>
        <Content
          component="p"
          style={{
            color: "var(--pf-t--global--text--color--subtle)",
            textAlign: "center",
            maxWidth: "700px",
            marginBottom: "var(--pf-t--global--spacer--2xl)",
          }}
        >
          {subtitle}
        </Content>
      </FlexItem>
    </>
  );
}
