import type { ReactNode, CSSProperties, ComponentType } from "react";
import * as PFIcons from "@patternfly/react-icons";

const iconRegistry = PFIcons as unknown as Record<
  string,
  ComponentType<{ style?: CSSProperties; className?: string }> | undefined
>;

interface DynamicIconProps {
  name: string;
  style?: CSSProperties;
  className?: string;
}

export default function DynamicIcon({
  name,
  style,
  className,
}: DynamicIconProps): ReactNode {
  const Icon = iconRegistry[name];
  if (!Icon) return null;
  return <Icon style={style} className={className} />;
}
