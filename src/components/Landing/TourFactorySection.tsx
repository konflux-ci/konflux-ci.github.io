import type { ReactNode } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Content,
  Flex,
  FlexItem,
  Gallery,
  GalleryItem,
  PageSection,
} from "@patternfly/react-core";
import type { TourFactoryData } from "@site/src/types/content";
import SectionHeader from "@site/src/components/ui/SectionHeader";
import DataDrivenButton from "@site/src/components/ui/DataDrivenButton";
import DynamicIcon from "@site/src/components/ui/DynamicIcon";
import { ExternalLinkSquareAltIcon } from "@patternfly/react-icons";

interface TourFactorySectionProps {
  data: TourFactoryData;
}

export default function TourFactorySection({
  data,
}: TourFactorySectionProps): ReactNode {
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
            minWidths={{ default: "100%", sm: "45%", lg: "18%" }}
          >
            {data.components.map((comp) => (
              <GalleryItem key={comp.title}>
                <Card isCompact isFullHeight>
                  <CardHeader>
                    <DynamicIcon
                      name={comp.icon}
                      style={{
                        width: "24px",
                        height: "24px",
                        color:
                          "var(--pf-t--global--icon--color--brand--default)",
                      }}
                    />
                  </CardHeader>
                  <CardTitle style={{ padding: 0, fontWeight: 700 }}>
                    {comp.link ? (
                      <DataDrivenButton
                        link={comp.link}
                        isInline
                        icon={
                          <ExternalLinkSquareAltIcon
                            style={{
                              color:
                                "var(--pf-t--global--text--color--regular)",
                            }}
                          />
                        }
                        style={{
                          color: "var(--pf-t--global--text--color--regular)",
                          textDecoration: "none",
                        }}
                      >
                        {comp.title}
                      </DataDrivenButton>
                    ) : (
                      comp.title
                    )}
                  </CardTitle>
                  <CardBody>
                    <Content
                      component="p"
                      style={{
                        color: "var(--pf-t--global--text--color--subtle)",
                        fontSize: "var(--pf-t--global--font--size--body--sm)",
                      }}
                    >
                      {comp.description}
                    </Content>
                  </CardBody>
                </Card>
              </GalleryItem>
            ))}
          </Gallery>
        </FlexItem>
      </Flex>
    </PageSection>
  );
}
