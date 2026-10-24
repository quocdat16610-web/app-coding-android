import type { CodeBlock, Lesson, Stage } from '@/types/lesson';

/** Characters that would be read aloud literally or signal leftover markdown. */
const NARRATION_FORBIDDEN = /[*#`_[\]<>{}|~]/;
const MAX_WORDS_PER_SENTENCE = 25;

const CLASS_DECLARATION = /^\s*(?:(?:data|abstract|open|sealed|enum)\s+)?(?:class|object|interface)\s+\w+/m;

function isKotlinFile(block: CodeBlock): boolean {
  return block.language === 'kotlin' && block.fileName.endsWith('.kt');
}

/** A copy-paste-ready Kotlin file: package, imports and at least one declaration. */
export function isCompleteKotlinFile(block: CodeBlock): boolean {
  return (
    isKotlinFile(block) &&
    /^package\s+[\w.]+/m.test(block.code) &&
    /^import\s+[\w.]+/m.test(block.code) &&
    (CLASS_DECLARATION.test(block.code) || /^fun\s+\w+/m.test(block.code))
  );
}

function sentences(text: string): string[] {
  return text
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function allCodeBlocks(lesson: Lesson): { where: string; block: CodeBlock }[] {
  const blocks = lesson.steps.flatMap((s) => (s.code ? [{ where: s.id, block: s.code }] : []));
  blocks.push({ where: `l${lesson.id}-exercise`, block: lesson.exercise.solution });
  return blocks;
}

/**
 * Checks lesson data for authoring mistakes. Returns a list of human-readable errors
 * (empty when everything is valid).
 */
export function validateLessons(lessons: Lesson[], stages: Stage[] = []): string[] {
  const errors: string[] = [];
  const lessonIds = new Set<number>();
  const stepIds = new Set<string>();
  const quizIds = new Set<string>();
  const stageIds = new Set(stages.map((s) => s.id));

  lessons.forEach((lesson, index) => {
    const tag = `Bài ${lesson.id}`;

    if (lessonIds.has(lesson.id)) errors.push(`${tag}: id bài bị trùng`);
    lessonIds.add(lesson.id);
    if (lesson.id !== index + 1) errors.push(`${tag}: id phải liên tiếp từ 1 (vị trí ${index + 1})`);
    if (stages.length > 0 && !stageIds.has(lesson.stage)) errors.push(`${tag}: chặng ${lesson.stage} không tồn tại`);

    if (!lesson.title.trim() || !lesson.concept.trim()) errors.push(`${tag}: thiếu title hoặc concept`);
    if (lesson.estimatedMinutes <= 0) errors.push(`${tag}: estimatedMinutes phải > 0`);
    if (lesson.objectives.length < 2 || lesson.objectives.length > 3) errors.push(`${tag}: cần 2–3 objectives`);

    const minSteps = lesson.draft ? 2 : 4;
    if (lesson.steps.length < minSteps || lesson.steps.length > 8) {
      errors.push(`${tag}: cần ${minSteps}–8 bước, đang có ${lesson.steps.length}`);
    }

    lesson.steps.forEach((step) => {
      if (stepIds.has(step.id)) errors.push(`${tag}: id bước "${step.id}" bị trùng`);
      stepIds.add(step.id);
      if (!step.id.startsWith(`l${lesson.id}-`)) errors.push(`${tag}: id bước "${step.id}" phải bắt đầu bằng l${lesson.id}-`);
      if (!step.title.trim() || !step.content.trim() || !step.narration.trim()) {
        errors.push(`${step.id}: thiếu title, content hoặc narration`);
      }
      const bad = step.narration.match(NARRATION_FORBIDDEN);
      if (bad) errors.push(`${step.id}: narration chứa ký tự markdown "${bad[0]}"`);
      sentences(step.narration).forEach((sentence) => {
        const words = sentence.split(/\s+/).length;
        if (words > MAX_WORDS_PER_SENTENCE) {
          errors.push(`${step.id}: câu narration dài ${words} từ (tối đa ${MAX_WORDS_PER_SENTENCE}): "${sentence}"`);
        }
      });
    });

    const blocks = allCodeBlocks(lesson);
    blocks.forEach(({ where, block }) => {
      const lineCount = block.code.split('\n').length;
      block.highlightLines?.forEach((line) => {
        if (!Number.isInteger(line) || line < 1 || line > lineCount) {
          errors.push(`${where}: highlightLines ${line} nằm ngoài 1–${lineCount}`);
        }
      });
      if (block.highlightLines && block.highlightLines.length === 0) {
        errors.push(`${where}: highlightLines rỗng (không tìm thấy dòng cần tô)`);
      }
      if (isKotlinFile(block) && CLASS_DECLARATION.test(block.code)) {
        if (!/^package\s/m.test(block.code) || !/^import\s/m.test(block.code)) {
          errors.push(`${where}: file ${block.fileName} có class nhưng thiếu package hoặc import`);
        }
      }
    });
    if (!blocks.some(({ block }) => isCompleteKotlinFile(block))) {
      errors.push(`${tag}: cần ít nhất một file Kotlin hoàn chỉnh (package, import, khai báo)`);
    }

    if (!lesson.exercise.description.trim()) errors.push(`${tag}: thiếu mô tả bài tập`);
    if (lesson.exercise.hints.length === 0) errors.push(`${tag}: bài tập cần ít nhất một gợi ý`);

    if (lesson.quiz.length < 3 || lesson.quiz.length > 5) errors.push(`${tag}: cần 3–5 câu trắc nghiệm`);
    lesson.quiz.forEach((q) => {
      if (quizIds.has(q.id)) errors.push(`${tag}: id câu hỏi "${q.id}" bị trùng`);
      quizIds.add(q.id);
      if (q.options.length < 3 || q.options.length > 4) errors.push(`${q.id}: cần 3–4 lựa chọn`);
      if (!Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) {
        errors.push(`${q.id}: answer ${q.answer} nằm ngoài phạm vi options`);
      }
      if (new Set(q.options).size !== q.options.length) errors.push(`${q.id}: có lựa chọn trùng nhau`);
      if (!q.explain.trim()) errors.push(`${q.id}: thiếu explain`);
    });
  });

  return errors;
}
