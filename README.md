# Kotlin Academy

Website học lập trình Android bằng Kotlin cùng "Thầy Kotlin" – nhân vật hoạt hình SVG có giọng đọc tiếng Việt.

## Chạy thử

```bash
npm install
npm run dev      # http://localhost:5173
npm test         # Vitest
npm run build    # kiểm tra TypeScript + build production
```

## Tech stack

React 18 · Vite · TypeScript (strict) · React Router v6 · Tailwind CSS v3 · Framer Motion · Zustand (persist)

## Tiến độ xây dựng

- [x] GĐ 1 – Nền móng: Vite + Tailwind design tokens, font, routing, Header, đổi theme, store
- [x] GĐ 2 – Dữ liệu: types, nội dung đầy đủ bài 1–4, khung bài 5–16 (draft), stages, validateLessons
- [ ] GĐ 3 – Roadmap
- [ ] GĐ 4 – Speech engine
- [ ] GĐ 5 – Trang bài học
- [ ] GĐ 6 – Thầy Kotlin
- [ ] GĐ 7 – Bài tập & trắc nghiệm
- [ ] GĐ 8 – Hoàn thiện

## Viết thêm bài học

- Mỗi bài là một file `src/data/lessons/lessonNN.ts` theo kiểu `Lesson` (`src/types/lesson.ts`), đăng ký trong `src/data/lessons/index.ts`.
- `activityFile()` trong `src/data/codeUtils.ts` sinh `MainActivity.kt` hoàn chỉnh (package + import đã sắp xếp + class).
- `linesContaining(code, [...])` tính `highlightLines` theo nội dung, không cần đếm dòng bằng tay.
- Trong template literal, chuỗi template Kotlin dạng `${...}` phải viết là `\${...}`.
- `npm test` chạy `validateLessons()`: kiểm tra id trùng, đáp án hợp lệ, file Kotlin hoàn chỉnh, narration không có ký tự markdown và mỗi câu ≤ 25 từ.
