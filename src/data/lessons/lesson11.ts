import type { Lesson } from '@/types/lesson';
import { activityFile, linesContaining } from '../codeUtils';

const lazyCode = `@Composable
fun FruitList() {
    val fruits = listOf("Táo", "Cam", "Xoài", "Dưa hấu", "Chuối")

    LazyColumn {
        items(fruits) { fruit ->
            Text(text = fruit, modifier = Modifier.padding(16.dp))
        }
    }
}
`;

const solutionCode = activityFile({
  imports: [
    'androidx.compose.foundation.layout.Arrangement',
    'androidx.compose.foundation.layout.PaddingValues',
    'androidx.compose.foundation.layout.fillMaxWidth',
    'androidx.compose.foundation.layout.padding',
    'androidx.compose.foundation.lazy.LazyColumn',
    'androidx.compose.foundation.lazy.items',
    'androidx.compose.material3.Card',
    'androidx.compose.material3.Text',
    'androidx.compose.ui.text.font.FontWeight',
    'androidx.compose.ui.unit.dp',
  ],
  screen: 'LevelList()',
  body: `data class Level(val number: Int, val stars: Int)

// 50 sample levels with 0–3 stars
val sampleLevels = List(50) { index -> Level(number = index + 1, stars = index % 4) }

@Composable
fun LevelList(levels: List<Level> = sampleLevels) {
    LazyColumn(
        contentPadding = PaddingValues(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(levels, key = { it.number }) { level ->
            Card(modifier = Modifier.fillMaxWidth()) {
                Text(
                    text = "Màn chơi \${level.number}",
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(start = 16.dp, top = 16.dp, end = 16.dp)
                )
                Text(
                    text = "⭐".repeat(level.stars).ifEmpty { "Chưa có sao" },
                    modifier = Modifier.padding(16.dp)
                )
            }
        }
    }
}`,
});

export const lesson11: Lesson = {
  id: 11,
  stage: 3,
  title: 'LazyColumn – danh sách cuộn',
  concept: 'LazyColumn chỉ vẽ những mục đang hiện trên màn hình',
  estimatedMinutes: 20,
  draft: true,
  objectives: [
    'Hiển thị danh sách dài bằng LazyColumn và items',
    'Hiểu vì sao Column không phù hợp với danh sách lớn',
    'Tạo danh sách thẻ từ một data class',
  ],
  steps: [
    {
      id: 'l11-s1',
      title: 'Ôn bài cũ và mục tiêu',
      narration:
        'Bài trước, em đã nhận dữ liệu bằng TextField. Hôm nay mình hiển thị thật nhiều dữ liệu cùng lúc. Danh bạ, tin nhắn hay cửa hàng đều là danh sách cuộn.',
      content: `## Bài 11: LazyColumn

**Ôn lại:** **TextField** + state để nhập liệu.

**Hôm nay em sẽ:**
- Dùng **LazyColumn** và **items**
- So sánh với **Column**
- Tạo danh sách thẻ từ **data class**`,
    },
    {
      id: 'l11-s2',
      title: 'Lười một cách thông minh',
      narration:
        'Column vẽ tất cả phần tử ngay một lúc, kể cả những cái nằm ngoài màn hình. LazyColumn thì lười một cách thông minh. Nó chỉ vẽ những mục đang hiện, nên danh sách nghìn mục vẫn mượt.',
      content: `### Column vs LazyColumn

| | Column | LazyColumn |
| --- | --- | --- |
| Vẽ | Tất cả cùng lúc | Chỉ mục đang hiện |
| Cuộn | Phải thêm verticalScroll | Có sẵn |
| Phù hợp | Vài phần tử | Danh sách dài |`,
      teacherPose: 'pointing',
      code: {
        fileName: 'FruitList.kt',
        language: 'kotlin',
        code: lazyCode,
        highlightLines: linesContaining(lazyCode, ['LazyColumn {', 'items(fruits)']),
      },
      unityCompare:
        'Giống kỹ thuật object pooling trong game: chỉ giữ số đối tượng vừa đủ thấy trên màn hình, rồi tái sử dụng khi cuộn.',
    },
  ],
  exercise: {
    description: 'Tạo **data class Level(number, stars)** và hiển thị **50 màn chơi** trong LazyColumn. Mỗi màn là một Card có số màn và số sao.',
    hints: [
      'List(50) { index -> ... } tạo nhanh 50 phần tử.',
      'Dùng items(levels, key = { it.number }) để mỗi mục có khoá riêng.',
      'Hàm repeat của String giúp in nhiều ngôi sao.',
    ],
    solution: {
      fileName: 'MainActivity.kt',
      language: 'kotlin',
      code: solutionCode,
      highlightLines: linesContaining(solutionCode, ['data class Level', 'items(levels']),
    },
  },
  quiz: [
    {
      id: 'l11-q1',
      question: 'Vì sao nên dùng LazyColumn cho danh sách 1000 mục?',
      options: ['Vì nó có nhiều màu hơn', 'Vì nó chỉ vẽ các mục đang hiện', 'Vì Column bị cấm', 'Vì nó tự lưu dữ liệu'],
      answer: 1,
      explain: 'LazyColumn chỉ vẽ mục trong vùng nhìn thấy, giúp tiết kiệm bộ nhớ và cuộn mượt.',
    },
    {
      id: 'l11-q2',
      question: 'Hàm nào thêm nhiều phần tử từ một danh sách vào LazyColumn?',
      options: ['forEach', 'items', 'map', 'repeat'],
      answer: 1,
      explain: 'Items nhận một danh sách và một hàm mô tả cách vẽ từng phần tử.',
    },
    {
      id: 'l11-q3',
      question: 'Tham số key trong items giúp gì?',
      options: ['Sắp xếp danh sách', 'Giúp Compose nhận ra từng mục khi danh sách thay đổi', 'Mã hoá dữ liệu', 'Đổi màu mục'],
      answer: 1,
      explain: 'Key giúp Compose biết mục nào là mục nào khi thêm, xoá hay đổi chỗ, nên hiệu ứng và state không bị lẫn.',
    },
  ],
};
