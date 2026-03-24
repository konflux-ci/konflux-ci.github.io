import React from "react";
import {
  Card,
  CardBody,
  Flex,
  FlexItem,
  Title,
  Content,
  Button,
} from "@patternfly/react-core";
import { CheckCircleIcon, ArrowRightIcon } from "@patternfly/react-icons";
import { useSafeHref } from "@site/src/hooks/useSafeHref";
import type { BottomCTAData } from "@site/src/types/content";

interface BottomCTASectionProps {
  data: BottomCTAData;
}

export default function BottomCTASection({ data }: BottomCTASectionProps) {
  const { getSafeHref } = useSafeHref();
  const primaryHref = getSafeHref(data.primaryCTA.href);
  const secondaryHref = getSafeHref(data.secondaryCTA.href);

  return (
    <section
      style={{
        padding:
          "var(--pf-t--global--spacer--3xl) var(--pf-t--global--spacer--lg)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Card
          isLarge
          style={{
            backgroundColor: "rgba(72, 181, 255, 0.04)",
            borderColor: "rgba(72, 181, 255, 0.2)",
            borderRadius: "var(--pf-t--global--border--radius--large)",
            textAlign: "center",
          }}
        >
          <CardBody
            style={{
              padding:
                "var(--pf-t--global--spacer--3xl) var(--pf-t--global--spacer--2xl)",
            }}
          >
            <Flex
              justifyContent={{ default: "justifyContentCenter" }}
              gap={{ default: "gapMd" }}
              style={{ marginBottom: "var(--pf-t--global--spacer--lg)" }}
            >
              {Array.from({ length: data.checkIcons }).map((_, i) => (
                <FlexItem key={i}>
                  <CheckCircleIcon
                    style={{
                      width: 32,
                      height: 32,
                      color: "var(--pf-t--global--color--brand--default)",
                    }}
                  />
                </FlexItem>
              ))}
            </Flex>

            <Title
              headingLevel="h2"
              size="2xl"
              style={{ marginBottom: "var(--pf-t--global--spacer--md)" }}
            >
              {data.heading}
            </Title>

            <Content
              component="p"
              style={{
                color: "var(--pf-t--global--text--color--subtle)",
                maxWidth: 700,
                margin: "0 auto",
                marginBottom: "var(--pf-t--global--spacer--xl)",
              }}
            >
              {data.subtitle}
            </Content>

            <Flex
              justifyContent={{ default: "justifyContentCenter" }}
              gap={{ default: "gapMd" }}
              wrap={{ default: "wrap" }}
            >
              <FlexItem>
                <Button
                  variant="primary"
                  size="lg"
                  className="pf-m-brand-orange"
                  component="a"
                  href={primaryHref}
                >
                  {data.primaryCTA.label}
                </Button>
              </FlexItem>
              <FlexItem>
                <Button
                  variant="link"
                  size="lg"
                  component="a"
                  href={secondaryHref}
                  icon={<ArrowRightIcon />}
                  iconPosition="end"
                >
                  {data.secondaryCTA.label}
                </Button>
              </FlexItem>
            </Flex>
          </CardBody>
        </Card>
      </div>
    </section>
  );
}
