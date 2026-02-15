import { Info, AlertTriangle, Lightbulb, CheckCircle, Zap } from "lucide-react";

const styles = {
  info: {
    borderColor: "var(--accent-blue)",
    bg: "rgba(99, 102, 241, 0.08)",
    iconColor: "var(--accent-blue)",
    icon: <Info size={18} />,
    title: "Информация",
  },
  warning: {
    borderColor: "var(--accent-orange)",
    bg: "rgba(249, 115, 22, 0.08)",
    iconColor: "var(--accent-orange)",
    icon: <AlertTriangle size={18} />,
    title: "Внимание",
  },
  tip: {
    borderColor: "var(--accent-green)",
    bg: "rgba(34, 197, 94, 0.08)",
    iconColor: "var(--accent-green)",
    icon: <Lightbulb size={18} />,
    title: "Совет",
  },
  success: {
    borderColor: "var(--accent-green)",
    bg: "rgba(34, 197, 94, 0.08)",
    iconColor: "var(--accent-green)",
    icon: <CheckCircle size={18} />,
    title: "Готово",
  },
  analogy: {
    borderColor: "var(--accent-purple)",
    bg: "rgba(168, 85, 247, 0.08)",
    iconColor: "var(--accent-purple)",
    icon: <Zap size={18} />,
    title: "Аналогия",
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: keyof typeof styles;
  title?: string;
  children: React.ReactNode;
}) {
  const style = styles[type];

  return (
    <div style={{
      margin: "24px 0",
      borderLeft: `3px solid ${style.borderColor}`,
      background: style.bg,
      borderRadius: "var(--radius-sm)",
      padding: "16px 20px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, fontWeight: 700, fontSize: 14, color: style.iconColor }}>
        <span style={{ display: "inline-flex", animation: "icon-pulse 2.5s ease-in-out infinite" }}>
          {style.icon}
        </span>
        {title || style.title}
      </div>
      <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7 }}>{children}</div>
    </div>
  );
}
