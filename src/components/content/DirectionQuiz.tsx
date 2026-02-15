"use client";

import { useState, useMemo } from "react";

interface QuizOption {
  label: string;
  value: "A" | "B" | "C";
}

interface QuizQuestion {
  text: string;
  options: QuizOption[];
}

interface QuizResult {
  emoji: string;
  title: string;
  description: string;
  color: string;
}

const questions: QuizQuestion[] = [
  {
    text: "Что вам ближе?",
    options: [
      { label: "Визуальный результат — чтобы можно было показать и потрогать", value: "A" },
      { label: "Процессы — чтобы всё работало как часы, без ручного труда", value: "B" },
      { label: "Продукт — создать что-то своё и получать доход на автомате", value: "C" },
    ],
  },
  {
    text: "Кто ваш идеальный клиент?",
    options: [
      { label: "Малый бизнес, которому нужен сайт или бот", value: "A" },
      { label: "Компания, которая тонет в рутине и хочет автоматизацию", value: "B" },
      { label: "Вы сами — хотите построить свой продукт", value: "C" },
    ],
  },
  {
    text: "Сколько времени готовы вложить в первый проект?",
    options: [
      { label: "1–2 дня — хочу быстрый результат", value: "A" },
      { label: "До недели — готов разобраться глубже", value: "B" },
      { label: "2–4 недели — готов вложиться в перспективу", value: "C" },
    ],
  },
];

const resultsMap: Record<string, QuizResult> = {
  A: {
    emoji: "🌐",
    title: "Сайты и Telegram",
    description:
      "Начните с лендингов и ботов. Быстрый результат, понятные клиенты, простой вход. Это ваш быстрый старт — уже через пару дней можно показать первый проект.",
    color: "var(--accent-blue)",
  },
  B: {
    emoji: "⚙️",
    title: "Автоматизации и ИИ-агенты",
    description:
      "Вам подойдёт работа с бизнес-процессами: настройка интеграций, ИИ-помощники, автоматические воронки. Клиенты приходят через рекомендации — результат говорит сам за себя.",
    color: "var(--accent-purple)",
  },
  C: {
    emoji: "🚀",
    title: "Свой продукт",
    description:
      "Вам интересно строить своё. Начните с MVP простого сервиса для узкой ниши. Подписная модель даёт стабильный доход, который растёт каждый месяц.",
    color: "var(--accent-green)",
  },
  mixed: {
    emoji: "🎯",
    title: "Комбинация направлений",
    description:
      "У вас широкий интерес — это нормально! Большинство вайбкодеров комбинируют 2–3 направления. Главное — начать с одного, а остальные подключатся по ходу.",
    color: "var(--accent-orange)",
  },
};

function calculateResult(answers: ("A" | "B" | "C")[]): QuizResult {
  const counts = { A: 0, B: 0, C: 0 };
  answers.forEach((a) => counts[a]++);

  const max = Math.max(counts.A, counts.B, counts.C);
  const winners = (Object.keys(counts) as ("A" | "B" | "C")[]).filter(
    (k) => counts[k] === max
  );

  if (winners.length === 1) return resultsMap[winners[0]];
  return resultsMap.mixed;
}

function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        left: `${5 + ((i * 41 + 17) % 90)}%`,
        delay: `${((i * 73) % 500) / 1000}s`,
        duration: `${0.8 + ((i * 37) % 600) / 1000}s`,
        color: [
          "var(--accent-blue)",
          "var(--accent-purple)",
          "var(--accent-green)",
          "var(--accent-orange)",
          "var(--accent-pink)",
          "var(--accent-cyan)",
        ][i % 6],
        size: 6 + ((i * 29) % 5),
        isCircle: i % 2 === 0,
      })),
    []
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      {pieces.map((p, i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            top: 0,
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: p.isCircle ? "50%" : "2px",
            background: p.color,
            animation: `confetti-fall ${p.duration} ${p.delay} var(--ease-out-expo) both`,
          }}
        />
      ))}
    </div>
  );
}

