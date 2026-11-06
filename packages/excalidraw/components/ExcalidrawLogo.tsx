import { PRODUCT_NAME } from "@excalidraw/common";

import { WHITEBOARDRT_LOGO_DATA_URI } from "./whiteboardrtLogo";

import "./ExcalidrawLogo.scss";

const LogoIcon = () => (
  <img
    src={WHITEBOARDRT_LOGO_DATA_URI}
    alt=""
    className="ExcalidrawLogo-icon"
    draggable={false}
  />
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
