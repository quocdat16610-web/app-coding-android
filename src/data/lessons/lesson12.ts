import type { Lesson } from '@/types/lesson';
import { activityFile, linesContaining } from '../codeUtils';

const solutionCode = activityFile({
  imports: [
    'androidx.compose.foundation.layout.Arrangement',
    'androidx.compose.foundation.layout.Column',
    'androidx.compose.foundation.layout.padding',
    'androidx.compose.material3.Button',
    'androidx.compose.material3.Text',
    'androidx.compose.runtime.getValue',
    'androidx.compose.runtime.mutableIntStateOf',
    'androidx.compose.runtime.setValue',
    'androidx.compose.ui.Alignment',
    'androidx.compose.ui.unit.dp',
    'androidx.compose.ui.unit.sp',
    'androidx.lifecycle.ViewModel',
    'androidx.lifecycle.viewmodel.compose.viewModel',
  ],
  screen: 'ScoreScreen()',
  body: `class ScoreViewModel : ViewModel() {
    // Survives screen rotation because the ViewModel outlives the Activity recreation
    var score by mutableIntStateOf(0)
        private set

    fun addPoints(points: Int) {
        score += points
    }

    fun reset() {
        score = 0
    }
}

@Composable
fun ScoreScreen(viewModel: ScoreViewModel = viewModel()) {
    Column(
        modifier = Modifier.padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(text = "Điểm: \${viewModel.score}", fontSize = 32.sp)
        Button(onClick = { viewModel.addPoints(10) }) { Text("+10 điểm") }
        Button(onClick = { viewModel.reset() }) { Text("Chơi lại") }
        Text("Thử xoay màn hình: điểm vẫn còn nguyên!")
    }
}`,
});

export const lesson12: Lesson = {
  id: 12,
  stage: 3,
  title: 'ViewModel – giữ dữ liệu khi xoay màn hình',
  concept: 'ViewModel giữ state tách khỏi vòng đời Activity',
  estimatedMinutes: 25,
  draft: true,
  objectives: [
    'Hiểu vì sao xoay màn hình làm mất state trong remember',
    'Tạo ViewModel chứa state và các hàm xử lý',
    'Lấy ViewModel trong Composable bằng hàm viewModel()',
  ],
  steps: [
    {
      id: 'l12-s1',
      title: 'Ôn bài cũ và mục tiêu',
      narration:
        'Bài trước, em đã hiển thị danh sách dài bằng LazyColumn. Nhưng em có để ý không, xoay điện thoại là số đếm ở bài chín về không. Hôm nay mình sửa điều đó bằng ViewModel.',
      content: `## Bài 12: ViewModel

**Ôn lại:** **LazyColumn** hiển thị danh sách dài.

**Hôm nay em sẽ:**
- Hiểu vì sao **xoay màn hình** làm mất dữ liệu
- Tạo **ViewModel** giữ state
- Dùng **viewModel()** trong Composable`,
    },
    {
      id: 'l12-s2',
      title: 'Chuyện gì xảy ra khi xoay màn hình?',
      narration:
        'Khi xoay màn hình, Android phá huỷ Activity cũ và tạo Activity mới. Mọi thứ trong remember mất theo. ViewModel thì sống lâu hơn Activity, nên dữ liệu bên trong được giữ lại.',
      content: `### Vòng đời

1. Xoay màn hình → Activity bị **huỷ** và **tạo lại**
2. **remember** mất theo Activity cũ
3. **ViewModel** được giữ lại và trao cho Activity mới

Thêm thư viện **androidx.lifecycle:lifecycle-viewmodel-compose** để dùng hàm \`viewModel()\`.`,
      unityCompare:
        'ViewModel giống một GameManager dùng DontDestroyOnLoad. Scene bị dựng lại, nhưng GameManager vẫn giữ điểm số của người chơi.',
    },
  ],
  exercise: {
    description: 'Tạo **ScoreViewModel** chứa điểm số, hàm **addPoints** và **reset**. Màn hình có nút **+10 điểm** và **Chơi lại**. Xoay máy để kiểm tra điểm vẫn còn.',
    hints: [
      'Class kế thừa ViewModel(), state khai báo bằng mutableIntStateOf.',
      'Dùng private set để chỉ ViewModel được đổi điểm.',
      'Trong Composable, nhận tham số viewModel: ScoreViewModel = viewModel().',
    ],
    solution: {
      fileName: 'MainActivity.kt',
      language: 'kotlin',
      code: solutionCode,
      highlightLines: linesContaining(solutionCode, ['class ScoreViewModel', '= viewModel()']),
    },
  },
  quiz: [
    {
      id: 'l12-q1',
      question: 'Vì sao dữ liệu trong remember bị mất khi xoay màn hình?',
      options: ['Vì bộ nhớ đầy', 'Vì Activity bị huỷ và tạo lại', 'Vì Compose bị lỗi', 'Vì người dùng bấm Back'],
      answer: 1,
      explain: 'Xoay màn hình là một thay đổi cấu hình. Android tạo lại Activity nên state trong remember mất theo.',
    },
    {
      id: 'l12-q2',
      question: 'Trong Unity, ViewModel giống với gì nhất?',
      options: ['Một Prefab', 'Một GameManager giữ dữ liệu khi Scene dựng lại', 'Một Material', 'Một Collider'],
      answer: 1,
      explain: 'Cả hai đều sống lâu hơn màn hình hiện tại và giữ dữ liệu quan trọng.',
    },
    {
      id: 'l12-q3',
      question: 'private set trên biến score có tác dụng gì?',
      options: ['Ẩn biến khỏi giao diện', 'Chỉ code trong ViewModel được đổi giá trị', 'Lưu biến vào ổ cứng', 'Làm biến chạy nhanh hơn'],
      answer: 1,
      explain: 'Bên ngoài chỉ đọc được điểm. Muốn đổi phải gọi hàm của ViewModel, giúp logic tập trung một chỗ.',
    },
  ],
};
