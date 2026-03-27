import React from "react";
import { Card, CardBody, CardTitle, Flex } from "@patternfly/react-core";
import type { GettingStartedStep } from "@site/src/types/content";
import { ArrowLists } from "@site/src/components/ui/ArrowLists";

interface StepSectionProps {
  sections: GettingStartedStep["sections"];
}

export default function StepSection({ sections }: StepSectionProps) {
  return (
    <Flex columnGap={{ default: "columnGapSm" }}>
      {sections.map((section, i) => (
        <Card
          key={i}
          isCompact
          style={{
            backgroundColor:
              "var(--pf-t--global--background--color--secondary--default)",
          }}
          isFullHeight
        >
          <CardTitle>{section.title}</CardTitle>
          {section.items ? (
            <CardBody>
              <ArrowLists items={section.items} />
            </CardBody>
          ) : null}
        </Card>
      ))}
    </Flex>
  );
}
