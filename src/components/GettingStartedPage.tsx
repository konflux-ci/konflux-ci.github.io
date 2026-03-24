import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardTitle,
  CodeBlock,
  CodeBlockCode,
  Content,
  Flex,
  FlexItem,
  List,
  ListItem,
  Title,
  Button,
} from "@patternfly/react-core";
import type { GettingStartedData } from "@site/src/types/content";
import DynamicIcon from "@site/src/components/ui/DynamicIcon";
import { useSafeHref } from "../hooks/useSafeHref";
import SafeLink from "./ui/SafeLink";

interface GettingStartedPageContentProps {
  data: GettingStartedData;
}

function StepCard({ step }: { step: GettingStartedData["steps"][0] }) {
  return (
    <Card isCompact isFullHeight>
      <CardBody>
        <Flex
          gap={{ default: "gapMd" }}
          alignItems={{ default: "alignItemsFlexStart" }}
        >
          <FlexItem>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                backgroundColor: "var(--pf-t--global--color--brand--default)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
                fontSize: "var(--pf-t--global--font--size--lg)",
                flexShrink: 0,
              }}
            >
              {step.number}
            </div>
          </FlexItem>
          <FlexItem flex={{ default: "flex_1" }}>
            <Flex
              gap={{ default: "gapSm" }}
              alignItems={{ default: "alignItemsCenter" }}
              style={{ marginBottom: "var(--pf-t--global--spacer--sm)" }}
            >
              <FlexItem>
                <DynamicIcon
                  name={step.icon}
                  style={{
                    width: 20,
                    height: 20,
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
            <List>
              {step.items.map((item, i) => (
                <ListItem key={i}>{item}</ListItem>
              ))}
            </List>
          </FlexItem>
        </Flex>
      </CardBody>
    </Card>
  );
}

function QuickLinksCard({ data }: { data: GettingStartedData["quickLinks"] }) {
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
        <Flex direction={{ default: "column" }} gap={{ default: "gapMd" }}>
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
                  marginTop: "var(--pf-t--global--spacer--xs)",
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

function TerminalBlock({
  data,
}: {
  data: GettingStartedData["terminalBlock"];
}) {
  return (
    <Card
      isCompact
      style={{
        marginTop: "var(--pf-t--global--spacer--lg)",
      }}
    >
      <CardBody style={{ padding: 0 }}>
        <div
          style={{
            backgroundColor: "#1b1d21",
            borderRadius:
              "var(--pf-t--global--border--radius--medium) var(--pf-t--global--border--radius--medium) 0 0",
            padding:
              "var(--pf-t--global--spacer--sm) var(--pf-t--global--spacer--md)",
            display: "flex",
            gap: "var(--pf-t--global--spacer--xs)",
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#ffbd2e",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#28c840",
            }}
          />
        </div>
        <CodeBlock>
          <CodeBlockCode>{data.commands}</CodeBlockCode>
        </CodeBlock>
        <div
          style={{
            padding:
              "var(--pf-t--global--spacer--sm) var(--pf-t--global--spacer--md)",
          }}
        >
          <SafeLink
            href={data.linkHref}
            style={{
              color: "var(--pf-t--global--color--brand--default)",
              fontSize: "var(--pf-t--global--font--size--sm)",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            {data.linkLabel}
          </SafeLink>
        </div>
      </CardBody>
    </Card>
  );
}

function BottomCTA({ data }: { data: GettingStartedData["bottomCTA"] }) {
  const { getSafeHref } = useSafeHref();
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
            component="a"
            href={getSafeHref(data.primaryCTA.href)}
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
            component="a"
            href={getSafeHref(data.secondaryCTA.href)}
            target="_blank"
            style={{
              color: "#ffffff",
              borderColor: "rgba(255, 255, 255, 0.5)",
            }}
          >
            {data.secondaryCTA.label}
          </Button>
        </FlexItem>
      </Flex>
    </div>
  );
}

export default function GettingStartedPageContent({
  data,
}: GettingStartedPageContentProps) {
  const { getSafeHref } = useSafeHref();
  return (
    <section
      style={{
        padding:
          "var(--pf-t--global--spacer--lg) var(--pf-t--global--spacer--lg)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Breadcrumb>
          {data.breadcrumbs.map((crumb, i) => (
            <BreadcrumbItem
              key={i}
              isActive={i === data.breadcrumbs.length - 1}
              to={
                i < data.breadcrumbs.length - 1
                  ? getSafeHref(crumb.href)
                  : undefined
              }
            >
              {crumb.label}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>

        <div style={{ marginTop: "var(--pf-t--global--spacer--lg)" }}>
          <Title
            headingLevel="h1"
            size="3xl"
            style={{ marginBottom: "var(--pf-t--global--spacer--md)" }}
          >
            {data.title}
          </Title>
          <Content
            component="p"
            style={{
              color: "var(--pf-t--global--text--color--subtle)",
              maxWidth: 800,
              marginBottom: "var(--pf-t--global--spacer--2xl)",
            }}
          >
            {data.subtitle}
          </Content>
        </div>

        <Flex
          direction={{ default: "column", lg: "row" }}
          gap={{ default: "gapLg" }}
          alignItems={{ default: "alignItemsStretch" }}
        >
          {/* Main content: 4 step cards */}
          <FlexItem flex={{ default: "flex_1" }} style={{ minWidth: 0 }}>
            <Flex direction={{ default: "column" }} gap={{ default: "gapLg" }}>
              {data.steps.map((step) => (
                <FlexItem key={step.number}>
                  <StepCard step={step} />
                </FlexItem>
              ))}
            </Flex>
          </FlexItem>

          {/* Sidebar */}
          <FlexItem
            style={{
              width: "100%",
              maxWidth: "none",
              flexBasis: "340px",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                position: "sticky",
                top: "calc(100px + var(--pf-t--global--spacer--lg))",
              }}
            >
              <QuickLinksCard data={data.quickLinks} />
              <TerminalBlock data={data.terminalBlock} />
            </div>
          </FlexItem>
        </Flex>

        <BottomCTA data={data.bottomCTA} />
      </div>
    </section>
  );
}
