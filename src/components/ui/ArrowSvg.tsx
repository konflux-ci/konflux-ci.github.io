import type { ReactNode } from "react";

interface ArrowSvgProps {
  color: string;
  width?: number;
}

export default function ArrowSvg({
  color,
  width = 80,
}: ArrowSvgProps): ReactNode {
  return (
    <svg
      width={width}
      height="24"
      viewBox={`0 0 ${width} 24`}
      fill="none"
      style={{ flexShrink: 0 }}
    >
      <line
        x1="0"
        y1="12"
        x2={width - 10}
        y2="12"
        style={{ stroke: color }}
        strokeWidth="1.5"
      />
      <polyline
        points={`${width - 16},6 ${width - 10},12 ${width - 16},18`}
        style={{ stroke: color }}
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
