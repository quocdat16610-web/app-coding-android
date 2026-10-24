import type { Lesson } from '@/types/lesson';
import { activityFile, linesContaining } from '../codeUtils';

const layoutCode = `@Composable
fun LayoutDemo() {
    Column {                       // top to bottom
        Text("Dòng 1")
        Row {                      // left to right
            Text("Trái")
            Text("Phải")
        }
        Box {                      // stacked on top of each other
            Text("Lớp dưới")
            Text("Lớp trên")
        }
    }
}
`;

const solutionCode = activityFile({
  imports: [
    'androidx.compose.foundation.background',
    'androidx.compose.foundation.layout.Arrangement',
    'androidx.compose.foundation.layout.Box',
    'androidx.compose.foundation.layout.Column',
    'androidx.compose.foundation.layout.Row',
    'androidx.compose.foundation.layout.padding',
    'androidx.compose.foundation.layout.size',
    'androidx.compose.foundation.shape.CircleShape',
    'androidx.compose.material3.Text',
    'androidx.compose.ui.Alignment',
    'androidx.compose.ui.draw.clip',
    'androidx.compose.ui.graphics.Color',
    'androidx.compose.ui.text.font.FontWeight',
    'androidx.compose.ui.unit.dp',
    'androidx.compose.ui.unit.sp',
  ],
  screen: 'ProfileRow(name = "Trần Thị Lan", job = "Game Developer")',
  body: `@Composable
fun ProfileRow(name: String, job: String) {
    Row(
        modifier = Modifier.padding(24.dp),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Box stacks the letter on top of the colored circle
        Box(
            modifier = Modifier
                .size(64.dp)
                .clip(CircleShape)
                .background(Color(0xFF7F52FF)),
            contentAlignment = Alignment.Center
        ) {
            Text(text = name.first().toString(), color = Color.White, fontSize = 28.sp)
        }
        Column {
            Text(text = name, fontSize = 20.sp, fontWeight = FontWeight.Bold)
            Text(text = job)
        }
    }
}`,
});

export const lesson05: Lesson = {
  id: 5,
  stage: 2,
  title: 'Bố cục với Column, Row, Box',
  concept: 'Xếp các thành phần theo hàng dọc, hàng ngang và chồng lớp',
  estimatedMinutes: 20,
  draft: true,
  objectives: [
    'Chọn đúng Column, Row hoặc Box cho từng bố cục',
    'Căn chỉnh và giãn cách phần tử bằng Arrangement và Alignment',
    'Lồng các bố cục để tạo một thẻ hồ sơ',
  ],
  steps: [
    {
      id: 'l5-s1',
      title: 'Ôn bài cũ và mục tiêu',
      narration:
        'Ở chặng trước, em đã viết Composable và xem trước bằng Preview. Chào mừng em đến chặng Giao diện! Hôm nay mình học cách xếp các phần tử trên màn hình.',
      content: `## Bài 5: Column, Row, Box

**Ôn lại:** Composable mô tả giao diện, **@Preview** để xem trước.

**Hôm nay em sẽ:**
- Dùng **Column**, **Row**, **Box**
- Căn chỉnh với **Arrangement** và **Alignment**
- Lồng bố cục để tạo thẻ hồ sơ`,
    },
    {
      id: 'l5-s2',
      title: 'Ba chiếc hộp xếp đồ',
      narration:
        'Column xếp các phần tử từ trên xuống dưới. Row xếp từ trái sang phải. Box thì chồng các phần tử lên nhau, cái sau nằm trên cái trước.',
      content: `### Ba bố cục cơ bản

| Bố cục | Hướng xếp |
| --- | --- |
| **Column** | ⬇️ Trên xuống dưới |
| **Row** | ➡️ Trái sang phải |
| **Box** | 🥞 Chồng lớp |`,
      teacherPose: 'pointing',
      code: {
        fileName: 'LayoutDemo.kt',
        language: 'kotlin',
        code: layoutCode,
        highlightLines: linesContaining(layoutCode, ['Column {', 'Row {', 'Box {']),
      },
      unityCompare:
        'Column giống Vertical Layout Group, Row giống Horizontal Layout Group. Box giống đặt nhiều Image chồng nhau trong cùng một Canvas.',
    },
  ],
  exercise: {
    description: 'Tạo thẻ hồ sơ: bên trái là **hình tròn** có chữ cái đầu của tên, bên phải là **tên** và **nghề nghiệp** xếp dọc.',
    hints: [
      'Bọc ngoài cùng bằng một Row.',
      'Hình tròn là một Box có Modifier size, clip CircleShape và background.',
      'Tên và nghề nghiệp đặt trong một Column.',
    ],
    solution: {
      fileName: 'MainActivity.kt',
      language: 'kotlin',
      code: solutionCode,
      highlightLines: linesContaining(solutionCode, ['Row(', 'Box(', 'Column {']),
    },
  },
  quiz: [
    {
      id: 'l5-q1',
      question: 'Muốn xếp ba nút nằm ngang cạnh nhau, em dùng gì?',
      options: ['Column', 'Row', 'Box', 'Spacer'],
      answer: 1,
      explain: 'Row xếp các phần tử từ trái sang phải trên cùng một hàng.',
    },
    {
      id: 'l5-q2',
      question: 'Muốn đặt chữ nằm đè lên một hình nền, em dùng gì?',
      options: ['Row', 'Column', 'Box', 'LazyColumn'],
      answer: 2,
      explain: 'Box chồng các phần tử lên nhau. Phần tử viết sau sẽ nằm trên.',
    },
    {
      id: 'l5-q3',
      question: 'Tham số nào giãn đều khoảng cách giữa các phần tử trong Column?',
      options: ['verticalArrangement', 'contentAlignment', 'fontSize', 'onClick'],
      answer: 0,
      explain: 'verticalArrangement quyết định cách phân bố khoảng trống theo chiều dọc trong Column.',
    },
  ],
};
