import type { Lesson } from '@/types/lesson';
import { activityFile, linesContaining } from '../codeUtils';

const usageCode = `Text(
    text = "Dùng màu và font từ theme",
    color = MaterialTheme.colorScheme.primary,
    style = MaterialTheme.typography.headlineSmall
)
`;

const solutionCode = activityFile({
  imports: [
    'androidx.compose.foundation.isSystemInDarkTheme',
    'androidx.compose.foundation.layout.Arrangement',
    'androidx.compose.foundation.layout.Column',
    'androidx.compose.foundation.layout.padding',
    'androidx.compose.material3.Button',
    'androidx.compose.material3.Text',
    'androidx.compose.material3.darkColorScheme',
    'androidx.compose.material3.lightColorScheme',
    'androidx.compose.ui.graphics.Color',
    'androidx.compose.ui.unit.dp',
  ],
  theme: 'AcademyTheme',
  screen: 'ThemedScreen()',
  body: `private val LightColors = lightColorScheme(
    primary = Color(0xFF7F52FF),
    secondary = Color(0xFF3DDC84),
    background = Color(0xFFF7F8FC)
)

private val DarkColors = darkColorScheme(
    primary = Color(0xFF9B7BFF),
    secondary = Color(0xFF4BE596),
    background = Color(0xFF0F111A)
)

@Composable
fun AcademyTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = if (darkTheme) DarkColors else LightColors,
        content = content
    )
}

@Composable
fun ThemedScreen() {
    Column(
        modifier = Modifier.padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(
            text = "Kotlin Academy",
            style = MaterialTheme.typography.headlineMedium,
            color = MaterialTheme.colorScheme.primary
        )
        Text(text = "Đổi dark mode trong cài đặt máy để xem màu thay đổi.")
        Button(onClick = { }) { Text("Nút theo màu theme") }
    }
}`,
});

export const lesson08: Lesson = {
  id: 8,
  stage: 2,
  title: 'Theme: màu sắc, font, dark mode',
  concept: 'MaterialTheme quản lý giao diện chung của cả app',
  estimatedMinutes: 20,
  draft: true,
  objectives: [
    'Lấy màu và kiểu chữ từ MaterialTheme thay vì viết cứng',
    'Tạo bảng màu riêng cho chế độ sáng và tối',
    'Tự động đổi theme theo cài đặt của máy',
  ],
  steps: [
    {
      id: 'l8-s1',
      title: 'Ôn bài cũ và mục tiêu',
      narration:
        'Bài trước, em đã dùng Text, Image, Button và Icon. Nhưng nếu mỗi nút tự chọn màu, app sẽ rất lộn xộn. Hôm nay mình học Theme, nơi quản lý màu và font cho cả app.',
      content: `## Bài 8: Theme

**Ôn lại:** **Text**, **Image**, **Button**, **Icon**.

**Hôm nay em sẽ:**
- Dùng **MaterialTheme.colorScheme** và **typography**
- Tạo bảng màu **sáng** và **tối**
- Tự đổi theo **dark mode** của máy`,
    },
    {
      id: 'l8-s2',
      title: 'Lấy màu từ theme',
      narration:
        'Thay vì viết mã màu trực tiếp, em lấy màu từ MaterialTheme chấm colorScheme. Kiểu chữ thì lấy từ typography. Khi đổi theme, mọi chỗ dùng nó sẽ đổi theo.',
      content: `### Một nơi, áp dụng mọi nơi

- **MaterialTheme.colorScheme.primary**: màu chính
- **MaterialTheme.typography.headlineSmall**: kiểu chữ tiêu đề
- Đổi theme một lần → cả app đổi theo`,
      teacherPose: 'pointing',
      code: {
        fileName: 'ThemeUsage.kt',
        language: 'kotlin',
        code: usageCode,
        highlightLines: linesContaining(usageCode, ['MaterialTheme.']),
      },
      unityCompare:
        'Theme giống một ScriptableObject chứa cấu hình màu chung. Mọi UI đọc từ đó, nên sửa một chỗ là cả game đổi theo.',
    },
  ],
  exercise: {
    description: 'Tạo **AcademyTheme** với bảng màu sáng và tối riêng, tự chọn theo **isSystemInDarkTheme()**, rồi bọc màn hình bằng theme đó.',
    hints: [
      'Dùng lightColorScheme và darkColorScheme để tạo hai bảng màu.',
      'AcademyTheme nhận tham số content kiểu Composable và truyền vào MaterialTheme.',
      'Trong setContent, thay MaterialTheme bằng AcademyTheme.',
    ],
    solution: {
      fileName: 'MainActivity.kt',
      language: 'kotlin',
      code: solutionCode,
      highlightLines: linesContaining(solutionCode, ['fun AcademyTheme(', 'colorScheme = if (darkTheme)']),
    },
  },
  quiz: [
    {
      id: 'l8-q1',
      question: 'Vì sao nên dùng MaterialTheme.colorScheme.primary thay vì Color(0xFF7F52FF)?',
      options: ['Vì chạy nhanh hơn', 'Để màu tự đổi theo theme và dark mode', 'Vì Color bị cấm dùng', 'Để giảm dung lượng app'],
      answer: 1,
      explain: 'Lấy màu từ theme giúp cả app đồng bộ và tự đổi màu khi chuyển sang chế độ tối.',
    },
    {
      id: 'l8-q2',
      question: 'Hàm nào cho biết máy đang bật chế độ tối?',
      options: ['isDarkMode()', 'isSystemInDarkTheme()', 'darkColorScheme()', 'getTheme()'],
      answer: 1,
      explain: 'isSystemInDarkTheme trả về true khi người dùng bật dark mode trong cài đặt máy.',
    },
    {
      id: 'l8-q3',
      question: 'Kiểu chữ dùng chung của app lấy từ đâu?',
      options: ['MaterialTheme.typography', 'MaterialTheme.shapes', 'strings.xml', 'Modifier.font'],
      answer: 0,
      explain: 'typography chứa các kiểu chữ như tiêu đề, nội dung, nhãn, dùng thống nhất trong toàn app.',
    },
  ],
};
