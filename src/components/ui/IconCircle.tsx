import type { ReactNode } from "react";

interface IconCircleProps {
  children: ReactNode;
  size?: number;
  variant?: "secondary" | "brand";
  style?: React.CSSProperties;
}

export default function IconCircle({
  children,
  size = 48,
  variant = "secondary",
  style,
}: IconCircleProps): ReactNode {
  const bgColor =
    variant === "brand"
      ? "var(--pf-t--global--color--brand--default)"
      : "var(--pf-t--global--background--color--secondary--default)";

  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: bgColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
