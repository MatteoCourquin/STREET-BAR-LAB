export type Level = "beginner" | "intermediate" | "advanced";
export type Goal = "strength" | "muscle" | "skills";
export type SessionLength = 30 | 45 | 60;

type Pattern = "vpull" | "hpull" | "dip" | "hpush" | "vpush" | "legs" | "core";

type Exercise = {
  name: string;
  cue: string;
  hold?: boolean;
  /** Overrides the goal-based rep range (e.g. slow negatives). */
  fixed?: string;
};

export const levels: { id: Level; label: string; blurb: string }[] = [
  { id: "beginner", label: "Beginner", blurb: "0–4 pull-ups, building the base" },
  { id: "intermediate", label: "Intermediate", blurb: "5–12 pull-ups, solid dips" },
  { id: "advanced", label: "Advanced", blurb: "12+ pull-ups, chasing skills" },
];

export const goals: { id: Goal; label: string; blurb: string }[] = [
  { id: "strength", label: "Strength", blurb: "Low reps, harder variations" },
  { id: "muscle", label: "Muscle", blurb: "More volume, moderate reps" },
  { id: "skills", label: "Skills", blurb: "Daily skill block + support work" },
];

/** Two variations (A/B) per movement pattern and level, so sessions rotate. */
const library: Record<Pattern, Record<Level, [Exercise, Exercise]>> = {
  vpull: {
    beginner: [
      { name: "Negative pull-ups", fixed: "3–5 reps, 5 s down", cue: "Jump to the top, lower yourself as slowly as you can." },
      { name: "Scapular pull-ups", cue: "Arms straight, pull your shoulders down and away from your ears." },
    ],
    intermediate: [
      { name: "Pull-ups", cue: "Full dead hang at the bottom, chin clearly over the bar." },
      { name: "Chin-ups", cue: "Palms facing you, drive elbows to your ribs." },
    ],
    advanced: [
      { name: "Archer pull-ups", cue: "Pull toward one hand, the other arm stays almost straight." },
      { name: "Explosive chest-to-bar pull-ups", cue: "Pull as fast as you can, aim to touch the bar with your chest." },
    ],
  },
  hpull: {
    beginner: [
      { name: "Australian rows (high bar)", cue: "Body straight like a plank, pull your chest to the bar." },
      { name: "Chin-up top hold", hold: true, cue: "Chin over the bar, squeeze and hold without shaking." },
    ],
    intermediate: [
      { name: "Feet-elevated Australian rows", cue: "Feet on a bench, keep hips up the whole set." },
      { name: "Archer Australian rows", cue: "Shift your weight toward one arm on each rep." },
    ],
    advanced: [
      { name: "Tuck front lever rows", cue: "Hold a tuck front lever and row your hips toward the bar." },
      { name: "Front lever raises (tuck)", cue: "From hang, raise to tuck lever with straight arms, lower slowly." },
    ],
  },
  dip: {
    beginner: [
      { name: "Support hold on dip bars", hold: true, cue: "Arms locked, shoulders pushed down, body still." },
      { name: "Negative dips", fixed: "3–5 reps, 4 s down", cue: "Start at the top, lower until shoulders reach elbow height." },
    ],
    intermediate: [
      { name: "Parallel bar dips", cue: "Lean slightly forward, go down until elbows hit 90°." },
      { name: "Straight bar dips", cue: "Bar at your hips, elbows tucked, push back up to lockout." },
    ],
    advanced: [
      { name: "Explosive dips", cue: "Push hard enough for your hands to leave the bars." },
      { name: "Deep straight bar dips", cue: "Bar to the chest, full lockout at the top." },
    ],
  },
  hpush: {
    beginner: [
      { name: "Incline push-ups (hands on bar)", cue: "Body in one line, chest to the bar." },
      { name: "Push-ups", cue: "Elbows at ~45°, chest touches the floor." },
    ],
    intermediate: [
      { name: "Diamond push-ups", cue: "Hands together under the chest, elbows close." },
      { name: "Decline push-ups", cue: "Feet on a bench, keep your core tight." },
    ],
    advanced: [
      { name: "Archer push-ups", cue: "Lower toward one hand, other arm stays straight." },
      { name: "Pseudo planche push-ups", cue: "Hands by your hips, lean forward past your wrists." },
    ],
  },
  vpush: {
    beginner: [
      { name: "Pike push-ups", cue: "Hips high, lower the top of your head between your hands." },
      { name: "Wall plank hold", hold: true, cue: "Feet on the wall, hands ~50 cm away, arms locked." },
    ],
    intermediate: [
      { name: "Elevated pike push-ups", cue: "Feet on a bench, hips stacked over shoulders." },
      { name: "Chest-to-wall handstand", hold: true, cue: "Walk up the wall, squeeze glutes, push the floor away." },
    ],
    advanced: [
      { name: "Wall handstand push-ups", cue: "Head lightly touches the floor, press back to lockout." },
      { name: "Negative wall HSPU", fixed: "3–5 reps, 5 s down", cue: "Lower with control, kick down and reset if needed." },
    ],
  },
  legs: {
    beginner: [
      { name: "Bodyweight squats", cue: "Hips below knees, heels down." },
      { name: "Reverse lunges", cue: "Long step back, front knee stays over the foot." },
    ],
    intermediate: [
      { name: "Bulgarian split squats", cue: "Rear foot on a bench, drop the back knee straight down." },
      { name: "Jump squats", cue: "Land softly and go straight into the next rep." },
    ],
    advanced: [
      { name: "Pistol squats", cue: "One leg, arms forward, heel stays on the ground." },
      { name: "Shrimp squats", cue: "Hold the back foot, touch the knee to the ground." },
    ],
  },
  core: {
    beginner: [
      { name: "Hanging knee raises", cue: "No swinging, curl your pelvis up." },
      { name: "Hollow body hold", hold: true, cue: "Lower back glued to the ground, arms by your ears." },
    ],
    intermediate: [
      { name: "Hanging leg raises", cue: "Legs straight, bring feet to bar height." },
      { name: "Tuck L-sit", hold: true, cue: "Knees to chest, shoulders pushed down." },
    ],
    advanced: [
      { name: "Toes-to-bar", cue: "Touch the bar with your toes, control the way down." },
      { name: "L-sit", hold: true, cue: "Legs straight and level, push the bars/floor away." },
    ],
  },
};

