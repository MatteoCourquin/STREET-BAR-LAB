import type { Level } from "./program";

export type Area = "pull" | "push" | "core" | "legs" | "experience" | "skills";

export type Question = {
  id: string;
  area: Area;
  weight: number;
  question: string;
  hint?: string;
  options: string[]; // index = score 0..4
};

export const questions: Question[] = [
  {
    id: "pullups",
    area: "pull",
    weight: 2,
    question: "How many strict pull-ups can you do in one set?",
    hint: "Dead hang at the bottom, chin over the bar, no kipping.",
    options: ["0", "1–4", "5–9", "10–14", "15+"],
  },
  {
    id: "pushups",
    area: "push",
    weight: 1,
    question: "How many full push-ups in one set?",
    hint: "Chest to the floor, body straight.",
    options: ["0–9", "10–19", "20–34", "35–49", "50+"],
  },
  {
    id: "dips",
    area: "push",
    weight: 1.5,
    question: "How many dips on parallel bars?",
    hint: "Shoulders down to elbow height, full lockout at the top.",
    options: ["None yet", "1–4", "5–11", "12–19", "20+"],
  },
  {
    id: "core",
    area: "core",
    weight: 1,
    question: "What's the hardest core move you can do for 10 clean reps (or 15 s)?",
    options: [
      "Hanging for 20 s is already hard",
      "Hanging knee raises",
      "Straight-leg raises to 90°",
      "Toes-to-bar",
      "L-sit for 15 s+",
    ],
  },
  {
    id: "legs",
    area: "legs",
    weight: 0.5,
    question: "What's the hardest leg exercise you can do for 8+ reps?",
    options: [
      "Fewer than 20 bodyweight squats",
      "30+ bodyweight squats",
      "Bulgarian split squats",
      "Assisted pistol squats",
      "Full pistol squats",
    ],
  },
  {
    id: "experience",
    area: "experience",
    weight: 0.5,
    question: "How long have you been training consistently?",
    options: ["Just starting", "Less than 6 months", "6–18 months", "1.5–3 years", "3+ years"],
  },
  {
    id: "skills",
    area: "skills",
    weight: 1,
    question: "Which is the most advanced skill you already have?",
    options: [
      "None yet",
      "Wall handstand for 30 s",
      "Tuck front lever or tuck L-sit",
      "Strict muscle-up",
      "Freestanding handstand or advanced lever",
    ],
  },
];

export type Result = {
  level: Level;
  score: number; // 0..100
  areas: Record<"pull" | "push" | "core" | "legs", number>; // 0..4
  weakest: "pull" | "push" | "core" | "legs";
  nextSkill: { slug: string; name: string };
};

export function scoreTest(answers: Record<string, number>): Result {
  let total = 0;
  let weights = 0;
  const sums: Record<Area, number[]> = { pull: [], push: [], core: [], legs: [], experience: [], skills: [] };

  for (const q of questions) {
    const a = answers[q.id] ?? 0;
    total += a * q.weight;
    weights += q.weight;
    sums[q.area].push(a);
  }

  const avg = (xs: number[]) => xs.reduce((s, x) => s + x, 0) / xs.length;
  const areas = { pull: avg(sums.pull), push: avg(sums.push), core: avg(sums.core), legs: avg(sums.legs) };
  const raw = total / weights; // 0..4

  let level: Level = raw < 1.6 ? "beginner" : raw < 2.9 ? "intermediate" : "advanced";
  // Pulling strength gates the levels: no pull-up = beginner, under 5 = not advanced.
  const pullups = answers.pullups ?? 0;
  if (pullups === 0) level = "beginner";
  else if (pullups === 1 && level === "advanced") level = "intermediate";

  // Legs carry less weight in street workout, so they only count as the weak point when clearly behind.
  const weakest = (Object.keys(areas) as (keyof typeof areas)[]).reduce((w, k) => {
    const v = k === "legs" ? areas[k] + 0.5 : areas[k];
    const wv = w === "legs" ? areas[w] + 0.5 : areas[w];
    return v < wv ? k : w;
  }, "pull" as keyof typeof areas);

  let nextSkill = { slug: "l-sit", name: "L-sit" };
  if (level === "intermediate") {
    nextSkill =
      areas.pull >= 2 && areas.push >= 2
        ? { slug: "muscle-up", name: "Muscle-up" }
        : { slug: "handstand", name: "Handstand" };
  } else if (level === "advanced") {
    nextSkill = (answers.skills ?? 0) >= 3 ? { slug: "front-lever", name: "Front lever" } : { slug: "muscle-up", name: "Muscle-up" };
  }

  return { level, score: Math.round((raw / 4) * 100), areas, weakest, nextSkill };
}

export const weakPointAdvice: Record<Result["weakest"], { title: string; text: string }> = {
  pull: {
    title: "Pulling is your weak link",
    text: "Add 2 extra sets of rows or negative pull-ups at the start of each session. Pull-ups are the base of almost every street workout skill.",
  },
  push: {
    title: "Pushing is your weak link",
    text: "Prioritise dips and push-up variations early in your sessions and add one extra pushing exercise per week.",
  },
  core: {
    title: "Your core is holding you back",
    text: "Hollow holds and hanging leg raises at the end of every session. A strong midline is what makes levers and L-sits possible.",
  },
  legs: {
    title: "Don't skip legs",
    text: "Two leg exercises per week is enough to stay balanced: split squats and a pistol progression will do the job.",
  },
};
