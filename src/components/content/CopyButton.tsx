"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        background: "var(--bg-accent)",
        border: "1px solid var(--border)",
        color: copied ? "var(--accent-green)" : "var(--text-muted)",
        borderRadius: 6,
        padding: "4px 10px",
        fontSize: 11,
        cursor: "pointer",
        fontFamily: "'Inter', sans-serif",
        transition: "all 0.2s",
        display: "flex",
        alignItems: "center",
        gap: 4,
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Скопировано" : "Копировать"}
    </button>
  );
}
