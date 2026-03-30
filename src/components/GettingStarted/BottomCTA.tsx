import React from "react";
import { Button, Content, Flex, FlexItem, Title } from "@patternfly/react-core";
import type { GettingStartedData } from "@site/src/types/content";
import DynamicIcon from "@site/src/components/ui/DynamicIcon";
import SafeLink from "../ui/SafeLink";

interface BottomCTAProps {
  data: GettingStartedData["bottomCTA"];
}

export default function BottomCTA({ data }: BottomCTAProps) {
  return (
    <div
      style={{
        backgroundColor: "#1b1d21",
        textAlign: "center",
        marginTop: "var(--pf-t--global--spacer--2xl)",
        borderRadius: "var(--pf-t--global--border--radius--large)",
        padding:
          "var(--pf-t--global--spacer--3xl) var(--pf-t--global--spacer--2xl)",
      }}
    >
      <Title
        headingLevel="h2"
        size="2xl"
        style={{
          marginBottom: "var(--pf-t--global--spacer--md)",
          color: "#ffffff",
        }}
      >
        {data.heading}
      </Title>
      <Content
        component="p"
        style={{
          color: "rgba(255, 255, 255, 0.7)",
          maxWidth: 600,
          margin: "0 auto",
          marginBottom: "var(--pf-t--global--spacer--xl)",
        }}
      >
        {data.subtitle}
      </Content>
      <Flex
        justifyContent={{ default: "justifyContentCenter" }}
        gap={{ default: "gapMd" }}
        style={{ flexWrap: "wrap" }}
      >
        <FlexItem>
          <Button
            variant="primary"
            size="lg"
            className="pf-m-brand-orange"
            component={(props) => <SafeLink {...props} />}
            href={data.primaryCTA.href}
            target="_blank"
            icon={
              data.primaryCTA.icon ? (
                <DynamicIcon
                  name={data.primaryCTA.icon}
                  style={{ width: 16, height: 16 }}
                />
              ) : undefined
            }
          >
            {data.primaryCTA.label}
          </Button>
        </FlexItem>
        <FlexItem>
          <Button
            variant="secondary"
            size="lg"
            component={(props) => <SafeLink {...props} />}
            href={data.secondaryCTA.href}
            target="_blank"
            style={{
              color: "#ffffff",
              borderColor: "rgba(255, 255, 255, 0.5)",
            }}
            icon={
              data.secondaryCTA.icon ? (
                <DynamicIcon
                  name={data.secondaryCTA.icon}
                  style={{ width: 16, height: 16 }}
                />
              ) : undefined
            }
          >
            {data.secondaryCTA.label}
          </Button>
        </FlexItem>
      </Flex>
    </div>
  );
}
