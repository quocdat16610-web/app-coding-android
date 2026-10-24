import type { Lesson } from '@/types/lesson';
import { activityFile, linesContaining } from '../codeUtils';

const wrongCode = `@Composable
fun BrokenCounter() {
    var count = 0                     // plain variable: Compose does not watch it
    Button(onClick = { count++ }) {
        Text("Đã bấm $count lần")     // always shows 0
    }
}
`;

const solutionCode = activityFile({
  imports: [
    'androidx.compose.foundation.layout.Arrangement',
    'androidx.compose.foundation.layout.Column',
    'androidx.compose.foundation.layout.Row',
    'androidx.compose.foundation.layout.padding',
    'androidx.compose.material3.Button',
    'androidx.compose.material3.OutlinedButton',
    'androidx.compose.material3.Text',
    'androidx.compose.runtime.getValue',
    'androidx.compose.runtime.mutableIntStateOf',
    'androidx.compose.runtime.remember',
    'androidx.compose.runtime.setValue',
    'androidx.compose.ui.Alignment',
    'androidx.compose.ui.unit.dp',
    'androidx.compose.ui.unit.sp',
  ],
  screen: 'StepCounter()',
  body: `@Composable
fun StepCounter() {
    var count by remember { mutableIntStateOf(0) }

    Column(
        modifier = Modifier.padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text(text = "$count", fontSize = 48.sp)
        Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
            // Never go below zero
            OutlinedButton(onClick = { if (count > 0) count-- }, enabled = count > 0) {
                Text("−")
            }
            Button(onClick = { count++ }) {
                Text("+")
            }
        }
    }
}`,
});

export const lesson09: Lesson = {
  id: 9,
  stage: 3,
  title: 'State và remember – app đếm số',
  concept: 'State khiến giao diện tự cập nhật',
  estimatedMinutes: 20,
  draft: true,
  objectives: [
    'Giải thích vì sao biến thường không làm giao diện cập nhật',
    'Tạo state với mutableStateOf và giữ nó bằng remember',
    'Viết app đếm có nút tăng, giảm và giới hạn',
  ],
  steps: [
    {
      id: 'l9-s1',
      title: 'Ôn bài cũ và mục tiêu',
      narration:
        'Chúc mừng em đã qua chặng Giao diện! Bài trước, em đã tạo theme cho cả app. Giờ mình bước sang chặng Tương tác. Hôm nay mình hiểu thật kỹ state, thứ em đã gặp ở bài một.',
      content: `## Bài 9: State và remember

**Ôn lại:** **Theme** quản lý màu và font chung.

**Hôm nay em sẽ:**
- Hiểu vì sao **biến thường** không làm giao diện đổi
- Dùng **mutableStateOf** và **remember**
- Viết app đếm **+ / −**`,
    },
    {
      id: 'l9-s2',
      title: 'Vì sao biến thường không đủ?',
      narration:
        'Ở đoạn code này, count là biến thường. Bấm nút thì count có tăng, nhưng Compose không biết để vẽ lại. Hơn nữa, mỗi lần vẽ lại, count lại bị đặt về không.',
      content: `### Lỗi kinh điển

- Compose chỉ vẽ lại khi **state** thay đổi
- Biến thường **không phải state** → không ai báo cho Compose
- Mỗi lần hàm chạy lại, \`var count = 0\` lại về **0**`,
      teacherPose: 'pointing',
      code: {
        fileName: 'BrokenCounter.kt',
        language: 'kotlin',
        code: wrongCode,
        highlightLines: linesContaining(wrongCode, ['var count = 0']),
      },
      unityCompare:
        'Trong Unity, Update chạy mỗi frame nên em đổi biến là thấy ngay. Compose thì khác, nó chỉ vẽ lại khi có state thay đổi.',
    },
  ],
  exercise: {
    description: 'Viết app đếm có hai nút **+** và **−**. Số không được nhỏ hơn 0, và nút **−** bị mờ khi số đang là 0.',
    hints: [
      'Tạo state bằng var count by remember { mutableIntStateOf(0) }.',
      'Nút trừ chỉ giảm khi count lớn hơn 0.',
      'Tham số enabled của Button giúp làm mờ nút.',
    ],
    solution: {
      fileName: 'MainActivity.kt',
      language: 'kotlin',
      code: solutionCode,
      highlightLines: linesContaining(solutionCode, ['remember { mutableIntStateOf(0) }', 'enabled = count > 0']),
    },
  },
  quiz: [
    {
      id: 'l9-q1',
      question: 'Vai trò của remember là gì?',
      options: ['Lưu dữ liệu vào ổ cứng', 'Giữ giá trị qua các lần vẽ lại', 'Tăng tốc độ app', 'Gửi dữ liệu lên server'],
      answer: 1,
      explain: 'Remember giữ giá trị khi Composable chạy lại. Không có nó, state bị tạo mới mỗi lần vẽ.',
    },
    {
      id: 'l9-q2',
      question: 'Khi nào Compose vẽ lại một Composable?',
      options: ['Mỗi frame', 'Mỗi giây một lần', 'Khi state mà nó đọc thay đổi', 'Chỉ khi mở app'],
      answer: 2,
      explain: 'Compose theo dõi state. Khi state đổi, chỉ những Composable đọc state đó được vẽ lại.',
    },
    {
      id: 'l9-q3',
      question: 'Khi xoay màn hình, giá trị trong remember sẽ ra sao?',
      options: ['Được giữ nguyên', 'Bị mất và về giá trị ban đầu', 'Tự lưu lên cloud', 'App bị crash'],
      answer: 1,
      explain: 'Xoay màn hình làm Activity tạo lại nên remember bị mất. Em có thể dùng rememberSaveable, hoặc ViewModel ở bài mười hai.',
    },
  ],
};
