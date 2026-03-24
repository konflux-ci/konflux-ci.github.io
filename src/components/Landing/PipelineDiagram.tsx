import type { ReactNode } from "react";
import {
  Card,
  CardBody,
  Content,
  Flex,
  FlexItem,
  Label,
  Title,
} from "@patternfly/react-core";
import { OutlinedCheckCircleIcon } from "@patternfly/react-icons";
import type { PipelineDiagramData } from "@site/src/types/content";
import ArrowSvg from "@site/src/components/ui/ArrowSvg";
import IconCircle from "@site/src/components/ui/IconCircle";
import DynamicIcon from "@site/src/components/ui/DynamicIcon";
import "./PipelineDiagram.css";

interface PipelineDiagramProps {
  data: PipelineDiagramData;
}

export default function PipelineDiagram({
  data,
}: PipelineDiagramProps): ReactNode {
  return (
    <Flex
      justifyContent={{ default: "justifyContentCenter" }}
      alignItems={{ default: "alignItemsCenter", md: "alignItemsCenter" }}
      gap={{ default: "gapXl" }}
      style={{ maxWidth: "900px", margin: "0 auto" }}
      direction={{ default: "column", md: "row" }}
    >
      {/* Source Code column */}
      <FlexItem>
        <Flex
          direction={{ default: "column" }}
          alignItems={{ default: "alignItemsCenter" }}
        >
          <FlexItem>
            <Content
              component="p"
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: "var(--pf-t--global--font--size--xs)",
                color: "var(--pf-t--global--text--color--subtle)",
                marginBottom: "var(--pf-t--global--spacer--sm)",
                textAlign: "center",
              }}
            >
              {data.sourceCode.label}
            </Content>
          </FlexItem>
          <FlexItem>
            <Flex
              gap={{ default: "gapSm" }}
              justifyContent={{ default: "justifyContentCenter" }}
            >
              {data.sourceCode.icons.map((iconName) => (
                <FlexItem key={iconName}>
                  <IconCircle>
                    <DynamicIcon
                      name={iconName}
                      style={{ width: "24px", height: "24px" }}
                    />
                  </IconCircle>
                </FlexItem>
              ))}
            </Flex>
          </FlexItem>
        </Flex>
      </FlexItem>

      {/* Left arrow — rotated on mobile */}
      <FlexItem
        style={{ display: "flex", alignItems: "center" }}
        className="pipeline-arrow"
      >
        <ArrowSvg color="var(--pf-t--global--icon--color--brand--default)" />
      </FlexItem>

      {/* Factory card */}
      <FlexItem>
        <Card
          isCompact
          style={{
            width: "280px",
            padding: "var(--pf-t--global--spacer--lg)",
            border: "1px solid rgba(0, 72, 132, 0.2)",
            background: "rgba(72, 181, 255, 0.04)",
            borderRadius: "var(--pf-t--global--border--radius--large)",
            textAlign: "center",
          }}
        >
          <CardBody style={{ padding: 0 }}>
            <Flex
              direction={{ default: "column" }}
              alignItems={{ default: "alignItemsCenter" }}
            >
              <FlexItem>
                <DynamicIcon
                  name={data.factory.icon}
                  style={{
                    width: "32px",
                    height: "32px",
                    color: "var(--pf-t--global--icon--color--brand--default)",
                  }}
                />
              </FlexItem>
              <FlexItem>
                <Title
                  headingLevel="h3"
                  size="lg"
                  style={{ marginTop: "var(--pf-t--global--spacer--sm)" }}
                >
                  {data.factory.title}
                </Title>
              </FlexItem>
              <FlexItem>
                <Content
                  component="p"
                  style={{
                    fontSize: "var(--pf-t--global--font--size--sm)",
                    color: "var(--pf-t--global--text--color--subtle)",
                  }}
                >
                  {data.factory.subtitle}
                </Content>
              </FlexItem>
              <FlexItem>
                <Flex
                  justifyContent={{ default: "justifyContentCenter" }}
                  gap={{ default: "gapXs" }}
                  style={{ marginTop: "var(--pf-t--global--spacer--md)" }}
                  flexWrap={{ default: "wrap" }}
                >
                  {data.factory.techBadges.map((badge) => (
                    <FlexItem key={badge}>
                      <Label variant="outline" isCompact>
                        {badge}
                      </Label>
                    </FlexItem>
                  ))}
                </Flex>
              </FlexItem>
            </Flex>
          </CardBody>
        </Card>
      </FlexItem>

      {/* Right arrow — rotated on mobile */}
      <FlexItem
        style={{ display: "flex", alignItems: "center" }}
        className="pipeline-arrow"
      >
        <ArrowSvg color="var(--pf-t--global--icon--color--status--success--default)" />
      </FlexItem>

      {/* Verified Output column */}
      <FlexItem>
        <Flex
          direction={{ default: "column" }}
          alignItems={{ default: "alignItemsCenter" }}
        >
          <FlexItem>
            <Content
              component="p"
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: "var(--pf-t--global--font--size--xs)",
                color: "var(--pf-t--global--text--color--subtle)",
                marginBottom: "var(--pf-t--global--spacer--sm)",
                textAlign: "center",
              }}
            >
              {data.verifiedOutput.label}
            </Content>
          </FlexItem>
          <FlexItem>
            <Flex
              direction={{ default: "column" }}
              gap={{ default: "gapSm" }}
              alignItems={{ default: "alignItemsCenter" }}
            >
              {data.verifiedOutput.badges.map((badge) => (
                <FlexItem key={badge.label}>
                  <Label color={badge.color} icon={<OutlinedCheckCircleIcon />}>
                    {badge.label}
                  </Label>
                </FlexItem>
              ))}
            </Flex>
          </FlexItem>
          <FlexItem>
            <Flex
              gap={{ default: "gapXs" }}
              justifyContent={{ default: "justifyContentCenter" }}
              style={{ marginTop: "var(--pf-t--global--spacer--sm)" }}
            >
              {[0, 1, 2].map((i) => (
                <FlexItem key={i}>
                  <IconCircle size={32}>
                    <DynamicIcon
                      name="CubeIcon"
                      style={{
                        width: "16px",
                        height: "16px",
                        color: "var(--pf-t--global--text--color--subtle)",
                      }}
                    />
                  </IconCircle>
                </FlexItem>
              ))}
            </Flex>
          </FlexItem>
        </Flex>
      </FlexItem>
    </Flex>
  );
}
