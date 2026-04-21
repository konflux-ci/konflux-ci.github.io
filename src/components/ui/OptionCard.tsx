import type { ReactNode, CSSProperties } from "react";
import { useRef, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Label,
  List,
  ListItem,
  Flex,
  Content,
} from "@patternfly/react-core";
import { OutlinedCheckCircleIcon } from "@patternfly/react-icons";
import type { InstallationOption } from "@site/src/types/content";
import DynamicIcon from "@site/src/components/ui/DynamicIcon";
import DataDrivenButton from "@site/src/components/ui/DataDrivenButton";
import "./OptionCard.css";

interface OptionCardProps {
  option: InstallationOption;
  variant?: "default" | "preview";
}

export default function OptionCard({
  option,
  variant = "default",
}: OptionCardProps): ReactNode {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const cardStyle: CSSProperties = {
    "--mouse-x": `${mousePosition.x}%`,
    "--mouse-y": `${mousePosition.y}%`,
  } as CSSProperties;

  const cardClassName = `option-card ${variant === "preview" ? "option-card--preview" : ""}`;

  return (
    <Card
      isFullHeight
      isPlain
      className={cardClassName}
      style={cardStyle}
      ref={cardRef}
      onMouseMove={handleMouseMove}
    >
      <div className="option-card-content">
        <CardHeader className="option-card-header">
          <Flex
            gap={{ default: "gapMd" }}
            justifyContent={{ default: "justifyContentSpaceBetween" }}
            alignItems={{ default: "alignItemsFlexStart" }}
          >
            <Card isCompact isPlain className="option-card-icon-wrapper">
              <CardBody>
                <DynamicIcon name={option.icon} className="option-card-icon" />
              </CardBody>
            </Card>
            <Label color={option.badgeColor}>{option.badge}</Label>
          </Flex>
        </CardHeader>
        <CardTitle className="option-card-title">
          <Content component="h1">{option.title}</Content>
          <Content component="p" className="option-card-description">
            {option.description}
          </Content>
        </CardTitle>
        <CardBody>
          <List isPlain>
            {option.features.map((feature, i) => (
              <ListItem
                key={i}
                icon={
                  <OutlinedCheckCircleIcon className="option-card-feature-icon" />
                }
              >
                {feature}
              </ListItem>
            ))}
          </List>
          {option.note && (
            <Content
              component="small"
              style={{
                fontStyle: "italic",
                color: "var(--pf-t--global--text--color--subtle)",
                marginTop: "var(--pf-t--global--spacer--md)",
                display: "block",
              }}
            >
              {option.note}
            </Content>
          )}
        </CardBody>
        <CardFooter>
          <DataDrivenButton link={option.link} className="option-card-cta" />
        </CardFooter>
      </div>
    </Card>
  );
}
