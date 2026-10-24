import type { Lesson } from '@/types/lesson';
import { activityFile, linesContaining } from '../codeUtils';

const solutionCode = activityFile({
  imports: [
    'android.content.Context',
    'androidx.compose.foundation.layout.Arrangement',
    'androidx.compose.foundation.layout.Column',
    'androidx.compose.foundation.layout.padding',
    'androidx.compose.material3.Button',
    'androidx.compose.material3.Text',
    'androidx.compose.runtime.collectAsState',
    'androidx.compose.runtime.getValue',
    'androidx.compose.runtime.remember',
    'androidx.compose.runtime.rememberCoroutineScope',
    'androidx.compose.ui.platform.LocalContext',
    'androidx.compose.ui.unit.dp',
    'androidx.compose.ui.unit.sp',
    'androidx.datastore.core.DataStore',
    'androidx.datastore.preferences.core.Preferences',
    'androidx.datastore.preferences.core.edit',
    'androidx.datastore.preferences.core.intPreferencesKey',
    'androidx.datastore.preferences.preferencesDataStore',
    'kotlinx.coroutines.flow.map',
    'kotlinx.coroutines.launch',
  ],
  screen: 'HighScoreScreen()',
  body: `// One DataStore file per app, created lazily
val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "game_save")

private val HIGH_SCORE = intPreferencesKey("high_score")

@Composable
fun HighScoreScreen() {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    val highScoreFlow = remember { context.dataStore.data.map { prefs -> prefs[HIGH_SCORE] ?: 0 } }
    val highScore by highScoreFlow.collectAsState(initial = 0)

    Column(
        modifier = Modifier.padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(text = "Kỷ lục: $highScore", fontSize = 32.sp)
        Button(onClick = {
            scope.launch {
                context.dataStore.edit { prefs -> prefs[HIGH_SCORE] = highScore + 100 }
            }
        }) {
            Text("+100 và lưu")
        }
        Text("Tắt hẳn app rồi mở lại: kỷ lục vẫn còn!")
    }
}`,
});

export const lesson14: Lesson = {
  id: 14,
  stage: 4,
  title: 'Lưu dữ liệu với DataStore và Room',
  concept: 'Lưu dữ liệu bền vững sau khi tắt app',
  estimatedMinutes: 30,
  draft: true,
  objectives: [
    'Chọn đúng DataStore cho cài đặt nhỏ và Room cho dữ liệu dạng bảng',
    'Đọc và ghi một giá trị với Preferences DataStore',
    'Hiểu ba thành phần của Room: Entity, Dao và Database',
  ],
  steps: [
    {
      id: 'l14-s1',
      title: 'Ôn bài cũ và mục tiêu',
      narration:
        'Bài trước, em đã chuyển giữa nhiều màn hình. Nhưng tắt app là mọi dữ liệu biến mất. Hôm nay mình học cách lưu dữ liệu xuống máy, để mở lại vẫn còn.',
      content: `## Bài 14: Lưu dữ liệu

**Ôn lại:** **NavHost** và **NavController**.

**Hôm nay em sẽ:**
- Phân biệt **DataStore** và **Room**
- Lưu một con số bằng **DataStore**
- Làm quen với **Entity**, **Dao**, **Database**`,
    },
    {
      id: 'l14-s2',
      title: 'DataStore hay Room?',
      narration:
        'Nếu chỉ cần lưu vài giá trị nhỏ như cài đặt hay điểm cao, em dùng DataStore. Nếu có nhiều bản ghi giống nhau như danh sách ghi chú, em dùng Room, một cơ sở dữ liệu thu nhỏ.',
      content: `### Chọn công cụ

| | DataStore | Room |
| --- | --- | --- |
| Lưu gì | Cặp khoá – giá trị | Bảng nhiều dòng |
| Ví dụ | Theme, điểm cao | Ghi chú, tin nhắn |
| Truy vấn | Không | SQL, tìm kiếm, sắp xếp |`,
      unityCompare:
        'DataStore giống PlayerPrefs để lưu vài con số. Room giống một file save game lớn có cấu trúc, chứa cả danh sách vật phẩm.',
      tip: 'Đọc ghi ổ cứng tốn thời gian nên phải chạy trong coroutine. Bài sau thầy sẽ giải thích coroutine kỹ hơn.',
    },
  ],
  exercise: {
    description: 'Dùng **Preferences DataStore** lưu **kỷ lục** của người chơi. Có nút **"+100 và lưu"**; tắt hẳn app rồi mở lại, kỷ lục vẫn còn.',
    hints: [
      'Thêm thư viện androidx.datastore:datastore-preferences vào Gradle.',
      'Tạo khoá bằng intPreferencesKey("high_score").',
      'Ghi bằng dataStore.edit bên trong scope.launch.',
    ],
    solution: {
      fileName: 'MainActivity.kt',
      language: 'kotlin',
      code: solutionCode,
      highlightLines: linesContaining(solutionCode, ['by preferencesDataStore', 'context.dataStore.edit']),
    },
  },
  quiz: [
    {
      id: 'l14-q1',
      question: 'Muốn lưu lựa chọn dark mode của người dùng, em dùng gì?',
      options: ['Room', 'DataStore', 'remember', 'ViewModel'],
      answer: 1,
      explain: 'Đây là một giá trị nhỏ dạng khoá và giá trị, nên DataStore là lựa chọn gọn nhẹ nhất.',
    },
    {
      id: 'l14-q2',
      question: 'Trong Unity, DataStore gần giống với gì?',
      options: ['PlayerPrefs', 'Rigidbody', 'Animator', 'Canvas'],
      answer: 0,
      explain: 'Cả hai đều lưu các giá trị nhỏ theo khoá, vẫn còn sau khi tắt ứng dụng.',
    },
    {
      id: 'l14-q3',
      question: 'Trong Room, thành phần nào định nghĩa một bảng dữ liệu?',
      options: ['Dao', 'Entity', 'Database', 'Repository'],
      answer: 1,
      explain: 'Entity là một data class mô tả một bảng. Dao chứa các câu truy vấn, Database gom tất cả lại.',
    },
  ],
};
