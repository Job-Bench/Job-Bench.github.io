import type { SourceType } from "@/data/tasks";

type IconProps = {
  size?: number;
  color?: string;
  className?: string;
  strokeWidth?: number;
};

const DEFAULT_STROKE = 1.4;

export function SourceTypeGlyph({
  type,
  size = 12,
  color = "currentColor",
}: {
  type: SourceType;
  size?: number;
  color?: string;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: color,
    strokeWidth: 1.3,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    shapeRendering: "geometricPrecision" as const,
  };
  switch (type) {
    case "db":
      return (
        <svg {...common}>
          <ellipse cx="8" cy="3.5" rx="5" ry="1.5" />
          <path d="M3 3.5v9c0 .83 2.24 1.5 5 1.5s5-.67 5-1.5v-9" />
          <path d="M3 7c0 .83 2.24 1.5 5 1.5s5-.67 5-1.5" />
          <path d="M3 10.25c0 .83 2.24 1.5 5 1.5s5-.67 5-1.5" />
        </svg>
      );
    case "pdf":
      return (
        <svg {...common}>
          <path d="M4 2h6l3 3v9H4z" />
          <path d="M10 2v3h3" />
          <path d="M6 9h4M6 11h4" />
        </svg>
      );
    case "csv":
      return (
        <svg {...common}>
          <rect x="2.5" y="3" width="11" height="10" rx="0.5" />
          <path d="M6 3v10M10 3v10M2.5 7h11M2.5 10h11" />
        </svg>
      );
    case "xlsx":
      return (
        <svg {...common}>
          <rect x="2.5" y="3" width="11" height="10" rx="0.5" />
          <path d="M2.5 6.5h11M2.5 9.5h11M6 3v10M10 3v10" />
          <path d="M6.75 4.5l2.5 1.5M9.25 4.5l-2.5 1.5" />
        </svg>
      );
    case "txt":
      return (
        <svg {...common}>
          <path d="M4 2h6l3 3v9H4z" />
          <path d="M10 2v3h3" />
          <path d="M6 8.5h5M6 10.5h5M6 12.5h3" />
        </svg>
      );
    case "interview":
      return (
        <svg {...common}>
          <path d="M2.5 4.5a1.5 1.5 0 011.5-1.5h8a1.5 1.5 0 011.5 1.5v5a1.5 1.5 0 01-1.5 1.5H7l-2.5 2v-2H4A1.5 1.5 0 012.5 9.5z" />
          <path d="M6 6.5h4M6 8.5h3" />
        </svg>
      );
    default:
      return null;
  }
}

export function RoleGlyph({
  role,
  size = 14,
  color = "currentColor",
  strokeWidth = DEFAULT_STROKE,
}: IconProps & { role: string }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (role) {
    case "scales":
      return (
        <svg {...common}>
          <path d="M8 2v11" />
          <path d="M4 13h8" />
          <path d="M3 4h10" />
          <path d="M4 4l-2 4a2 2 0 004 0zM12 4l-2 4a2 2 0 004 0z" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M2.5 13h11" />
          <path d="M2.5 13V3" />
          <path d="M5 10V8M8 10V5M11 10V6.5" />
        </svg>
      );
    case "newspaper":
      return (
        <svg {...common}>
          <rect x="2.5" y="3" width="11" height="10" rx="0.5" />
          <path d="M5 5.5h6M5 8h6M5 10.5h4" />
        </svg>
      );
    case "bridge":
      return (
        <svg {...common}>
          <path d="M2 12V7" />
          <path d="M14 12V7" />
          <path d="M2 8c2 0 3.5-1.5 3.5-3M14 8c-2 0-3.5-1.5-3.5-3" />
          <path d="M1.5 12h13" />
          <path d="M5.5 5h5" />
        </svg>
      );
    case "bank":
      return (
        <svg {...common}>
          <path d="M2 6.5L8 3l6 3.5" />
          <path d="M3 7.5v4.5M6 7.5v4.5M10 7.5v4.5M13 7.5v4.5" />
          <path d="M2 13h12" />
        </svg>
      );
    case "derrick":
      return (
        <svg {...common}>
          <path d="M4 13l2.5-10" />
          <path d="M12 13L9.5 3" />
          <path d="M6.5 3h3" />
          <path d="M5.2 7h5.6M5.7 10h4.6" />
          <path d="M2 13h12" />
        </svg>
      );
    default:
      return null;
  }
}

export function SparkIcon({
  size = 12,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
      stroke={color}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 1.5v2.5M6 8v2.5M1.5 6h2.5M8 6h2.5" />
      <path d="M3 3l1.5 1.5M7.5 7.5L9 9M9 3l-1.5 1.5M4.5 7.5L3 9" />
    </svg>
  );
}

export function BoltIcon({
  size = 12,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill={color}
      stroke="none"
      className={className}
    >
      <path d="M6.5 1L2 7h3l-1 4 4.5-6h-3z" />
    </svg>
  );
}

export function LightbulbIcon({
  size = 12,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 1.8a4 4 0 00-2.5 7.2c.6.5.8 1 .8 1.6v1h3.4v-1c0-.6.2-1.1.8-1.6A4 4 0 008 1.8z" />
      <path d="M6.5 13h3" />
      <path d="M7 14.5h2" />
    </svg>
  );
}

export function FlowIcon({
  size = 12,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="3" cy="4" r="1.5" />
      <circle cx="3" cy="12" r="1.5" />
      <circle cx="13" cy="8" r="1.5" />
      <path d="M4.5 4h3.5a3 3 0 013 3v0" />
      <path d="M4.5 12H8a3 3 0 003-3v0" />
    </svg>
  );
}

export function PackageIcon({
  size = 12,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 2l5.5 3v6L8 14 2.5 11V5z" />
      <path d="M2.5 5l5.5 3 5.5-3" />
      <path d="M8 8v6" />
    </svg>
  );
}

export function LayersIcon({
  size = 12,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M8 2l6 3-6 3-6-3z" />
      <path d="M2 8l6 3 6-3" />
      <path d="M2 11l6 3 6-3" />
    </svg>
  );
}

export function FilesIcon({
  size = 12,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 3h5l3 3v8H5z" />
      <path d="M10 3v3h3" />
      <path d="M3 5v9h8" />
    </svg>
  );
}

export function BranchIcon({
  size = 12,
  color = "currentColor",
  className,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke={color}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="4" cy="3.5" r="1.5" />
      <circle cx="4" cy="12.5" r="1.5" />
      <circle cx="12" cy="8" r="1.5" />
      <path d="M4 5v6" />
      <path d="M4 8h3.5a3 3 0 003-3V5" />
    </svg>
  );
}
