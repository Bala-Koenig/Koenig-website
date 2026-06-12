"use client";
import React from "react";
import { motion } from "framer-motion";

const HOVER_COLORS = [
  "rgb(125 211 252)",
  "rgb(249 168 212)",
  "rgb(134 239 172)",
  "rgb(253 224 71)",
  "rgb(252 165 165)",
  "rgb(216 180 254)",
  "rgb(147 197 253)",
  "rgb(165 180 252)",
  "rgb(196 181 253)",
];

// 16 Microsoft official technology logos — inline SVG, zero external deps
const MS_LOGOS: (() => React.ReactElement)[] = [
  // 1. Azure
  () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 19h6l3-5.5 4 8.5h7L13 2z" fill="#0078D4"/>
      <path d="M12 2L6 15.5l4.5 2.5 1.5-4 4 8.5h7L13 2z" fill="#50e6ff" opacity=".55"/>
    </svg>
  ),
  // 2. Microsoft Teams
  () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="9" width="12" height="10" rx="3" fill="#6264A7"/>
      <rect x="11" y="5" width="9" height="8.5" rx="2.5" fill="#6264A7" opacity=".72"/>
      <circle cx="19" cy="6" r="3.5" fill="#7B83EB"/>
    </svg>
  ),
  // 3. Microsoft 365 (4-colour Windows squares)
  () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="1"  y="1"  width="10" height="10" rx="1.5" fill="#f25022"/>
      <rect x="13" y="1"  width="10" height="10" rx="1.5" fill="#7fba00"/>
      <rect x="1"  y="13" width="10" height="10" rx="1.5" fill="#00a4ef"/>
      <rect x="13" y="13" width="10" height="10" rx="1.5" fill="#ffb900"/>
    </svg>
  ),
  // 4. Power BI
  () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="1"  y="13" width="5.5" height="10" rx="1.5" fill="#F2C811"/>
      <rect x="9"  y="7"  width="5.5" height="16" rx="1.5" fill="#F2C811" opacity=".85"/>
      <rect x="17" y="2"  width="5.5" height="21" rx="1.5" fill="#F2C811" opacity=".65"/>
    </svg>
  ),
  // 5. Azure DevOps
  () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#0078D4" strokeWidth="1.5" fill="none"/>
      <circle cx="12" cy="12" r="4"  fill="#0078D4" opacity=".4"/>
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="#50e6ff" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  // 6. GitHub
  () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path fillRule="evenodd" clipRule="evenodd"
        d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.68c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.7.115 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.69 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z"
        fill="rgba(255,255,255,0.8)"/>
    </svg>
  ),
  // 7. Microsoft Defender
  () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 6v6c0 5.25 3.6 10.15 9 11.54C17.4 22.15 21 17.25 21 12V6L12 2z"
        fill="#0078D4" opacity=".22" stroke="#0078D4" strokeWidth="1.3"/>
      <path d="M8 12l3.5 3.5 5-5" stroke="#50e6ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  // 8. Azure AI / Copilot
  () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="#0F6CBD" strokeWidth="1" fill="none" opacity=".35"/>
      <path d="M12 3l2.4 6H21l-5.4 3.9 2.4 6L12 15l-6 3.9 2.4-6L3 9h6.6z" fill="#50e6ff"/>
    </svg>
  ),
  // 9. Microsoft Outlook
  () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="1" y="5" width="14" height="14" rx="2.5" fill="#0078D4"/>
      <path d="M1 8l7 5 7-5" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
      <rect x="12" y="3" width="11" height="11" rx="2" fill="#0078D4" opacity=".55" stroke="white" strokeWidth=".8"/>
      <path d="M12 7l5.5 3.5L23 7" stroke="white" strokeWidth="1" strokeLinecap="round" opacity=".8"/>
    </svg>
  ),
  // 10. Microsoft OneDrive
  () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M14.5 9.5C13.7 7.5 11.8 6 9.5 6 6.46 6 4 8.46 4 11.5c0 .17.01.34.02.51A5 5 0 0 0 5 22h14a4 4 0 0 0 1-7.87 6 6 0 0 0-5.5-4.63z"
        fill="#0078D4" opacity=".3"/>
      <path d="M9 19.5C8.2 17.5 6.3 16 4 16a5 5 0 0 0 1 9.87"
        fill="none"/>
      <path d="M5 21h14a4 4 0 0 0 0-8H18a6 6 0 1 0-10.83 5"
        stroke="#0078D4" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      <ellipse cx="12" cy="17" rx="7" ry="4.5" fill="#0078D4" opacity=".18"/>
      <path d="M5 16.5C4.2 14 5.8 11 8.5 10.5 9.5 8 12 6.5 14.5 7c2.2.4 3.8 2 4 4 1.7.3 3 1.8 3 3.5" stroke="#50e6ff" strokeWidth="1.4" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  // 11. SharePoint
  () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="9" r="7" fill="#038387" opacity=".25" stroke="#038387" strokeWidth="1.3"/>
      <circle cx="15" cy="12" r="6" fill="#038387" opacity=".45" stroke="#038387" strokeWidth="1.3"/>
      <circle cx="9" cy="16" r="5" fill="#038387" opacity=".7" stroke="#038387" strokeWidth="1.3"/>
      <text x="6.5" y="19.5" fontSize="8" fontWeight="bold" fill="white" fontFamily="Arial">S</text>
    </svg>
  ),
  // 12. Visual Studio Code
  () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M17 2L7 12.5 3 9l-1 1 4.5 4L2 18l1 1 4-3.5L17 22l5-2.5V4.5L17 2z"
        fill="#007ACC" opacity=".2" stroke="#007ACC" strokeWidth="1.2"/>
      <path d="M22 4.5L17 2 7 12.5 3 9l-1 1 4.5 4L2 18l1 1 4-3.5L17 22l5-2.5V4.5z"
        fill="none" stroke="#007ACC" strokeWidth="1"/>
      <path d="M17 6.5l-7 6 7 5V6.5z" fill="#007ACC" opacity=".6"/>
    </svg>
  ),
  // 13. Microsoft Sentinel
  () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L3 6v6c0 5.25 3.6 10.15 9 11.54C17.4 22.15 21 17.25 21 12V6L12 2z"
        fill="#6264A7" opacity=".22" stroke="#6264A7" strokeWidth="1.3"/>
      <circle cx="12" cy="11" r="3.5" fill="#6264A7" opacity=".6"/>
      <circle cx="12" cy="11" r="1.5" fill="#c4b5fd"/>
      <path d="M12 7v2M12 13v2M8 11h2M14 11h2" stroke="#a78bfa" strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  ),
  // 14. Azure Functions
  () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="4" fill="#0062AD" opacity=".2" stroke="#0062AD" strokeWidth="1.2"/>
      <path d="M13.5 4l-5 8h5l-3 8 8-10h-5.5l3.5-6h-3z" fill="#50e6ff"/>
    </svg>
  ),
  // 15. Microsoft Fabric
  () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 2L2 12l10 10 10-10L12 2z" fill="#8661C5" opacity=".2" stroke="#8661C5" strokeWidth="1.3"/>
      <path d="M12 6l6 6-6 6-6-6 6-6z" fill="#8661C5" opacity=".45"/>
      <circle cx="12" cy="12" r="3" fill="#c4b5fd"/>
    </svg>
  ),
  // 16. Dynamics 365
  () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M12 3a9 9 0 1 0 0 18A9 9 0 0 0 12 3z" fill="#CC4A31" opacity=".18" stroke="#CC4A31" strokeWidth="1.3"/>
      <path d="M12 7a5 5 0 0 1 5 5" stroke="#CC4A31" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M12 7a5 5 0 0 0-5 5 5 5 0 0 0 5 5" stroke="#FF8C42" strokeWidth="2" strokeLinecap="round" fill="none" opacity=".7"/>
      <circle cx="12" cy="12" r="2.2" fill="#CC4A31"/>
    </svg>
  ),
];

