export type SkillStep = {
  id: string;
  name: string;
  target: string;
  how: string;
};

export type Skill = {
  slug: string;
  name: string;
  tier: 1 | 2 | 3 | 4;
  category: "Pull" | "Push" | "Core" | "Balance";
  timeline: string;
  summary: string;
  intro: string;
  prerequisites: string[];
  /** Other skills that should come first. */
  after: string[];
  steps: SkillStep[];
  mistakes: string[];
};

export const tiers = {
  1: { name: "Foundation", text: "Your first skills. Needs basic strength, not years of training." },
  2: { name: "Core street workout", text: "The moves that make you look like you know what you're doing." },
  3: { name: "Advanced statics", text: "Requires serious straight-arm strength and patience." },
  4: { name: "Elite", text: "Years of consistent work. Start the progressions early." },
} as const;

export const skills: Skill[] = [
  {
    slug: "l-sit",
    name: "L-sit",
    tier: 1,
    category: "Core",
    timeline: "1–3 months",
    summary: "Hold your body up on straight arms with your legs straight out in front.",
    intro:
      "The L-sit is the first static skill most street workout athletes learn. It builds compression strength, shoulder depression and a strong core — all of which carry over to levers, handstands and the muscle-up. You can train it on parallel bars, parallettes or even two chairs.",
    prerequisites: ["Hold a support position on dip bars for 30 s", "10 hanging knee raises"],
    after: [],
    steps: [
      { id: "support", name: "Support hold", target: "3 × 30 s", how: "Arms locked on dip bars, shoulders pushed down away from your ears." },
      { id: "tuck", name: "Tuck L-sit", target: "3 × 15 s", how: "Lift both knees to your chest while staying in the support position." },
      { id: "one-leg", name: "One-leg L-sit", target: "3 × 10 s / leg", how: "One leg tucked, the other extended. Alternate every set." },
      { id: "full", name: "Full L-sit", target: "3 × 10 s", how: "Both legs straight and level with your hips, toes pointed." },
      { id: "long", name: "L-sit 30 s", target: "1 × 30 s", how: "Build to a single clean 30-second hold. You've got it." },
    ],
    mistakes: ["Shrugging the shoulders up", "Bent knees in the 'full' version", "Leaning back to cheat the hold"],
  },
  {
    slug: "handstand",
    name: "Handstand",
    tier: 1,
    category: "Balance",
    timeline: "3–12 months",
    summary: "Balance upside down on your hands with a straight body line.",
    intro:
      "The handstand is a balance skill more than a strength skill: you need enough shoulder strength to hold it, then hundreds of short attempts to find the balance. Practise a little almost every day rather than one long session per week.",
    prerequisites: ["10 pike push-ups", "Wall plank hold 30 s"],
    after: [],
    steps: [
      { id: "wall-plank", name: "Wall plank", target: "3 × 30 s", how: "Feet on the wall, hands close to it, body in a straight line." },
      { id: "chest-wall", name: "Chest-to-wall handstand", target: "3 × 45 s", how: "Walk up facing the wall, squeeze glutes, push the floor away." },
      { id: "kick-up", name: "Back-to-wall kick-ups", target: "10 kicks, 5 s off the wall", how: "Kick up against the wall and gently pull your heels off it." },
      { id: "bailout", name: "Cartwheel bail-out", target: "Comfortable every time", how: "Learn to fall safely before you train freestanding." },
      { id: "free-10", name: "Freestanding 10 s", target: "3 × 10 s", how: "Kick up in open space, correct balance with your fingers." },
      { id: "free-30", name: "Freestanding 30 s", target: "1 × 30 s", how: "Straight line from wrists to toes. You own the handstand." },
    ],
    mistakes: ["Banana back (arched spine)", "Looking too far forward", "Training only once a week"],
  },
  {
    slug: "muscle-up",
    name: "Muscle-up",
    tier: 2,
    category: "Pull",
    timeline: "3–9 months",
    summary: "Pull yourself from a hang to above the bar in one explosive movement.",
    intro:
      "The muscle-up is the signature move of street workout: a pull-up that keeps going until you're on top of the bar, finished with a dip. It's mostly a question of explosive pulling power and technique — the transition over the bar.",
    prerequisites: ["10 strict pull-ups", "15 dips", "5 straight bar dips"],
    after: ["l-sit"],
    steps: [
      { id: "high-pull", name: "Chest-to-bar pull-ups", target: "3 × 5", how: "Pull explosively until your chest touches the bar." },
      { id: "sbd", name: "Straight bar dips", target: "3 × 10", how: "Dips on top of a single bar — the end of the muscle-up." },
      { id: "waist-pull", name: "Explosive pull to the waist", target: "3 × 3", how: "Pull so high the bar reaches your belly button. Use a slight swing." },
      { id: "negative", name: "Muscle-up negatives", target: "3 × 3", how: "Start above the bar, lower slowly through the transition." },
      { id: "kipping", name: "Kipping muscle-up", target: "3 × 1", how: "Use a controlled swing and pull the bar toward your hips." },
      { id: "strict", name: "Strict muscle-up", target: "3 × 1", how: "From a dead hang, no swing, one clean rep." },
    ],
    mistakes: ["Pulling straight up instead of up and back", "Chicken-winging one arm over", "Training it while already tired"],
  },
  {
    slug: "back-lever",
    name: "Back lever",
    tier: 2,
    category: "Pull",
    timeline: "3–6 months",
    summary: "Hold your body horizontal, face down, below the bar.",
    intro:
      "The back lever is usually the first lever you'll get. It's easier than the front lever but puts a lot of stress on the biceps and shoulders, so progress patiently and always warm up the shoulders with skin-the-cats.",
    prerequisites: ["8 pull-ups", "Skin-the-cat with control"],
    after: ["l-sit"],
    steps: [
      { id: "skin-cat", name: "Skin-the-cat", target: "3 × 5 slow", how: "From hang, rotate backward through your arms and back up." },
      { id: "german", name: "German hang", target: "3 × 20 s", how: "Hold the bottom of the skin-the-cat, chest open." },
      { id: "tuck", name: "Tuck back lever", target: "3 × 15 s", how: "Knees to chest, body horizontal, arms straight." },
      { id: "adv-tuck", name: "Advanced tuck", target: "3 × 12 s", how: "Open the hips so your back is flat." },
      { id: "straddle", name: "Straddle back lever", target: "3 × 8 s", how: "Legs wide and straight, body parallel to the ground." },
      { id: "full", name: "Full back lever", target: "3 × 5 s", how: "Legs together, straight line from shoulders to toes." },
    ],
    mistakes: ["Bent arms", "Piking at the hips", "Skipping the German hang — it protects your shoulders"],
  },
  {
    slug: "front-lever",
    name: "Front lever",
    tier: 3,
    category: "Pull",
    timeline: "6–24 months",
    summary: "Hold your body horizontal, face up, with straight arms under the bar.",
    intro:
      "The front lever is the benchmark of pulling strength. It requires strong lats, a solid core and straight-arm strength that takes time to build. Train it 2–3 times a week with short quality holds and front lever rows.",
    prerequisites: ["12 pull-ups", "10 hanging leg raises", "Tuck L-sit 15 s"],
    after: ["l-sit", "back-lever"],
    steps: [
      { id: "active-hang", name: "Active hang + scap pulls", target: "3 × 10", how: "Depress your shoulders without bending the arms." },
      { id: "tuck", name: "Tuck front lever", target: "3 × 15 s", how: "Knees to chest, hips at bar height, arms straight." },
      { id: "adv-tuck", name: "Advanced tuck", target: "3 × 12 s", how: "Push hips back until your back is flat." },
      { id: "one-leg", name: "One-leg front lever", target: "3 × 8 s", how: "One leg extended, the other tucked." },
      { id: "straddle", name: "Straddle front lever", target: "3 × 6 s", how: "Both legs straight and wide." },
      { id: "full", name: "Full front lever", target: "3 × 5 s", how: "Legs together, body perfectly horizontal." },
    ],
    mistakes: ["Rounded back in the tuck", "Hips dropping below the bar", "Holding to failure every set"],
  },
  {
    slug: "planche",
    name: "Planche",
    tier: 4,
    category: "Push",
    timeline: "2–5 years",
    summary: "Balance your whole body horizontally on your hands, feet off the ground.",
    intro:
      "The planche is one of the hardest bodyweight skills there is. Most people need years of straight-arm pushing strength. Start with planche leans and tuck planche early: your wrists, elbows and shoulders need time to adapt.",
    prerequisites: ["20 dips", "30 push-ups", "Freestanding handstand recommended"],
    after: ["handstand", "l-sit"],
    steps: [
      { id: "lean", name: "Planche leans", target: "3 × 20 s", how: "Push-up position, lean forward past your wrists, shoulders protracted." },
      { id: "frog", name: "Frog stand", target: "3 × 20 s", how: "Knees on your elbows, feet off the ground." },
      { id: "tuck", name: "Tuck planche", target: "3 × 10 s", how: "Knees to chest, arms straight, hips at shoulder height." },
      { id: "adv-tuck", name: "Advanced tuck planche", target: "3 × 8 s", how: "Flat back, knees away from the chest." },
      { id: "straddle", name: "Straddle planche", target: "3 × 5 s", how: "Legs wide and straight." },
      { id: "full", name: "Full planche", target: "1 × 3 s", how: "Legs together. Welcome to the elite." },
    ],
    mistakes: ["Bending the elbows", "Not protracting the shoulders", "Rushing progressions and hurting the wrists"],
  },
];

export function getSkill(slug: string) {
  return skills.find((s) => s.slug === slug);
}
