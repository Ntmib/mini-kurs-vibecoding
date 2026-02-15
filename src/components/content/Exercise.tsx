"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

export function Exercise({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{
      margin: "24px 0",
      borderRadius: 16,
      border: "1px solid var(--border)",
      background: "var(--bg-card)",
      padding: 24,
      borderLeft: "3px solid var(--accent-cyan)",
    }}>
      <p style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: 12, fontSize: 15 }}>
        <span style={{ marginRight: 8 }}>✏️</span>Упражнение: {title}
      </p>
      <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}

export function Solution({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginTop: 16 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 13,
          fontWeight: 600,
          color: "var(--accent-blue)",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          transition: "opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          padding: 0,
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
      >
        <ChevronRight
          size={16}
          style={{
            transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: open ? "rotate(90deg)" : "rotate(0deg)",
          }}
        />
        {open ? "Скрыть решение" : "Показать решение"}
      </button>
      <div style={{
        overflow: "hidden",
        maxHeight: open ? "1000px" : "0px",
        opacity: open ? 1 : 0,
        transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        marginTop: open ? 12 : 0,
      }}>
        <div style={{
          padding: 16,
          background: "var(--bg-secondary)",
          borderRadius: 12,
          border: "1px solid var(--border)",
          fontSize: 14,
          color: "var(--text-secondary)",
          lineHeight: 1.7,
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}
