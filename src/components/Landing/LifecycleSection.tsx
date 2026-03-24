import { useState, type ReactNode } from "react";
import {
  Button,
  Card,
  CardBody,
  Content,
  Flex,
  FlexItem,
  Label,
  PageSection,
  Title,
} from "@patternfly/react-core";
import {
  AngleLeftIcon,
  AngleRightIcon,
  OutlinedCheckCircleIcon,
} from "@patternfly/react-icons";
import type { HowItWorksData } from "@site/src/types/content";
import IconCircle from "@site/src/components/ui/IconCircle";
import SectionHeader from "@site/src/components/ui/SectionHeader";
import DynamicIcon from "@site/src/components/ui/DynamicIcon";

interface LifecycleSectionProps {
  data: HowItWorksData;
}

function StepIndicator({
  steps,
  activeIndex,
  onSelect,
}: {
  steps: HowItWorksData["steps"];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <Flex
      alignItems={{ default: "alignItemsCenter" }}
      justifyContent={{ default: "justifyContentCenter" }}
      flexWrap={{ default: "nowrap" }}
      style={{ width: "100%", overflowX: "auto" }}
    >
      {steps.map((step, index) => {
        const isActive = index === activeIndex;
        const iconColor = isActive
          ? "var(--pf-t--global--text--color--on-brand--default)"
          : "var(--pf-t--global--icon--color--subtle)";
        const textColor = isActive
          ? "var(--pf-t--global--text--color--regular)"
          : "var(--pf-t--global--text--color--subtle)";

        return (
          <Flex
            key={step.title}
            alignItems={{ default: "alignItemsCenter" }}
            flexWrap={{ default: "nowrap" }}
            flex={{ default: index < steps.length - 1 ? "flex_1" : "flexNone" }}
            style={{ flexShrink: 0 }}
          >
            <FlexItem style={{ margin: 0 }}>
              <Button
                variant="plain"
                onClick={() => onSelect(index)}
                aria-label={`Step ${index + 1}: ${step.title}`}
                aria-current={isActive ? "step" : undefined}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "var(--pf-t--global--spacer--xs)",
                  padding: "var(--pf-t--global--spacer--sm)",
                  minWidth: "80px",
                }}
              >
                <IconCircle
                  size={48}
                  variant={isActive ? "brand" : "secondary"}
                  style={{
                    backgroundColor: isActive
                      ? "var(--pf-t--global--color--brand--default)"
                      : activeIndex > index
                        ? "var(--pf-t--global--color--nonstatus--orangered--default)"
                        : "var(--pf-t--global--background--color--secondary--default)",
                  }}
                >
                  <DynamicIcon
                    name={step.icon}
                    style={{
                      width: "24px",
                      height: "24px",
                      color:
                        activeIndex > index
                          ? "var(--pf-t--global--color--brand--200)"
                          : iconColor,
                    }}
                  />
                </IconCircle>
              </Button>
              <Content
                component="small"
                style={{
                  fontWeight: isActive
                    ? "var(--pf-t--global--font--weight--body--bold)"
                    : "var(--pf-t--global--font--weight--body--normal)",
                  color: textColor,
                  marginBlockEnd: 0,
                }}
              >
                {step.title}
              </Content>
              <Content
                component="small"
                style={{
                  color: "var(--pf-t--global--text--color--subtle)",
                  textAlign: "center",
                  whiteSpace: "nowrap",
                }}
              >
                {step.subtitle}
              </Content>
            </FlexItem>

            {index < steps.length - 1 && (
              <FlexItem
                flex={{ default: "flex_1" }}
                className="pf-v6-u-display-none pf-v6-u-display-flex-on-md"
                style={{
                  height: "2px",
                  marginBlockEnd: "35px",
                  minWidth: "20px",
                  alignSelf: "center",
                  backgroundColor:
                    activeIndex > index
                      ? "var(--pf-t--global--color--nonstatus--orangered--default)"
                      : "var(--pf-t--global--border--color--default)",
                }}
              />
            )}
          </Flex>
        );
      })}
    </Flex>
  );
}

