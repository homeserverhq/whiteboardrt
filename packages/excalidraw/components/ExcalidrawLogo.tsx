import { PRODUCT_NAME } from "@excalidraw/common";

import "./ExcalidrawLogo.scss";

const LogoIcon = () => (
  <svg
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="ExcalidrawLogo-icon"
  >
    <rect x="2" y="2" width="36" height="36" rx="8" fill="currentColor" />
    <path
      d="M10 14h20M10 21h15M10 28h10"
      stroke="var(--color-logo-bg, #121212)"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const LogoText = () => (
  <svg
    viewBox="0 0 450 55"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    className="ExcalidrawLogo-text"
  >
    <text
      x="0"
      y="42"
      fill="currentColor"
      fontFamily="Assistant, sans-serif"
      fontSize="44"
      fontWeight="700"
    >
      {PRODUCT_NAME}
    </text>
  </svg>
);

type LogoSize = "xs" | "small" | "normal" | "large" | "custom" | "mobile";

interface LogoProps {
  size?: LogoSize;
  withText?: boolean;
  style?: React.CSSProperties;
  /**
   * If true, the logo will not be wrapped in a Link component.
   * The link prop will be ignored as well.
   * It will merely be a plain div.
   */
  isNotLink?: boolean;
}

export const ExcalidrawLogo = ({
  style,
  size = "small",
  withText,
}: LogoProps) => {
  return (
    <div className={`ExcalidrawLogo is-${size}`} style={style}>
      <LogoIcon />
      {withText && <LogoText />}
    </div>
  );
};
