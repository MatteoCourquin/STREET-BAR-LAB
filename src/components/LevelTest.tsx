"use client";

import Link from "next/link";
import { useState } from "react";
import { questions, scoreTest, weakPointAdvice, type Result } from "@/lib/levelTest";
import { LEVEL_KEY, writeJSON } from "@/lib/storage";

const areaLabels = { pull: "Pull", push: "Push", core: "Core", legs: "Legs" } as const;

export function LevelTest() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<Result | null>(null);

  const q = questions[step];
  const progress = Math.round((step / questions.length) * 100);

  function answer(score: number) {
    const next = { ...answers, [q.id]: score };
    setAnswers(next);
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const r = scoreTest(next);
      writeJSON(LEVEL_KEY, { level: r.level });
      setResult(r);
    }
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setResult(null);
  }

  if (result) {
    const advice = weakPointAdvice[result.weakest];
    return (
      <div className="card overflow-hidden" aria-live="polite">
        <div className="border-b border-line bg-accent px-6 py-8 text-ink sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em]">Your level</p>
          <p className="h-display mt-2 text-6xl capitalize sm:text-7xl">{result.level}</p>
          <p className="mt-2 text-sm font-medium">Overall score: {result.score}/100</p>
        </div>
        <div className="grid gap-8 p-6 sm:p-10 md:grid-cols-2">
          <div>
            <h2 className="text-lg font-bold">Strength profile</h2>
            <ul className="mt-4 grid gap-3">
              {(Object.keys(areaLabels) as (keyof typeof areaLabels)[]).map((k) => (
                <li key={k}>
                  <div className="flex justify-between text-sm">
                    <span>{areaLabels[k]}</span>
                    <span className="font-mono text-muted">{Math.round((result.areas[k] / 4) * 100)}%</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-2">
                    <div
                      className={`h-full rounded-full ${k === result.weakest ? "bg-rust" : "bg-accent"}`}
                      style={{ width: `${Math.max(6, (result.areas[k] / 4) * 100)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid content-start gap-5">
            <div>
              <h2 className="text-lg font-bold">{advice.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{advice.text}</p>
            </div>
            <div>
              <h2 className="text-lg font-bold">Your next skill: {result.nextSkill.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Based on your answers, this is the most realistic skill to unlock next.
              </p>
              <Link href={`/skills/${result.nextSkill.slug}`} className="mt-2 inline-block text-sm font-semibold text-accent hover:underline">
                See the {result.nextSkill.name.toLowerCase()} progression →
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 border-t border-line p-6 sm:px-10">
          <Link href="/program-generator" className="btn-primary">
            Build my {result.level} program →
          </Link>
          <button type="button" onClick={restart} className="btn-ghost">
            Retake the test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="card p-6 sm:p-10">
      <div className="flex items-center justify-between text-xs text-muted">
        <span>
          Question {step + 1} / {questions.length}
        </span>
        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} className="hover:text-chalk">
            ← Back
          </button>
        )}
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
        <div className="h-full bg-accent transition-[width] duration-300" style={{ width: `${progress}%` }} />
      </div>
      <h2 className="mt-8 text-2xl font-bold sm:text-3xl">{q.question}</h2>
      {q.hint && <p className="mt-2 text-sm text-muted">{q.hint}</p>}
      <div className="mt-6 grid gap-2">
        {q.options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            onClick={() => answer(i)}
            className={`flex items-center justify-between rounded-lg border px-4 py-4 text-left text-sm font-medium transition-colors hover:border-accent hover:bg-accent/5 ${
              answers[q.id] === i ? "border-accent" : "border-line"
            }`}
          >
            {opt}
            <span aria-hidden="true" className="text-muted">
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