function StepDetail({
  step,
  stepIndex,
  totalSteps,
  onPrev,
  onNext,
}: {
  step: HowItWorksData["steps"][0];
  stepIndex: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <Card isCompact isFullHeight>
      <CardBody>
        <Flex
          direction={{ default: "column", md: "row" }}
          gap={{ default: "gapLg" }}
        >
          {/* Left column: icon, step label, title, nav arrows */}
          <FlexItem flex={{ default: "flex_1" }}>
            <Flex direction={{ default: "column" }} gap={{ default: "gapMd" }}>
              <FlexItem>
                <IconCircle size={48} variant="brand">
                  <DynamicIcon
                    name={step.icon}
                    style={{
                      width: "24px",
                      height: "24px",
                      color:
                        "var(--pf-t--global--text--color--on-brand--default)",
                    }}
                  />
                </IconCircle>
              </FlexItem>
              <FlexItem>
                <Content
                  component="p"
                  style={{
                    fontSize: "var(--pf-t--global--font--size--body--sm)",
                    color: "var(--pf-t--global--text--color--subtle)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Step {stepIndex + 1} of {totalSteps}
                </Content>
              </FlexItem>
              <FlexItem>
                <Title
                  headingLevel="h3"
                  size="xl"
                  style={{
                    color: "var(--pf-t--global--text--color--regular)",
                  }}
                >
                  {step.detailTitle}
                </Title>
              </FlexItem>
              <FlexItem>
                <Flex gap={{ default: "gapSm" }}>
                  <FlexItem>
                    <Button
                      variant="primary"
                      className="pf-m-brand-orange"
                      onClick={onPrev}
                      isDisabled={stepIndex === 0}
                      aria-label="Previous step"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        padding: 0,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AngleLeftIcon
                        style={{ height: "24px", width: "24px" }}
                      />
                    </Button>
                  </FlexItem>
                  <FlexItem>
                    <Button
                      variant="primary"
                      className="pf-m-brand-orange"
                      onClick={onNext}
                      isDisabled={stepIndex === totalSteps - 1}
                      aria-label="Next step"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        padding: 0,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <AngleRightIcon
                        style={{ height: "24px", width: "24px" }}
                      />
                    </Button>
                  </FlexItem>
                </Flex>
              </FlexItem>
            </Flex>
          </FlexItem>

          {/* Right column: description + badges */}
          <FlexItem flex={{ default: "flex_1" }}>
            <Flex direction={{ default: "column" }} gap={{ default: "gapMd" }}>
              <FlexItem>
                <Content
                  component="p"
                  style={{
                    color: "var(--pf-t--global--text--color--subtle)",
                    fontSize: "var(--pf-t--global--font--size--body--default)",
                    lineHeight: 1.6,
                  }}
                >
                  {step.description}
                </Content>
              </FlexItem>
              <FlexItem>
                <Flex gap={{ default: "gapSm" }} flexWrap={{ default: "wrap" }}>
                  {step.badges.map((badge) => (
                    <FlexItem key={badge}>
                      <Label
                        variant="outline"
                        color="blue"
                        icon={<OutlinedCheckCircleIcon />}
                        isCompact
                      >
                        {badge}
                      </Label>
                    </FlexItem>
                  ))}
                </Flex>
              </FlexItem>
            </Flex>
          </FlexItem>
        </Flex>
      </CardBody>
    </Card>
  );
}

export default function LifecycleSection({
  data,
}: LifecycleSectionProps): ReactNode {
  const [activeStep, setActiveStep] = useState(0);

  const handlePrev = () => {
    setActiveStep((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveStep((prev) => Math.min(data.steps.length - 1, prev + 1));
  };

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

        <FlexItem
          style={{
            width: "100%",
            minWidth: 0,
            marginBottom: "var(--pf-t--global--spacer--xl)",
          }}
        >
          <StepIndicator
            steps={data.steps}
            activeIndex={activeStep}
            onSelect={setActiveStep}
          />
        </FlexItem>

        <FlexItem style={{ width: "100%" }}>
          <StepDetail
            step={data.steps[activeStep]}
            stepIndex={activeStep}
            totalSteps={data.steps.length}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        </FlexItem>
      </Flex>
    </PageSection>
  );
}
