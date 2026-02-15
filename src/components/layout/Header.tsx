"use client";

import Link from "next/link";
import { BookOpen, Sun, Moon, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const lessons = [
  { href: "/lessons/1", label: "Урок 1" },
  { href: "/lessons/2", label: "Урок 2" },
  { href: "/lessons/3", label: "Урок 3" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "dark" | "light" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  };

  return (
    <header
      className={theme === "dark" ? "header-dark" : "header-light"}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        borderBottom: "1px solid var(--border)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "0 20px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "var(--text-primary)",
            fontWeight: 800,
            fontSize: 16,
          }}
        >
          <span style={{ fontSize: 20 }}>🚀</span>
          <span
            style={{
              background: "linear-gradient(135deg, #6366f1, #a855f7)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Вайбкодинг
          </span>
        </Link>

        <nav style={{ alignItems: "center", gap: 16 }} className="hidden md:flex">
          {lessons.map((lesson) => (
            <Link
              key={lesson.href}
              href={lesson.href}
              className="header-nav-link"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: pathname === lesson.href ? "var(--accent-blue)" : "var(--text-muted)",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                transition: "color 0.2s",
              }}
            >
              {lesson.label}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.3s",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                transition: "transform 0.3s cubic-bezier(0.22, 1.36, 0.36, 1)",
                transform: theme === "dark" ? "rotate(0deg)" : "rotate(180deg)",
              }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </span>
          </button>
        </nav>

        <div className="flex md:hidden" style={{ gap: 8 }}>
          <button
            onClick={toggleTheme}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                transition: "transform 0.3s cubic-bezier(0.22, 1.36, 0.36, 1)",
                transform: theme === "dark" ? "rotate(0deg)" : "rotate(180deg)",
              }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </span>
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      <div
        className="md:hidden"
        style={{
          overflow: "hidden",
          maxHeight: menuOpen ? "300px" : "0px",
          opacity: menuOpen ? 1 : 0,
          transition:
            "max-height 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          style={{
            padding: "12px 20px 20px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {lessons.map((lesson) => (
            <Link
              key={lesson.href}
              href={lesson.href}
              onClick={() => setMenuOpen(false)}
              className="mobile-nav-link"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: pathname === lesson.href ? "var(--accent-blue)" : "var(--text-secondary)",
                textDecoration: "none",
                fontSize: 15,
                fontWeight: 600,
                padding: "12px 16px",
                borderRadius: 10,
                transition: "background 0.2s",
              }}
            >
              <BookOpen size={16} />
              {lesson.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
