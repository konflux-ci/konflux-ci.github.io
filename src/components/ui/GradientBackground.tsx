import type { ReactNode } from "react";

interface GradientBackgroundProps {
  gradient: string;
  style?: React.CSSProperties;
}

export default function GradientBackground({
  gradient,
  style,
}: GradientBackgroundProps): ReactNode {
  return (
    <div
      style={{
        position: "absolute",
        pointerEvents: "none",
        inset: 0,
        background: gradient,
        ...style,
      }}
    />
  );
}

export function MainGradient(): ReactNode {
  return (
    <>
      <GradientBackground gradient="radial-gradient(80% 50% at 50% 40%, rgba(72, 181, 255, 0.15) 0%, rgba(72, 181, 255, 0.08) 50%, transparent 70%)" />
      <GradientBackground
        gradient="radial-gradient(rgba(72, 181, 255, 0.12) 0%, transparent 70%)"
        style={{
          top: 0,
          left: "25%",
          width: "500px",
          height: "400px",
          inset: "unset",
        }}
      />
    </>
  );
}
