import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface NavLink {
  title: string;
  href: string;
}

export function LessonNav({
  prev,
  next,
}: {
  prev: NavLink | null;
  next: NavLink | null;
}) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 48, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
      {prev ? (
        <Link
          href={prev.href}
          className="nav-btn"
          style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--text-secondary)", textDecoration: "none", padding: "12px 20px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--bg-card)" }}
        >
          <ChevronLeft size={16} className="nav-arrow-left" />
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Предыдущий</div>
            <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{prev.title}</div>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="nav-btn"
          style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--text-secondary)", textDecoration: "none", textAlign: "right" as const, padding: "12px 20px", borderRadius: 12, border: "1px solid var(--border)", background: "var(--bg-card)" }}
        >
          <div>
            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Следующий</div>
            <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{next.title}</div>
          </div>
          <ChevronRight size={16} className="nav-arrow-right" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
