import React from "react";
import {
  Alert,
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  FlexItem,
  Grid,
} from "@patternfly/react-core";
import type { GettingStartedData } from "@site/src/types/content";
import { useSafeHref } from "@site/src/hooks/useSafeHref";
import SectionHeader from "@site/src/components/ui/SectionHeader";
import StepCard from "./StepCard";
import QuickLinksCard from "./QuickLinksCard";
import TerminalBlock from "./TerminalBlock";
import BottomCTA from "./BottomCTA";
import SafeLink from "../ui/SafeLink";

interface GettingStartedPageContentProps {
  data: GettingStartedData;
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
              component={(props) => <SafeLink {...props} />}
              to={i < data.breadcrumbs.length - 1 ? crumb.href : undefined}
            >
              {crumb.label}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>

        <SectionHeader
          heading={data.heading}
          subtitle={data.subtitle}
          align="left"
        />

        <Flex
          direction={{ default: "column", lg: "row" }}
          gap={{ default: "gapLg" }}
          alignItems={{ default: "alignItemsStretch" }}
        >
          {/* Main content: 4 step cards */}

          <Flex flex={{ default: "flex_1" }} gap={{ default: "gapLg" }}>
            <FlexItem>
              <SectionHeader
                heading={data.pageSections[0].heading}
                align="left"
              />
              <Flex rowGap={{ default: "rowGapMd" }}>
                {data.pageSections[0].steps.map((step) => (
                  <StepCard key={step.number} step={step} />
                ))}
              </Flex>
            </FlexItem>
            <FlexItem>
              <SectionHeader
                heading={data.pageSections[1].heading}
                subtitle={data.pageSections[1].subtitle}
                align="left"
              />
              <Grid hasGutter span={6}>
                {data.pageSections[1].steps.map((step) => (
                  <StepCard key={step.number} step={step} />
                ))}
              </Grid>
            </FlexItem>
            {data.alert && (
              <Alert variant={data.alert.type} title={data.alert.title}>
                <p>{data.alert.content}</p>
              </Alert>
            )}
          </Flex>

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
