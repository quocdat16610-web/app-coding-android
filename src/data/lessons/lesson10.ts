import type { Lesson } from '@/types/lesson';
import { activityFile, linesContaining } from '../codeUtils';

const basicCode = `@Composable
fun NameInput() {
    var name by remember { mutableStateOf("") }

    OutlinedTextField(
        value = name,                    // what to show
        onValueChange = { name = it },   // what to do when the user types
        label = { Text("Tên của em") }
    )
}
`;

const solutionCode = activityFile({
  imports: [
    'androidx.compose.foundation.layout.Arrangement',
    'androidx.compose.foundation.layout.Column',
    'androidx.compose.foundation.layout.fillMaxWidth',
    'androidx.compose.foundation.layout.padding',
    'androidx.compose.material3.OutlinedTextField',
    'androidx.compose.material3.Text',
    'androidx.compose.material3.TextButton',
    'androidx.compose.runtime.getValue',
    'androidx.compose.runtime.mutableStateOf',
    'androidx.compose.runtime.remember',
    'androidx.compose.runtime.setValue',
    'androidx.compose.ui.unit.dp',
    'androidx.compose.ui.unit.sp',
  ],
  screen: 'GreetingForm()',
  body: `@Composable
fun GreetingForm() {
    var name by remember { mutableStateOf("") }

    Column(
        modifier = Modifier.padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        OutlinedTextField(
            value = name,
            onValueChange = { name = it },
            label = { Text("Tên của em") },
            singleLine = true,
            modifier = Modifier.fillMaxWidth()
        )
        Text(
            text = if (name.isBlank()) "Hãy nhập tên nhé!" else "Xin chào $name 👋",
            fontSize = 22.sp
        )
        TextButton(onClick = { name = "" }, enabled = name.isNotEmpty()) {
            Text("Xoá")
        }
    }
}`,
});

export const lesson10: Lesson = {
  id: 10,
  stage: 3,
  title: 'TextField – nhập và hiển thị dữ liệu',
  concept: 'TextField nhận chữ người dùng nhập qua state',
  estimatedMinutes: 20,
  draft: true,
  objectives: [
    'Kết nối TextField với state qua value và onValueChange',
    'Hiển thị ngay nội dung người dùng vừa nhập',
    'Thêm nhãn, gợi ý và nút xoá cho ô nhập',
  ],
  steps: [
    {
      id: 'l10-s1',
      title: 'Ôn bài cũ và mục tiêu',
      narration:
        'Bài trước, em đã dùng state để giao diện tự cập nhật. Hôm nay mình dùng state để nhận chữ từ bàn phím. Công cụ là TextField, ô nhập liệu quen thuộc trong mọi app.',
      content: `## Bài 10: TextField

**Ôn lại:** **state** + **remember** → giao diện tự cập nhật.

**Hôm nay em sẽ:**
- Nối **TextField** với state
- Hiển thị chữ vừa nhập
- Thêm **nhãn** và nút **xoá**`,
    },
    {
      id: 'l10-s2',
      title: 'Hai tham số quan trọng',
      narration:
        'TextField cần hai thứ. Value là chữ đang hiển thị trong ô. OnValueChange là việc cần làm khi người dùng gõ phím. Mình cập nhật state, và Compose vẽ lại ô với chữ mới.',
      content: `### value + onValueChange

1. Người dùng gõ phím
2. **onValueChange** nhận chữ mới (\`it\`) → gán vào state
3. State đổi → Compose vẽ lại với **value** mới

Nếu quên cập nhật state, gõ phím sẽ **không thấy chữ hiện ra**!`,
      teacherPose: 'pointing',
      code: {
        fileName: 'NameInput.kt',
        language: 'kotlin',
        code: basicCode,
        highlightLines: linesContaining(basicCode, ['value = name', 'onValueChange']),
      },
      unityCompare:
        'Giống InputField trong Unity có sự kiện onValueChanged. Điểm khác là ở Compose, em phải tự lưu chữ vào state.',
    },
  ],
  exercise: {
    description: 'Tạo form có ô nhập tên. Bên dưới hiện **"Xin chào [tên] 👋"** ngay khi gõ, hoặc **"Hãy nhập tên nhé!"** khi ô trống. Thêm nút **Xoá**.',
    hints: [
      'Dùng name.isBlank() để kiểm tra ô trống.',
      'Biểu thức if trong Kotlin trả về giá trị, dùng thẳng trong tham số text.',
      'Nút Xoá chỉ cần gán name = "".',
    ],
    solution: {
      fileName: 'MainActivity.kt',
      language: 'kotlin',
      code: solutionCode,
      highlightLines: linesContaining(solutionCode, ['onValueChange = { name = it }', 'name.isBlank()']),
    },
  },
  quiz: [
    {
      id: 'l10-q1',
      question: 'Nếu onValueChange để trống { }, khi gõ phím chuyện gì xảy ra?',
      options: ['Chữ vẫn hiện bình thường', 'Ô nhập không hiện chữ mới', 'App crash', 'Bàn phím không mở'],
      answer: 1,
      explain: 'Value vẫn là giá trị cũ vì state không được cập nhật, nên ô nhập trông như không gõ được.',
    },
    {
      id: 'l10-q2',
      question: 'Trong onValueChange = { name = it }, it là gì?',
      options: ['Chữ cũ', 'Toàn bộ chữ mới sau khi gõ', 'Ký tự vừa gõ', 'Số ký tự'],
      answer: 1,
      explain: 'It là toàn bộ nội dung mới của ô nhập sau khi người dùng gõ.',
    },
    {
      id: 'l10-q3',
      question: 'Tham số nào giữ ô nhập chỉ trên một dòng?',
      options: ['maxLength = 1', 'singleLine = true', 'oneLine()', 'lines = false'],
      answer: 1,
      explain: 'SingleLine bằng true ngăn xuống dòng, phù hợp cho ô nhập tên hoặc email.',
    },
  ],
};
