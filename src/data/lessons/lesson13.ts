import type { Lesson } from '@/types/lesson';
import { activityFile, linesContaining } from '../codeUtils';

const navHostCode = `val navController = rememberNavController()

NavHost(navController = navController, startDestination = "home") {
    composable("home") { HomeScreen(onOpenDetail = { navController.navigate("detail") }) }
    composable("detail") { DetailScreen(onBack = { navController.popBackStack() }) }
}
`;

const solutionCode = activityFile({
  imports: [
    'androidx.compose.foundation.layout.Arrangement',
    'androidx.compose.foundation.layout.Column',
    'androidx.compose.foundation.layout.padding',
    'androidx.compose.material3.Button',
    'androidx.compose.material3.Text',
    'androidx.compose.ui.unit.dp',
    'androidx.compose.ui.unit.sp',
    'androidx.navigation.compose.NavHost',
    'androidx.navigation.compose.composable',
    'androidx.navigation.compose.rememberNavController',
  ],
  screen: 'AppNavigation()',
  body: `@Composable
fun AppNavigation() {
    val navController = rememberNavController()

    NavHost(navController = navController, startDestination = "home") {
        composable("home") {
            HomeScreen(onOpenLevel = { level -> navController.navigate("level/$level") })
        }
        composable("level/{number}") { backStackEntry ->
            val number = backStackEntry.arguments?.getString("number")?.toIntOrNull() ?: 1
            LevelScreen(number = number, onBack = { navController.popBackStack() })
        }
    }
}

@Composable
fun HomeScreen(onOpenLevel: (Int) -> Unit) {
    Column(
        modifier = Modifier.padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(text = "Chọn màn chơi", fontSize = 28.sp)
        (1..3).forEach { level ->
            Button(onClick = { onOpenLevel(level) }) { Text("Màn $level") }
        }
    }
}

@Composable
fun LevelScreen(number: Int, onBack: () -> Unit) {
    Column(
        modifier = Modifier.padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(text = "Đang chơi màn $number", fontSize = 28.sp)
        Button(onClick = onBack) { Text("← Quay lại") }
    }
}`,
});

export const lesson13: Lesson = {
  id: 13,
  stage: 4,
  title: 'Điều hướng nhiều màn hình với Navigation Compose',
  concept: 'NavHost và NavController chuyển giữa các màn hình',
  estimatedMinutes: 25,
  draft: true,
  objectives: [
    'Khai báo các màn hình trong NavHost bằng route',
    'Chuyển màn hình và quay lại với NavController',
    'Truyền tham số giữa các màn hình qua route',
  ],
  steps: [
    {
      id: 'l13-s1',
      title: 'Ôn bài cũ và mục tiêu',
      narration:
        'Chào mừng em đến chặng cuối! Bài trước, em đã giữ dữ liệu bằng ViewModel. Một app thật thường có nhiều màn hình. Hôm nay mình học cách đi lại giữa chúng.',
      content: `## Bài 13: Navigation Compose

**Ôn lại:** **ViewModel** giữ dữ liệu khi xoay màn hình.

**Hôm nay em sẽ:**
- Khai báo màn hình trong **NavHost**
- Chuyển màn với **navigate** và quay lại với **popBackStack**
- Truyền **tham số** qua route`,
    },
    {
      id: 'l13-s2',
      title: 'Bản đồ các màn hình',
      narration:
        'NavHost giống một tấm bản đồ, mỗi màn hình có một địa chỉ gọi là route. NavController là người dẫn đường. Gọi navigate để đi tới, gọi popBackStack để quay lại.',
      content: `### NavHost + NavController

- **route**: địa chỉ của màn hình, ví dụ \`"home"\`
- **navigate("detail")**: đi tới màn hình mới
- **popBackStack()**: quay lại màn trước

Thêm thư viện **androidx.navigation:navigation-compose** vào Gradle.`,
      teacherPose: 'pointing',
      code: {
        fileName: 'Navigation.kt',
        language: 'kotlin',
        code: navHostCode,
        highlightLines: linesContaining(navHostCode, ['NavHost(', 'navigate("detail")']),
      },
      unityCompare:
        'navigate giống SceneManager.LoadScene. Khác ở chỗ Android nhớ lịch sử các màn, nên nút Back tự quay về màn trước.',
    },
  ],
  exercise: {
    description: 'Tạo app 2 màn: **Home** có 3 nút "Màn 1/2/3". Bấm nút sẽ mở **LevelScreen** hiển thị số màn tương ứng và có nút **Quay lại**.',
    hints: [
      'Route có tham số viết dạng "level/{number}".',
      'Đọc tham số bằng backStackEntry.arguments?.getString("number").',
      'Truyền hàm onOpenLevel vào HomeScreen thay vì truyền cả navController.',
    ],
    solution: {
      fileName: 'MainActivity.kt',
      language: 'kotlin',
      code: solutionCode,
      highlightLines: linesContaining(solutionCode, ['composable("level/{number}")', 'navController.navigate']),
    },
  },
  quiz: [
    {
      id: 'l13-q1',
      question: 'Hàm nào đưa người dùng quay lại màn hình trước?',
      options: ['navigate("back")', 'popBackStack()', 'finish()', 'goBack()'],
      answer: 1,
      explain: 'PopBackStack lấy màn hiện tại ra khỏi ngăn xếp, đưa người dùng về màn trước đó.',
    },
    {
      id: 'l13-q2',
      question: 'Trong Unity, navigate giống với lệnh nào?',
      options: ['Instantiate', 'SceneManager.LoadScene', 'Destroy', 'GetComponent'],
      answer: 1,
      explain: 'Cả hai đều chuyển người dùng sang một màn hình hoặc Scene khác.',
    },
    {
      id: 'l13-q3',
      question: 'Vì sao nên truyền hàm onOpenLevel thay vì truyền navController vào màn hình?',
      options: ['Vì navController quá nặng', 'Để màn hình dễ preview và dễ tái sử dụng', 'Vì Kotlin bắt buộc', 'Để app chạy nhanh hơn'],
      answer: 1,
      explain: 'Màn hình chỉ cần biết sự kiện xảy ra, không cần biết cách điều hướng. Nhờ vậy dễ preview và dễ test hơn.',
    },
  ],
};
