import type { Lesson } from '@/types/lesson';
import { activityFile, linesContaining } from '../codeUtils';

const apiCode = `package com.example.myfirstapp

import retrofit2.http.GET
import retrofit2.http.Path

data class Post(val id: Int, val title: String, val body: String)

interface PostApi {
    @GET("posts/{id}")
    suspend fun getPost(@Path("id") id: Int): Post
}
`;

const solutionCode = activityFile({
  imports: [
    'androidx.compose.foundation.layout.Arrangement',
    'androidx.compose.foundation.layout.Column',
    'androidx.compose.foundation.layout.padding',
    'androidx.compose.material3.Button',
    'androidx.compose.material3.CircularProgressIndicator',
    'androidx.compose.material3.Text',
    'androidx.compose.runtime.LaunchedEffect',
    'androidx.compose.runtime.getValue',
    'androidx.compose.runtime.mutableIntStateOf',
    'androidx.compose.runtime.mutableStateOf',
    'androidx.compose.runtime.remember',
    'androidx.compose.runtime.setValue',
    'androidx.compose.ui.unit.dp',
    'androidx.compose.ui.unit.sp',
    'retrofit2.Retrofit',
    'retrofit2.converter.gson.GsonConverterFactory',
    'retrofit2.http.GET',
    'retrofit2.http.Path',
  ],
  screen: 'PostScreen()',
  body: `data class Post(val id: Int, val title: String, val body: String)

interface PostApi {
    @GET("posts/{id}")
    suspend fun getPost(@Path("id") id: Int): Post
}

object ApiClient {
    val api: PostApi = Retrofit.Builder()
        .baseUrl("https://jsonplaceholder.typicode.com/")
        .addConverterFactory(GsonConverterFactory.create())
        .build()
        .create(PostApi::class.java)
}

@Composable
fun PostScreen() {
    var postId by remember { mutableIntStateOf(1) }
    var isLoading by remember { mutableStateOf(true) }
    var result by remember { mutableStateOf("") }

    // Re-runs every time postId changes, on a coroutine tied to this screen
    LaunchedEffect(postId) {
        isLoading = true
        result = try {
            ApiClient.api.getPost(postId).title
        } catch (e: Exception) {
            "Lỗi mạng: \${e.message}"
        }
        isLoading = false
    }

    Column(
        modifier = Modifier.padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Text(text = "Bài viết #$postId", fontSize = 24.sp)
        if (isLoading) CircularProgressIndicator() else Text(result)
        Button(onClick = { postId = postId % 100 + 1 }, enabled = !isLoading) {
            Text("Bài tiếp theo")
        }
    }
}`,
});

export const lesson15: Lesson = {
  id: 15,
  stage: 4,
  title: 'Gọi API mạng với Retrofit và coroutines',
  concept: 'Lấy dữ liệu từ Internet mà không làm đứng giao diện',
  estimatedMinutes: 30,
  draft: true,
  objectives: [
    'Khai báo API bằng interface Retrofit với hàm suspend',
    'Gọi mạng trong coroutine bằng LaunchedEffect',
    'Hiển thị trạng thái đang tải và xử lý lỗi',
  ],
  steps: [
    {
      id: 'l15-s1',
      title: 'Ôn bài cũ và mục tiêu',
      narration:
        'Bài trước, em đã lưu dữ liệu xuống máy. Hôm nay mình lấy dữ liệu từ Internet. Thời tiết, tin tức hay bảng xếp hạng game đều đến từ API.',
      content: `## Bài 15: Retrofit + coroutines

**Ôn lại:** **DataStore** và **Room** lưu dữ liệu bền vững.

**Hôm nay em sẽ:**
- Khai báo API với **Retrofit**
- Gọi mạng bằng **coroutine**
- Hiển thị **đang tải** và **lỗi**`,
    },
    {
      id: 'l15-s2',
      title: 'Khai báo API',
      narration:
        'Với Retrofit, em chỉ cần viết một interface mô tả địa chỉ API. Chữ suspend nghĩa là hàm này có thể chờ mà không chặn giao diện. Retrofit sẽ tự viết phần còn lại.',
      content: `### Interface Retrofit

- **@GET("posts/{id}")**: đường dẫn API
- **@Path("id")**: thay \`{id}\` bằng giá trị thật
- **suspend**: hàm chạy trong coroutine, không làm đứng app
- Nhớ thêm quyền **INTERNET** vào AndroidManifest.xml`,
      teacherPose: 'pointing',
      code: {
        fileName: 'PostApi.kt',
        language: 'kotlin',
        code: apiCode,
        highlightLines: linesContaining(apiCode, ['@GET', 'suspend fun']),
      },
      unityCompare:
        'Giống UnityWebRequest chạy trong một Coroutine với yield return. Game vẫn chạy mượt trong lúc chờ server trả lời.',
    },
  ],
  exercise: {
    description: 'Gọi API **jsonplaceholder.typicode.com/posts/{id}**, hiển thị tiêu đề bài viết, vòng tròn **đang tải**, thông báo **lỗi**, và nút **Bài tiếp theo**.',
    hints: [
      'Thêm thư viện retrofit và converter-gson vào Gradle.',
      'LaunchedEffect(postId) tự chạy lại mỗi khi postId đổi.',
      'Bọc lời gọi mạng trong try catch để bắt lỗi mất mạng.',
    ],
    solution: {
      fileName: 'MainActivity.kt',
      language: 'kotlin',
      code: solutionCode,
      highlightLines: linesContaining(solutionCode, ['LaunchedEffect(postId)', 'ApiClient.api.getPost']),
    },
  },
  quiz: [
    {
      id: 'l15-q1',
      question: 'Từ khoá suspend có ý nghĩa gì?',
      options: ['Hàm bị tạm khoá', 'Hàm có thể chờ mà không chặn luồng giao diện', 'Hàm chạy hai lần', 'Hàm chỉ chạy khi có mạng'],
      answer: 1,
      explain: 'Hàm suspend có thể tạm dừng để chờ kết quả, trong lúc đó giao diện vẫn mượt.',
    },
    {
      id: 'l15-q2',
      question: 'Quên quyền INTERNET trong manifest thì sao?',
      options: ['App chạy bình thường', 'Lời gọi mạng thất bại với lỗi bảo mật', 'App tự xin quyền', 'Retrofit tự thêm quyền'],
      answer: 1,
      explain: 'Không khai báo quyền INTERNET thì Android chặn mọi kết nối mạng của app.',
    },
    {
      id: 'l15-q3',
      question: 'Trong Unity, gọi API bằng coroutine giống cách nào?',
      options: ['Gọi trong Update mỗi frame', 'UnityWebRequest trong một Coroutine', 'Dùng PlayerPrefs', 'Dùng Instantiate'],
      answer: 1,
      explain: 'Cả hai đều chờ kết quả mạng mà không làm đứng game hay app.',
    },
  ],
};
