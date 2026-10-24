import { lessons, getLesson } from '@/data/lessons';
import { stages } from '@/data/stages';
import { isCompleteKotlinFile, validateLessons } from '@/data/validateLessons';
import { activityFile, linesContaining } from '@/data/codeUtils';
import type { Lesson } from '@/types/lesson';

describe('lesson data', () => {
  it('passes validateLessons without errors', () => {
    expect(validateLessons(lessons, stages)).toEqual([]);
  });

  it('has 16 lessons in 4 stages, lessons 1–4 complete and 5–16 drafts', () => {
    expect(lessons).toHaveLength(16);
    expect(new Set(lessons.map((l) => l.stage))).toEqual(new Set([1, 2, 3, 4]));
    expect(lessons.filter((l) => !l.draft).map((l) => l.id)).toEqual([1, 2, 3, 4]);
    expect(getLesson(3)?.title).toBe('Kotlin cơ bản');
    expect(getLesson(99)).toBeUndefined();
  });

  it('lesson 1 follows the reference script', () => {
    const l1 = getLesson(1)!;
    expect(l1.steps).toHaveLength(8);
    expect(l1.quiz.map((q) => q.answer)).toEqual([1, 0, 1]);
    const code = l1.steps[4]!.code!;
    expect(code.fileName).toBe('MainActivity.kt');
    expect(code.code).toContain('Text(text = "Bạn đã bấm $count lần", fontSize = 24.sp)');
    const lines = code.code.split('\n');
    expect(code.highlightLines!.map((n) => lines[n - 1]!.trim())).toEqual([
      'var count by remember { mutableStateOf(0) }',
      'Button(onClick = { count++ }) {',
    ]);
  });

  it('keeps Kotlin string templates intact (no lost ${...})', () => {
    const l3 = getLesson(3)!;
    expect(l3.steps.find((s) => s.id === 'l3-s5')!.code!.code).toContain('${hp * 100 / maxHp}%');
  });
});

describe('validateLessons catches mistakes', () => {
  const broken = (): Lesson => structuredClone(getLesson(1)!);

  it('flags duplicate ids and out-of-range answers', () => {
    const a = broken();
    const b = broken();
    b.quiz[0]!.answer = 9;
    const errors = validateLessons([a, b]);
    expect(errors.some((e) => e.includes('id bài bị trùng'))).toBe(true);
    expect(errors.some((e) => e.includes('answer 9 nằm ngoài'))).toBe(true);
  });

  it('flags markdown and long sentences in narration', () => {
    const l = broken();
    l.steps[0]!.narration = 'Đây là **chữ đậm**.';
    l.steps[1]!.narration = Array.from({ length: 30 }, () => 'từ').join(' ') + '.';
    const errors = validateLessons([l]);
    expect(errors.some((e) => e.includes('ký tự markdown "*"'))).toBe(true);
    expect(errors.some((e) => e.includes('dài 30 từ'))).toBe(true);
  });

  it('flags a lesson without a complete Kotlin file', () => {
    const l = broken();
    l.steps.forEach((s) => delete s.code);
    l.exercise.solution = { fileName: 'Snippet.kt', language: 'kotlin', code: 'class A' };
    const errors = validateLessons([l]);
    expect(errors.some((e) => e.includes('thiếu package hoặc import'))).toBe(true);
    expect(errors.some((e) => e.includes('cần ít nhất một file Kotlin hoàn chỉnh'))).toBe(true);
  });
});

describe('code utils', () => {
  it('activityFile builds a complete, sorted file', () => {
    const code = activityFile({ imports: ['androidx.compose.material3.Text'], screen: 'Hello()', body: '@Composable\nfun Hello() { Text("Hi") }' });
    expect(isCompleteKotlinFile({ fileName: 'MainActivity.kt', language: 'kotlin', code })).toBe(true);
    const imports = code.split('\n').filter((l) => l.startsWith('import '));
    expect(imports).toEqual([...imports].sort());
    expect(code).toContain('                    Hello()');
  });

  it('linesContaining returns 1-based line numbers', () => {
    expect(linesContaining('a\nb\nab', ['b'])).toEqual([2, 3]);
  });
});
