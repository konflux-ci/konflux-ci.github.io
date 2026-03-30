import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Content,
  Flex,
  FlexItem,
  Title,
} from "@patternfly/react-core";
import type { GettingStartedData } from "@site/src/types/content";
import DynamicIcon from "@site/src/components/ui/DynamicIcon";
import SafeLink from "@site/src/components/ui/SafeLink";

interface QuickLinksCardProps {
  data: GettingStartedData["quickLinks"];
}

export default function QuickLinksCard({ data }: QuickLinksCardProps) {
  return (
    <Card isCompact>
      <CardTitle>
        <Flex
          gap={{ default: "gapSm" }}
          alignItems={{ default: "alignItemsCenter" }}
        >
          <FlexItem>
            <DynamicIcon
              name={data.icon}
              style={{
                width: 20,
                height: 20,
                color: "var(--konflux-brand-orange)",
              }}
            />
          </FlexItem>
          <FlexItem>
            <Title headingLevel="h4" size="md" style={{ margin: 0 }}>
              {data.title}
            </Title>
          </FlexItem>
        </Flex>
      </CardTitle>
      <CardBody>
        <Flex direction={{ default: "column" }}>
          {data.items.map((item, i) => (
            <FlexItem key={i}>
              <SafeLink
                href={item.href}
                style={{
                  color: "var(--pf-t--global--color--brand--default)",
                  fontWeight: 600,
                  textDecoration: "none",
                  fontSize: "var(--pf-t--global--font--size--body--default)",
                }}
              >
                {item.title}
              </SafeLink>
              <Content
                component="p"
                style={{
                  color: "var(--pf-t--global--text--color--subtle)",
                  fontSize: "var(--pf-t--global--font--size--sm)",
                  marginBottom: 0,
                }}
              >
                {item.description}
              </Content>
            </FlexItem>
          ))}
        </Flex>
      </CardBody>
    </Card>
  );
}
