"use client";

import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export function Quiz({
  question,
  options,
  answer,
}: {
  question: string;
  options: string | string[];
  answer: number | string;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  // MDX может передать options как строку или undefined
  let parsedOptions: string[] = [];
  if (Array.isArray(options)) {
    parsedOptions = options;
  } else if (typeof options === "string") {
    try {
      parsedOptions = JSON.parse(options);
    } catch {
      parsedOptions = options.split(",").map((s) => s.trim());
    }
  }

  const parsedAnswer = typeof answer === "string" ? parseInt(answer, 10) : answer;

  if (parsedOptions.length === 0) {
    return null;
  }

  return (
    <div style={{ margin: "24px 0", borderRadius: 16, border: "1px solid var(--border)", background: "var(--bg-card)", padding: 24 }}>
      <p style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 16, fontSize: 15 }}>
        <span style={{ marginRight: 8 }}>🧠</span>{question}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {parsedOptions.map((option, i) => {
          const isCorrect = i === parsedAnswer;
          const isSelected = i === selected;

          let bg = "var(--bg-secondary)";
          let borderColor = "var(--border)";

          if (selected !== null) {
            if (isSelected && isCorrect) { bg = "rgba(34, 197, 94, 0.15)"; borderColor = "var(--accent-green)"; }
            else if (isSelected && !isCorrect) { bg = "rgba(239, 68, 68, 0.15)"; borderColor = "var(--accent-red)"; }
            else if (isCorrect) { bg = "rgba(34, 197, 94, 0.15)"; borderColor = "var(--accent-green)"; }
          }

          return (
            <button
              key={i}
              onClick={() => setSelected(i)}
              disabled={selected !== null}
              style={{
                width: "100%",
                textAlign: "left" as const,
                padding: "12px 16px",
                borderRadius: 12,
                border: `1px solid ${borderColor}`,
                background: bg,
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: selected !== null ? "default" : "pointer",
                transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                opacity: selected !== null && !isSelected && !isCorrect ? 0.5 : 1,
                transform: "translateX(0)",
              }}
              onMouseEnter={(e) => {
                if (selected === null) {
                  e.currentTarget.style.background = "var(--bg-accent)";
                  e.currentTarget.style.borderColor = "var(--border-hover)";
                  e.currentTarget.style.transform = "translateX(4px)";
                }
              }}
              onMouseLeave={(e) => {
                if (selected === null) {
                  e.currentTarget.style.background = "var(--bg-secondary)";
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateX(0)";
                }
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-muted)", minWidth: 20 }}>
                {String.fromCharCode(65 + i)}
              </span>
              <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>{option}</span>
              {selected !== null && isSelected && (
                isCorrect
                  ? <CheckCircle size={16} style={{ marginLeft: "auto", color: "var(--accent-green)", animation: "stagger-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }} />
                  : <XCircle size={16} style={{ marginLeft: "auto", color: "var(--accent-red)", animation: "stagger-in 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }} />
              )}
            </button>
          );
        })}
      </div>
      <div style={{
        overflow: "hidden",
        maxHeight: selected !== null ? "50px" : "0px",
        opacity: selected !== null ? 1 : 0,
        transition: "max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: "200ms",
      }}>
        {selected !== null && selected !== parsedAnswer && (
          <p style={{ fontSize: 13, color: "var(--accent-red)", marginTop: 12 }}>
            Правильный ответ: {parsedOptions[parsedAnswer]}
          </p>
        )}
        {selected !== null && selected === parsedAnswer && (
          <p style={{ fontSize: 13, color: "var(--accent-green)", marginTop: 12, fontWeight: 600 }}>Верно! 🎉</p>
        )}
      </div>
    </div>
  );
}