const skillBlocks: Record<Level, [Exercise, Exercise]> = {
  beginner: [
    { name: "Skill: Tuck L-sit on parallettes or bars", hold: true, cue: "Short quality holds, stop before form breaks." },
    { name: "Skill: Wall plank to handstand prep", hold: true, cue: "Walk feet up the wall a little higher each week." },
  ],
  intermediate: [
    { name: "Skill: Tuck front lever", hold: true, cue: "Arms straight, back flat, hips at bar height." },
    { name: "Skill: Handstand kick-ups", fixed: "10 min practice", cue: "Kick up against a wall, try to find balance off it." },
  ],
  advanced: [
    { name: "Skill: Advanced tuck / straddle front lever", hold: true, cue: "Open the hips progressively, never lose the flat back." },
    { name: "Skill: Planche leans → tuck planche", hold: true, cue: "Protract the shoulders, lean until your wrists burn." },
  ],
};

const prescriptions: Record<Goal, { sets: number; reps: string; hold: string; rest: string }> = {
  strength: { sets: 4, reps: "4–6", hold: "10–15 s", rest: "2–3 min" },
  muscle: { sets: 3, reps: "8–12", hold: "20–30 s", rest: "60–90 s" },
  skills: { sets: 3, reps: "5–8", hold: "15–20 s", rest: "2 min" },
};

type Template = { title: string; focus: string; slots: [Pattern, 0 | 1][] };

const fb = (title: string, v: 0 | 1, w: 0 | 1): Template => ({
  title,
  focus: "Full body",
  slots: [
    ["vpull", v],
    ["dip", v],
    ["hpull", w],
    ["hpush", w],
    ["legs", v],
    ["core", w],
    ["vpush", v],
  ],
});

const splits: Record<number, Template[]> = {
  2: [fb("Full body A", 0, 0), fb("Full body B", 1, 1)],
  3: [fb("Full body A", 0, 0), fb("Full body B", 1, 1), fb("Full body C", 0, 1)],
  4: [
    { title: "Pull + Core A", focus: "Back, biceps, core", slots: [["vpull", 0], ["hpull", 0], ["vpull", 1], ["core", 0], ["hpull", 1], ["core", 1]] },
    { title: "Push + Legs A", focus: "Chest, shoulders, legs", slots: [["dip", 0], ["hpush", 0], ["legs", 0], ["vpush", 0], ["legs", 1], ["hpush", 1]] },
    { title: "Pull + Core B", focus: "Back, biceps, core", slots: [["vpull", 1], ["hpull", 1], ["vpull", 0], ["core", 1], ["hpull", 0], ["core", 0]] },
    { title: "Push + Legs B", focus: "Chest, shoulders, legs", slots: [["dip", 1], ["vpush", 1], ["legs", 1], ["hpush", 1], ["legs", 0], ["dip", 0]] },
  ],
  5: [
    { title: "Pull A", focus: "Back & biceps", slots: [["vpull", 0], ["hpull", 0], ["vpull", 1], ["hpull", 1], ["core", 0], ["core", 1]] },
    { title: "Push A", focus: "Chest & shoulders", slots: [["dip", 0], ["hpush", 0], ["vpush", 0], ["dip", 1], ["hpush", 1], ["vpush", 1]] },
    { title: "Legs + Core", focus: "Legs & midline", slots: [["legs", 0], ["legs", 1], ["core", 0], ["legs", 0], ["core", 1], ["hpull", 0]] },
    { title: "Pull B", focus: "Back & biceps", slots: [["vpull", 1], ["hpull", 1], ["vpull", 0], ["core", 1], ["hpull", 0], ["core", 0]] },
    { title: "Push B", focus: "Chest & shoulders", slots: [["dip", 1], ["vpush", 1], ["hpush", 0], ["vpush", 0], ["dip", 0], ["legs", 1]] },
  ],
};

