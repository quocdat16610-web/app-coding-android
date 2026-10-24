export type Viseme = 'REST' | 'A' | 'E' | 'O' | 'U' | 'M';

export type StageId = 1 | 2 | 3 | 4;

export interface CodeBlock {
  fileName: string; // e.g. "MainActivity.kt"
  language: 'kotlin' | 'xml' | 'groovy' | 'toml' | 'text';
  code: string;
  highlightLines?: number[]; // 1-based
}

export interface Step {
  id: string; // "l1-s3"
  title: string;
  narration: string; // spoken by the teacher: short sentences, no markdown
  content: string; // markdown shown on screen
  code?: CodeBlock;
  unityCompare?: string;
  tip?: string;
  teacherPose?: 'talking' | 'pointing';
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[]; // 3–4 options
  answer: number; // index of the correct option
  explain: string; // read aloud by the teacher
}

export interface Exercise {
  description: string;
  hints: string[];
  solution: CodeBlock;
}

export interface Lesson {
  id: number;
  stage: StageId;
  title: string;
  concept: string; // the single concept this lesson teaches
  estimatedMinutes: number;
  objectives: string[]; // 2–3 "Sau bài này em sẽ..." goals
  steps: Step[]; // 4–8 steps (drafts: at least 2)
  exercise: Exercise;
  quiz: QuizQuestion[];
  /** Content not finished yet: shown with a "Sắp ra mắt" badge but still unlockable. */
  draft?: boolean;
}

export interface Stage {
  id: StageId;
  title: string;
  description: string;
  emoji: string;
}
