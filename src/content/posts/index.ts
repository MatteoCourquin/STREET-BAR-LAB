import type { Post } from "@/lib/posts";
import { firstPullUp } from "./first-pull-up";
import { trainingFrequency } from "./training-frequency";
import { streetWorkoutVsGym } from "./street-workout-vs-gym";

// Local demo content. Replaced by Sanity once the CMS is plugged in.
export const posts: Post[] = [firstPullUp, trainingFrequency, streetWorkoutVsGym];
