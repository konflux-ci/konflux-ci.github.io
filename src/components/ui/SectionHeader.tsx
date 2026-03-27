import type { ReactNode } from "react";
import { Content, Flex, FlexItem, Title } from "@patternfly/react-core";
import "./SectionHeader.css";

interface SectionHeaderProps {
  sectionLabel?: string;
  heading?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

const alignItems: Record<
  SectionHeaderProps["align"],
  "alignItemsFlexStart" | "alignItemsCenter" | "alignItemsFlexEnd"
> = {
  left: "alignItemsFlexStart",
  center: "alignItemsCenter",
  right: "alignItemsFlexEnd",
};

export default function SectionHeader({
  sectionLabel,
  heading,
  subtitle,
  align = "center",
}: SectionHeaderProps): ReactNode {
  return (
    <Flex
      direction={{ default: "column" }}
      alignItems={{
        default: alignItems[align],
      }}
      className="section-header"
    >
      {sectionLabel && (
        <FlexItem>
          <Content component="p" className="label">
            {sectionLabel}
          </Content>
        </FlexItem>
      )}

      {heading && (
        <FlexItem>
          <Title
            headingLevel="h2"
            size="2xl"
            style={{
              color: "var(--pf-t--global--text--color--regular)",
            }}
          >
            {heading}
          </Title>
        </FlexItem>
      )}

      {subtitle && (
        <FlexItem>
          <Content
            component="p"
            style={{
              color: "var(--pf-t--global--text--color--subtle)",
            }}
          >
            {subtitle}
          </Content>
        </FlexItem>
      )}
    </Flex>
  );
}
