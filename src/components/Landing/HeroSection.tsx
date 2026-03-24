import type { ReactNode } from "react";
import {
  Button,
  Content,
  Flex,
  FlexItem,
  PageSection,
  Title,
} from "@patternfly/react-core";
import { CodeIcon, ExternalLinkAltIcon } from "@patternfly/react-icons";
import type { HeroData } from "@site/src/types/content";
import { MainGradient } from "@site/src/components/ui/GradientBackground";
import PipelineDiagram from "./PipelineDiagram";
import { useSafeHref } from "@site/src/hooks/useSafeHref";

interface HeroSectionProps {
  data: HeroData;
}

export default function HeroSection({ data }: HeroSectionProps): ReactNode {
  const { getSafeHref } = useSafeHref();
  return (
    <PageSection
      style={{
        padding:
          "var(--pf-t--global--spacer--3xl) var(--pf-t--global--spacer--lg)",
      }}
    >
      <MainGradient />
      <Flex
        direction={{ default: "column" }}
        alignItems={{ default: "alignItemsCenter" }}
        gap={{ default: "gapLg" }}
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <FlexItem>
          <Title headingLevel="h1" size="4xl">
            {data.headline}
          </Title>
        </FlexItem>

        <FlexItem>
          <Content
            component="h2"
            style={{ maxWidth: "700px", textAlign: "center" }}
          >
            {data.subtitle}
          </Content>
        </FlexItem>

        <FlexItem>
          <Content component="p">{data.tagline}</Content>
        </FlexItem>

        <FlexItem>
          <Flex
            justifyContent={{ default: "justifyContentCenter" }}
            gap={{ default: "gapMd" }}
            style={{ marginBottom: "var(--pf-v6-global--spacer--2xl)" }}
          >
            <FlexItem>
              <Button
                variant="primary"
                size="lg"
                className="pf-m-brand-orange"
                icon={<CodeIcon />}
                component="a"
                href={getSafeHref(data.primaryCTA.href)}
              >
                {data.primaryCTA.label}
              </Button>
            </FlexItem>
            {data.secondaryCTA && (
              <FlexItem>
                <Button
                  variant="secondary"
                  size="lg"
                  icon={<ExternalLinkAltIcon />}
                  component="a"
                  href={getSafeHref(data.secondaryCTA.href)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.secondaryCTA.label}
                </Button>
              </FlexItem>
            )}
          </Flex>
        </FlexItem>

        <FlexItem style={{ width: "100%" }}>
          <PipelineDiagram data={data.pipelineDiagram} />
        </FlexItem>
      </Flex>
    </PageSection>
  );
}