export function DirectionQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<("A" | "B" | "C")[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const isResult = step >= questions.length;
  const result = isResult ? calculateResult(answers) : null;

  const handleNext = () => {
    if (selectedOption === null) return;
    setIsAnimating(true);
    const newAnswers = [...answers, questions[step].options[selectedOption].value];

    setTimeout(() => {
      setAnswers(newAnswers);
      setSelectedOption(null);
      setStep(step + 1);
      setIsAnimating(false);

      if (step === questions.length - 1) {
        setTimeout(() => setShowConfetti(true), 300);
      }
    }, 250);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowConfetti(false);
  };

  return (
    <div
      style={{
        margin: "24px 0",
        borderRadius: 16,
        border: "1px solid var(--border)",
        background: "var(--bg-card)",
        padding: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Progress dots */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          marginBottom: 24,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                background:
                  i < step
                    ? "var(--accent-blue)"
                    : i === step && !isResult
                    ? "rgba(99, 102, 241, 0.15)"
                    : isResult
                    ? "var(--accent-blue)"
                    : "var(--bg-accent)",
                color:
                  i < step || isResult
                    ? "#fff"
                    : i === step
                    ? "var(--accent-blue)"
                    : "var(--text-muted)",
                border:
                  i === step && !isResult
                    ? "2px solid var(--accent-blue)"
                    : "2px solid transparent",
                transition: "all 0.3s var(--ease-out-expo)",
              }}
            >
              {i < step || isResult ? "✓" : i + 1}
            </div>
            {i < 2 && (
              <div
                style={{
                  width: 40,
                  height: 2,
                  borderRadius: 1,
                  background:
                    i < step || isResult
                      ? "var(--accent-blue)"
                      : "var(--bg-accent)",
                  transition: "background 0.3s var(--ease-out-expo)",
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Question area */}
      {!isResult && (
        <div
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? "translateX(20px)" : "translateX(0)",
            transition:
              "opacity 0.25s var(--ease-out-expo), transform 0.25s var(--ease-out-expo)",
          }}
        >
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              color: "var(--accent-blue)",
              marginBottom: 8,
            }}
          >
            Вопрос {step + 1} из {questions.length}
          </p>
          <h3
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "var(--text-primary)",
              marginBottom: 20,
              letterSpacing: -0.3,
            }}
          >
            {questions[step].text}
          </h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {questions[step].options.map((option, i) => (
              <button
                key={i}
                onClick={() => setSelectedOption(i)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  padding: "14px 16px",
                  borderRadius: 12,
                  border: `2px solid ${
                    selectedOption === i ? "var(--accent-blue)" : "var(--border)"
                  }`,
                  background:
                    selectedOption === i
                      ? "rgba(99, 102, 241, 0.08)"
                      : "var(--bg-secondary)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                  transition: "all 0.25s var(--ease-out-expo)",
                  transform:
                    selectedOption === i ? "translateX(4px)" : "translateX(0)",
                  fontFamily: "inherit",
                }}
              >
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border: `2px solid ${
                      selectedOption === i
                        ? "var(--accent-blue)"
                        : "var(--border)"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.2s var(--ease-out-expo)",
                  }}
                >
                  {selectedOption === i && (
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "var(--accent-blue)",
                        animation:
                          "stagger-in 0.2s var(--ease-spring) both",
                      }}
                    />
                  )}
                </div>
                <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>
                  <strong
                    style={{
                      color: "var(--text-muted)",
                      marginRight: 8,
                    }}
                  >
                    {String.fromCharCode(65 + i)})
                  </strong>
                  {option.label}
                </span>
              </button>
            ))}
          </div>

          {/* Next button */}
          <div
            style={{
              marginTop: 20,
              opacity: selectedOption !== null ? 1 : 0,
              transform:
                selectedOption !== null ? "translateY(0)" : "translateY(8px)",
              transition:
                "opacity 0.3s var(--ease-out-expo), transform 0.3s var(--ease-out-expo)",
              pointerEvents: selectedOption !== null ? "auto" : "none",
            }}
          >
            <button
              onClick={handleNext}
              className="cta-primary"
              style={{
                width: "100%",
                padding: "14px 24px",
                borderRadius: 12,
                background:
                  "linear-gradient(135deg, var(--accent-blue), var(--accent-purple))",
                border: "none",
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              {step < questions.length - 1 ? "Далее →" : "Узнать результат 🎯"}
            </button>
          </div>
        </div>
      )}

      {/* Result */}
      {isResult && result && (
        <div
          style={{
            textAlign: "center",
            animation: "quiz-result-in 0.5s var(--ease-out-back) both",
          }}
        >
          {showConfetti && <Confetti />}
          <div style={{ fontSize: 56, marginBottom: 12 }}>{result.emoji}</div>
          <p
            style={{
              fontSize: 12,
              color: "var(--text-muted)",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 8,
            }}
          >
            Ваше направление
          </p>
          <h3
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: result.color,
              marginBottom: 12,
              letterSpacing: -0.5,
            }}
          >
            {result.title}
          </h3>
          <p
            style={{
              fontSize: 15,
              color: "var(--text-secondary)",
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 auto 24px",
            }}
          >
            {result.description}
          </p>
          <button
            onClick={handleReset}
            style={{
              padding: "10px 20px",
              borderRadius: 10,
              background: "var(--bg-accent)",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s var(--ease-out-expo)",
              fontFamily: "inherit",
            }}
          >
            Пройти заново ↺
          </button>
        </div>
      )}
    </div>
  );
}