const weekdays: Record<number, string[]> = {
  2: ["Mon", "Thu"],
  3: ["Mon", "Wed", "Fri"],
  4: ["Mon", "Tue", "Thu", "Fri"],
  5: ["Mon", "Tue", "Wed", "Fri", "Sat"],
};

const exercisesPerSession: Record<SessionLength, number> = { 30: 4, 45: 5, 60: 6 };

export type ProgramItem = { name: string; sets: number; reps: string; rest: string; cue: string; skill?: boolean };
export type ProgramSession = { day: string; title: string; focus: string; items: ProgramItem[] };
export type Program = {
  level: Level;
  goal: Goal;
  days: number;
  minutes: SessionLength;
  sessions: ProgramSession[];
  progression: string[];
};

export type ProgramInput = {
  level: Level;
  goal: Goal;
  days: 2 | 3 | 4 | 5;
  minutes: SessionLength;
  hasDipBars: boolean;
};

function prescribe(ex: Exercise, goal: Goal, skill = false): ProgramItem {
  const p = prescriptions[goal];
  if (skill) {
    return { name: ex.name, sets: 5, reps: ex.fixed ?? "8–15 s", rest: "2 min", cue: ex.cue, skill: true };
  }
  return {
    name: ex.name,
    sets: p.sets,
    reps: ex.fixed ?? (ex.hold ? p.hold : p.reps),
    rest: p.rest,
    cue: ex.cue,
  };
}

export function generateProgram(input: ProgramInput): Program {
  const { level, goal, days, minutes, hasDipBars } = input;
  const max = exercisesPerSession[minutes];
  const withSkill = goal === "skills" || level === "advanced";

  const sessions = splits[days].map((tpl, i): ProgramSession => {
    const seen = new Set<string>();
    const items: ProgramItem[] = [];

    if (withSkill) {
      items.push(prescribe(skillBlocks[level][i % 2], goal, true));
    }

    for (const [pattern, variant] of tpl.slots) {
      if (items.filter((it) => !it.skill).length >= max) break;
      // Without dip bars, dips become a harder push-up variation.
      const p: Pattern = pattern === "dip" && !hasDipBars ? "hpush" : pattern;
      let ex = library[p][level][variant];
      if (seen.has(ex.name)) ex = library[p][level][variant === 0 ? 1 : 0];
      if (seen.has(ex.name)) continue;
      seen.add(ex.name);
      items.push(prescribe(ex, goal));
    }

    return { day: weekdays[days][i], title: tpl.title, focus: tpl.focus, items };
  });

  return { level, goal, days, minutes, sessions, progression: progressionRules(level, goal) };
}

function progressionRules(level: Level, goal: Goal): string[] {
  const rules = [
    "Warm up 5–8 minutes before every session: wrist circles, scapular pulls, arm swings, 10 squats, a light set of your first exercise.",
    `When you hit the top of the range (${goal === "strength" ? "6 reps" : goal === "muscle" ? "12 reps" : "8 reps"}) on every set with clean form, move to the next variation.`,
    "Leave 1–2 reps in the tank on most sets. Grinding to failure every session slows progress on bodyweight work.",
  ];
  if (level === "beginner") {
    rules.push("For negatives, aim for 5 seconds of lowering. Once you can do 5 slow negatives, try your first full rep.");
  } else {
    rules.push("Every 5th week, cut the number of sets in half to recover (deload), then restart a little harder.");
  }
  if (goal === "skills" || level === "advanced") {
    rules.push("Do skill work first while you're fresh. Stop each hold as soon as your form breaks.");
  }
  return rules;
}
