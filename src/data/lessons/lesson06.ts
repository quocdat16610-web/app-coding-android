import type { Lesson } from '@/types/lesson';
import { activityFile, linesContaining } from '../codeUtils';

const orderCode = `// Padding BEFORE background: the color fills a smaller area
Text(
    text = "A",
    modifier = Modifier
        .padding(16.dp)
        .background(Color.Yellow)
)

// Background BEFORE padding: the color fills the padded area too
Text(
    text = "B",
    modifier = Modifier
        .background(Color.Yellow)
        .padding(16.dp)
)
`;

const solutionCode = activityFile({
  imports: [
    'androidx.compose.foundation.background',
    'androidx.compose.foundation.border',
    'androidx.compose.foundation.layout.Box',
    'androidx.compose.foundation.layout.fillMaxWidth',
    'androidx.compose.foundation.layout.padding',
    'androidx.compose.foundation.shape.RoundedCornerShape',
    'androidx.compose.material3.Text',
    'androidx.compose.ui.Alignment',
    'androidx.compose.ui.draw.clip',
    'androidx.compose.ui.graphics.Color',
    'androidx.compose.ui.unit.dp',
    'androidx.compose.ui.unit.sp',
  ],
  screen: 'Badge(text = "Level 5 · Kotlin Hero")',
  body: `@Composable
fun Badge(text: String) {
    Box(
        modifier = Modifier
            .padding(24.dp)                         // space outside the badge
            .fillMaxWidth()
            .clip(RoundedCornerShape(16.dp))
            .background(Color(0xFFEDE5FF))
            .border(2.dp, Color(0xFF7F52FF), RoundedCornerShape(16.dp))
            .padding(20.dp),                        // space inside the badge
        contentAlignment = Alignment.Center
    ) {
        Text(text = text, fontSize = 20.sp, color = Color(0xFF7F52FF))
    }
}`,
});

export const lesson06: Lesson = {
  id: 6,
  stage: 2,
  title: 'Modifier: kích thước, padding, nền, bo góc',
  concept: 'Chuỗi Modifier quyết định kích thước và trang trí',
  estimatedMinutes: 20,
  draft: true,
  objectives: [
    'Dùng Modifier để chỉnh kích thước, khoảng cách và màu nền',
    'Hiểu vì sao thứ tự Modifier ảnh hưởng tới kết quả',
    'Tạo được một huy hiệu bo góc có viền',
  ],
  steps: [
    {
      id: 'l6-s1',
      title: 'Ôn bài cũ và mục tiêu',
      narration:
        'Bài trước, em đã xếp phần tử bằng Column, Row và Box. Hôm nay mình làm chúng đẹp hơn với Modifier. Modifier giúp chỉnh kích thước, khoảng cách, màu nền và bo góc.',
      content: `## Bài 6: Modifier

**Ôn lại:** **Column**, **Row**, **Box** xếp phần tử.

**Hôm nay em sẽ:**
- Dùng **size**, **padding**, **background**, **clip**
- Hiểu **thứ tự** Modifier
- Tạo huy hiệu bo góc có viền`,
    },
    {
      id: 'l6-s2',
      title: 'Thứ tự Modifier rất quan trọng',
      narration:
        'Modifier được áp dụng lần lượt từ trên xuống dưới, như xếp từng lớp áo. Nếu padding đứng trước background, màu nền sẽ nhỏ lại. Nếu background đứng trước, màu sẽ phủ cả phần padding.',
      content: `### Modifier là một chuỗi

Mỗi lệnh \`.xxx()\` bọc thêm một lớp **bên ngoài** kết quả trước đó. Đổi thứ tự là đổi kết quả!`,
      teacherPose: 'pointing',
      code: {
        fileName: 'ModifierOrder.kt',
        language: 'kotlin',
        code: orderCode,
        highlightLines: linesContaining(orderCode, ['.padding(16.dp)']),
      },
      unityCompare:
        'Modifier giống việc chỉnh RectTransform: kích thước, lề, vị trí. Điểm khác là em viết nó thành một chuỗi lệnh trong code.',
    },
  ],
  exercise: {
    description: 'Tạo Composable **Badge(text)**: chiều ngang đầy màn hình, bo góc 16dp, nền tím nhạt, viền tím 2dp, chữ căn giữa.',
    hints: [
      'Dùng Box với contentAlignment = Alignment.Center.',
      'clip và border dùng cùng một RoundedCornerShape(16.dp).',
      'padding đầu chuỗi là lề ngoài, padding cuối chuỗi là lề trong.',
    ],
    solution: {
      fileName: 'MainActivity.kt',
      language: 'kotlin',
      code: solutionCode,
      highlightLines: linesContaining(solutionCode, ['.clip(RoundedCornerShape', '.border(']),
    },
  },
  quiz: [
    {
      id: 'l6-q1',
      question: 'Modifier.padding(16.dp).background(Color.Red) cho kết quả gì?',
      options: ['Nền đỏ phủ cả phần padding', 'Nền đỏ chỉ phủ phần bên trong padding', 'Không có nền', 'Lỗi biên dịch'],
      answer: 1,
      explain: 'Padding được áp dụng trước, nên background chỉ tô phần còn lại bên trong.',
    },
    {
      id: 'l6-q2',
      question: 'Modifier nào làm bo tròn góc của nội dung?',
      options: ['padding', 'clip(RoundedCornerShape(...))', 'fillMaxWidth', 'size'],
      answer: 1,
      explain: 'clip cắt nội dung theo một hình dạng. RoundedCornerShape cho góc bo tròn.',
    },
    {
      id: 'l6-q3',
      question: 'Trong Unity, Modifier gần giống với thành phần nào nhất?',
      options: ['Rigidbody', 'RectTransform', 'AudioSource', 'Animator'],
      answer: 1,
      explain: 'Cả hai đều điều chỉnh kích thước, vị trí và khoảng cách của phần tử giao diện.',
    },
  ],
};
