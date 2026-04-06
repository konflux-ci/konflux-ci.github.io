import type { ReactNode } from "react";
import { PageSection, Flex, FlexItem, Gallery } from "@patternfly/react-core";
import type { TryKonfluxData } from "@site/src/types/content";
import SectionHeader from "@site/src/components/ui/SectionHeader";
import OptionCard from "@site/src/components/ui/OptionCard";

interface TryKonfluxPageProps {
  data: TryKonfluxData;
}

export default function TryKonfluxPage({
  data,
}: TryKonfluxPageProps): ReactNode {
  return (
    <PageSection
      style={{
        padding:
          "var(--pf-t--global--spacer--3xl) var(--pf-t--global--spacer--lg)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Flex
        direction={{
          default: "column",
        }}
        justifyContent={{ default: "justifyContentCenter" }}
        rowGap={{ default: "rowGapXl" }}
        style={{ maxWidth: "1200px" }}
      >
        <SectionHeader
          sectionLabel={data.sectionLabel}
          heading={data.heading}
          subtitle={data.subtitle}
          align="left"
        />

        <Gallery hasGutter minWidths={{ default: "100%", md: "48%" }}>
          {data.installationOptions.map((option) => (
            <OptionCard key={option.title} option={option} />
          ))}
        </Gallery>

      </Flex>
    </PageSection>
  );
}
