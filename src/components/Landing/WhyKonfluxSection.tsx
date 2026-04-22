import type { ReactNode } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Content,
  Flex,
  FlexItem,
  Gallery,
  GalleryItem,
  PageSection,
} from "@patternfly/react-core";
import type { WhyKonfluxData } from "@site/src/types/content";
import SectionHeader from "@site/src/components/ui/SectionHeader";
import DataDrivenButton from "@site/src/components/ui/DataDrivenButton";
import DynamicIcon from "@site/src/components/ui/DynamicIcon";
import { logger } from "@site/src/utils/logger";

// Import SVGs as React components
import CicdAutomation from "@site/static/img/features/cicd-automation.svg";
import SecurelySign from "@site/static/img/features/securely-sign.svg";
import SupplyChain from "@site/static/img/features/supply-chain.svg";
import OpenSource from "@site/static/img/features/open-source.svg";

interface WhyKonfluxSectionProps {
  data: WhyKonfluxData;
}

// Map image paths to SVG components
const SVG_COMPONENTS: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  "/img/features/cicd-automation.svg": CicdAutomation,
  "/img/features/securely-sign.svg": SecurelySign,
  "/img/features/supply-chain.svg": SupplyChain,
  "/img/features/open-source.svg": OpenSource,
};

function CardImage({ src, alt }: { src: string; alt: string }): ReactNode {
  const SvgComponent = SVG_COMPONENTS[src];

  if (!SvgComponent) {
    logger.warn(`No SVG component found for path: ${src}`);
    return null;
  }

  return (
    <SvgComponent
      role="img"
      aria-label={alt}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        minHeight: "80px",
        borderRadius: "var(--pf-t--global--border--radius--small)",
      }}
    />
  );
}

export default function WhyKonfluxSection({
  data,
}: WhyKonfluxSectionProps): ReactNode {
  return (
    <PageSection
      style={{
        padding:
          "var(--pf-t--global--spacer--3xl) var(--pf-t--global--spacer--lg)",
      }}
    >
      <Flex
        direction={{ default: "column" }}
        alignItems={{ default: "alignItemsCenter" }}
        style={{ maxWidth: "1200px", margin: "0 auto" }}
      >
        <SectionHeader
          sectionLabel={data.sectionLabel}
          heading={data.heading}
          subtitle={data.subtitle}
        />

        <FlexItem style={{ width: "100%" }}>
          <Gallery
            hasGutter
            minWidths={{ default: "100%", sm: "45%", lg: "22%" }}
          >
            {data.cards.map((card) => (
              <GalleryItem key={card.title}>
                <Card isCompact isFullHeight>
                  <CardBody>
                    <Flex
                      direction={{ default: "column" }}
                      gap={{ default: "gapMd" }}
                      style={{ height: "100%" }}
                    >
                      <FlexItem>
                        <DynamicIcon
                          name={card.icon}
                          style={{
                            width: "24px",
                            height: "24px",
                            color: "var(--konflux-brand-orange)",
                          }}
                        />
                      </FlexItem>
                      <FlexItem flex={{ default: "flex_1" }}>
                        <CardImage src={card.image} alt={card.title} />
                      </FlexItem>
                    </Flex>
                  </CardBody>
                  <CardTitle
                    style={{
                      fontWeight: 700,
                    }}
                  >
                    {card.title}
                  </CardTitle>
                  <CardBody>
                    <Content
                      component="p"
                      style={{
                        color: "var(--pf-t--global--text--color--subtle)",
                        fontSize:
                          "var(--pf-t--global--font--size--body--default)",
                      }}
                    >
                      {card.description}
                    </Content>
                  </CardBody>
                  {card.link && (
                    <CardFooter>
                      <DataDrivenButton
                        link={card.link}
                        icon={<DynamicIcon name="ArrowRightIcon" />}
                        style={{ textDecoration: "none" }}
                      />
                    </CardFooter>
                  )}
                </Card>
              </GalleryItem>
            ))}
          </Gallery>
        </FlexItem>
      </Flex>
    </PageSection>
  );
}
