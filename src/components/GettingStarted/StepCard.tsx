import React from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Content,
  Flex,
  FlexItem,
  Title,
} from "@patternfly/react-core";
import type { GettingStartedData } from "@site/src/types/content";
import DynamicIcon from "@site/src/components/ui/DynamicIcon";
import { ArrowLists } from "@site/src/components/ui/ArrowLists";
import DataDrivenButton from "@site/src/components/ui/DataDrivenButton";
import StepSection from "./StepSection";

interface StepCardProps {
  step: GettingStartedData["pageSections"][0]["steps"][0];
}

export default function StepCard({ step }: StepCardProps) {
  return (
    <Card isCompact isFullHeight>
      <CardBody>
        <Flex
          gap={{ default: "gapSm" }}
          alignItems={{ default: "alignItemsCenter" }}
          style={{ marginBottom: "var(--pf-t--global--spacer--sm)" }}
        >
          <FlexItem>
            <DynamicIcon
              name={step.icon}
              style={{
                width: 15,
                height: 15,
                color: "var(--konflux-brand-orange)",
              }}
            />
          </FlexItem>
          <FlexItem>
            <Title headingLevel="h3" size="lg" style={{ margin: 0 }}>
              {step.title}
            </Title>
          </FlexItem>
        </Flex>
        <Content
          component="p"
          style={{
            color: "var(--pf-t--global--text--color--subtle)",
            marginBottom: "var(--pf-t--global--spacer--md)",
          }}
        >
          {step.description}
        </Content>
        {step.items ? <ArrowLists items={step.items} /> : null}
        {step.sections ? <StepSection sections={step.sections} /> : null}
      </CardBody>
      {step.link ? (
        <CardFooter>
          <DataDrivenButton link={step.link} variant="link" />
        </CardFooter>
      ) : null}
    </Card>
  );
}
