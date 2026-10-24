import type { Lesson } from '@/types/lesson';
import { activityFile, linesContaining } from '../codeUtils';

const textCode = `Text(
    text = "Kotlin Academy",
    fontSize = 28.sp,
    fontWeight = FontWeight.Bold,
    color = MaterialTheme.colorScheme.primary,
    maxLines = 1,
    overflow = TextOverflow.Ellipsis
)
`;

const solutionCode = activityFile({
  imports: [
    'androidx.compose.foundation.layout.Arrangement',
    'androidx.compose.foundation.layout.Column',
    'androidx.compose.foundation.layout.Spacer',
    'androidx.compose.foundation.layout.padding',
    'androidx.compose.foundation.layout.size',
    'androidx.compose.foundation.layout.width',
    'androidx.compose.material.icons.Icons',
    'androidx.compose.material.icons.filled.Favorite',
    'androidx.compose.material3.Button',
    'androidx.compose.material3.Icon',
    'androidx.compose.material3.Text',
    'androidx.compose.ui.Alignment',
    'androidx.compose.ui.text.font.FontWeight',
    'androidx.compose.ui.unit.dp',
    'androidx.compose.ui.unit.sp',
  ],
  screen: 'LikeCard()',
  body: `@Composable
fun LikeCard() {
    Column(
        modifier = Modifier.padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Icon(
            imageVector = Icons.Filled.Favorite,
            contentDescription = null,
            tint = MaterialTheme.colorScheme.primary,
            modifier = Modifier.size(64.dp)
        )
        Text(text = "Bài học hay quá!", fontSize = 22.sp, fontWeight = FontWeight.Bold)
        Button(onClick = { /* handled in lesson 9 with state */ }) {
            Icon(imageVector = Icons.Filled.Favorite, contentDescription = null)
            Spacer(modifier = Modifier.width(8.dp))
            Text("Thích")
        }
    }
}`,
});

export const lesson07: Lesson = {
  id: 7,
  stage: 2,
  title: 'Text, Image, Button và Icon',
  concept: 'Các thành phần giao diện cơ bản của Material 3',
  estimatedMinutes: 20,
  draft: true,
  objectives: [
    'Định dạng chữ với Text: cỡ, độ đậm, màu, số dòng',
    'Hiển thị Image từ drawable và Icon từ bộ Material Icons',
    'Tạo Button có cả biểu tượng lẫn chữ',
  ],
  steps: [
    {
      id: 'l7-s1',
      title: 'Ôn bài cũ và mục tiêu',
      narration:
        'Bài trước, em đã dùng Modifier để chỉnh kích thước và trang trí. Hôm nay mình làm quen với những viên gạch giao diện hay dùng nhất. Đó là Text, Image, Button và Icon.',
      content: `## Bài 7: Thành phần cơ bản

**Ôn lại:** **Modifier** – thứ tự quan trọng.

**Hôm nay em sẽ:**
- Định dạng **Text**
- Hiển thị **Image** và **Icon**
- Tạo **Button** có biểu tượng`,
    },
    {
      id: 'l7-s2',
      title: 'Text và cách định dạng',
      narration:
        'Text hiển thị chữ lên màn hình. Em chỉnh cỡ chữ bằng fontSize, độ đậm bằng fontWeight và màu bằng color. Nếu chữ quá dài, em giới hạn số dòng và cho hiện dấu ba chấm.',
      content: `### Các tham số hay dùng của Text

- **fontSize**: cỡ chữ, đơn vị **sp**
- **fontWeight**: độ đậm, ví dụ \`FontWeight.Bold\`
- **color**: màu chữ, nên lấy từ \`MaterialTheme.colorScheme\`
- **maxLines** + **overflow**: cắt chữ dài bằng dấu …`,
      teacherPose: 'pointing',
      code: {
        fileName: 'TextDemo.kt',
        language: 'kotlin',
        code: textCode,
        highlightLines: linesContaining(textCode, ['fontSize', 'overflow']),
      },
      tip: 'Cỡ chữ dùng sp, còn kích thước khác dùng dp. Sp tự phóng to theo cài đặt cỡ chữ của người dùng.',
    },
  ],
  exercise: {
    description: 'Tạo thẻ **LikeCard**: một Icon trái tim lớn, dòng chữ đậm bên dưới, và một Button có icon trái tim kèm chữ **"Thích"**.',
    hints: [
      'Icon dùng imageVector = Icons.Filled.Favorite.',
      'Trong Button, đặt Icon, Spacer và Text cạnh nhau.',
      'Nếu không tìm thấy Icons, thêm thư viện androidx.compose.material:material-icons-core vào Gradle.',
    ],
    solution: {
      fileName: 'MainActivity.kt',
      language: 'kotlin',
      code: solutionCode,
      highlightLines: linesContaining(solutionCode, ['imageVector = Icons.Filled.Favorite', 'Button(onClick']),
    },
  },
  quiz: [
    {
      id: 'l7-q1',
      question: 'Đơn vị nào nên dùng cho cỡ chữ?',
      options: ['px', 'dp', 'sp', 'pt'],
      answer: 2,
      explain: 'Sp tự co giãn theo cài đặt cỡ chữ của người dùng, giúp app dễ đọc hơn.',
    },
    {
      id: 'l7-q2',
      question: 'Vì sao Icon và Image cần contentDescription?',
      options: ['Để app chạy nhanh hơn', 'Để trình đọc màn hình mô tả cho người khiếm thị', 'Để đổi màu icon', 'Không cần thiết'],
      answer: 1,
      explain: 'contentDescription giúp trình đọc màn hình đọc nội dung hình ảnh. Nếu chỉ để trang trí, em đặt là null.',
    },
    {
      id: 'l7-q3',
      question: 'Hình ảnh trong res/drawable được tải bằng hàm nào?',
      options: ['painterResource(R.drawable.ten_anh)', 'stringResource(R.drawable.ten_anh)', 'Image("ten_anh.png")', 'loadImage()'],
      answer: 0,
      explain: 'painterResource đọc ảnh từ drawable để truyền vào tham số painter của Image.',
    },
  ],
};