const LOGO_COUNT = MS_LOGOS.length; // 16
// 30 rows / step 6 = 5 row groups; 20 cols / step 5 = 4 col groups → 20 logos total
const STEP_I = 6;
const STEP_J = 5;
const COLS_PER_ROW = Math.ceil(20 / STEP_J); // 4

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const rows = new Array(30).fill(1);
  const cols = new Array(20).fill(1);

  const getRandomColor = () =>
    HOVER_COLORS[Math.floor(Math.random() * HOVER_COLORS.length)];

  return (
    <div
      style={{
        position: "absolute",
        left: "25%",
        top: "-25%",
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "1rem",
        transform: "translate(-40%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) translateZ(0)",
        zIndex: 0,
      }}
      {...rest}
    >
      {rows.map((_, i) => (
        <div
          key={`row` + i}
          style={{
            width: 64,
            height: 32,
            borderLeft: "1px solid rgba(6,148,209,0.25)",
            position: "relative",
            flexShrink: 0,
          }}
        >
          {cols.map((_, j) => {
            const isLogoCell = i % STEP_I === 0 && j % STEP_J === 0;
            const logoIdx = isLogoCell
              ? ((Math.floor(i / STEP_I) * COLS_PER_ROW +
                  Math.floor(j / STEP_J)) %
                LOGO_COUNT)
              : -1;

            return (
              <motion.div
                whileHover={{
                  backgroundColor: getRandomColor(),
                  transition: { duration: 0 },
                }}
                key={`col` + j}
                style={{
                  width: 64,
                  height: 32,
                  borderRight: "1px solid rgba(6,148,209,0.25)",
                  borderTop: "1px solid rgba(6,148,209,0.25)",
                  position: "relative",
                }}
              >
                {isLogoCell ? (
                  <div
                    style={{
                      position: "absolute",
                      pointerEvents: "none",
                      top: -12,
                      left: -12,
                      opacity: 1,
                    }}
                  >
                    {MS_LOGOS[logoIdx]()}
                  </div>
                ) : null}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
