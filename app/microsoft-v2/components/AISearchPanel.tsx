"use client";
// AISearchPanel.tsx
// Drop this into: app/enterprise/components/AISearchPanel.tsx
// Shows 2-line answer + learn more + matched exam codes
// Uses existing Koenig CSS classes — no design changes

import React, { useState } from "react";
import { AISearchResult } from "./aiSearch";

interface AISearchPanelProps {
  result: AISearchResult | null;
  query: string;
  isSearching: boolean;
}

export default function AISearchPanel({
  result,
  query,
  isSearching,
}: AISearchPanelProps) {
  const [expanded, setExpanded] = useState(false);

  // Nothing to show
  if (!query || query.trim().length < 2) {
    return (
      <div className="cf-ai-panel">
        <div className="cf-ai-inner">
          <p className="cf-ai-placeholder">
            Type a topic above to get AI-powered course recommendations.
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (isSearching) {
    return (
      <div className="cf-ai-panel">
        <div className="cf-ai-inner">
          <div className="cf-ai-loading">
            <span className="cf-ai-dot" />
            <span className="cf-ai-dot" />
            <span className="cf-ai-dot" />
            <span className="cf-ai-loading-text">Finding best courses...</span>
          </div>
        </div>
      </div>
    );
  }

  // No result
  if (!result) return null;

  return (
    <div className="cf-ai-panel">
      <div className="cf-ai-inner">

        {/* AI badge */}
        <div className="cf-ai-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
          AI Answer
        </div>

        {/* 2-line answer */}
        <p className="cf-ai-answer">{result.answer}</p>

        {/* Learn more — expandable */}
        {result.learnMore && (
          <div className="cf-ai-learn">
            <button
              className="cf-ai-learn-toggle"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Show less" : "Learn more"}
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {expanded && (
              <p className="cf-ai-learn-text">{result.learnMore}</p>
            )}
          </div>
        )}

        {/* Technology tag */}
        {result.technology && result.technology !== "General" && (
          <div className="cf-ai-tech">
            <span className="cf-ai-tech-label">Showing courses for:</span>
            <span className="cf-ai-tech-tag">{result.technology}</span>
          </div>
        )}

        {/* Matched exam codes */}
        {result.examCodes.length > 0 && (
          <div className="cf-ai-codes">
            {result.examCodes.map((code) => (
              <span key={code} className="cf-exam-code-tag">
                {code}
              </span>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
