import type { Lesson } from '@/types/lesson';
import { linesContaining } from '../codeUtils';

const greetingCode = `@Composable
fun Greeting(name: String) {
    Text(text = "Xin chào $name!")
}
`;

const nestedCode = `@Composable
fun WelcomeScreen() {
    Column {
        Greeting(name = "Lan")
        Greeting(name = "Minh")
        Greeting(name = "Kotlin")
    }
}
`;

const previewCode = `@Preview(showBackground = true, name = "Lời chào")
@Composable
fun GreetingPreview() {
    MaterialTheme {
        Greeting(name = "Preview")
    }
}
`;

const fullCode = `package com.example.myfirstapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    WelcomeScreen()
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String) {
    Text(text = "Xin chào $name!", fontSize = 22.sp)
}

@Composable
fun WelcomeScreen() {
    Column(
        modifier = Modifier.padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(12.dp)
    ) {
        Greeting(name = "Lan")
        Greeting(name = "Minh")
        Greeting(name = "Kotlin")
    }
}

@Preview(showBackground = true, name = "Một lời chào")
@Composable
fun GreetingPreview() {
    MaterialTheme {
        Greeting(name = "Preview")
    }
}

@Preview(showBackground = true, name = "Màn hình chào")
@Composable
fun WelcomeScreenPreview() {
    MaterialTheme {
        WelcomeScreen()
    }
}
`;

const solutionCode = `package com.example.myfirstapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    BusinessCard(name = "Nguyễn Văn Minh", role = "Android Developer")
                }
            }
        }
    }
}

@Composable
fun BusinessCard(name: String, role: String) {
    Column(modifier = Modifier.padding(24.dp)) {
        Text(text = name, fontSize = 26.sp, fontWeight = FontWeight.Bold)
        Text(text = role, fontSize = 18.sp)
    }
}

@Preview(showBackground = true)
@Composable
fun BusinessCardPreview() {
    MaterialTheme {
        BusinessCard(name = "Trần Thị Lan", role = "Game Developer")
    }
}
`;

export const lesson04: Lesson = {
  id: 4,
  stage: 1,
  title: 'Composable đầu tiên và @Preview',
  concept: 'Hàm Composable mô tả giao diện',
  estimatedMinutes: 15,
  objectives: [
    'Viết được hàm Composable có tham số',
    'Ghép nhiều Composable nhỏ thành một màn hình',
    'Xem trước giao diện bằng @Preview mà không cần chạy app',
  ],
  steps: [
    {
      id: 'l4-s1',
      title: 'Ôn bài cũ và mục tiêu',
      narration:
        'Bài trước, em đã nắm val, var, hàm và chuỗi template. Hôm nay mình dùng chính những hàm đó để vẽ giao diện. Đó là hàm Composable, trái tim của Jetpack Compose.',
      content: `## Bài 4: Composable đầu tiên

**Ôn lại:** **val/var**, **hàm fun** và **string template**.

**Hôm nay em sẽ:**
- Viết hàm **Composable** có tham số
- Ghép Composable nhỏ thành màn hình
- Xem trước giao diện với **@Preview**`,
    },
    {
      id: 'l4-s2',
      title: 'Composable là gì?',
      narration:
        'Composable là một hàm bình thường, nhưng có chú thích a còng Composable ở trên. Hàm này không trả về gì cả. Nó chỉ mô tả giao diện trông như thế nào. Theo quy ước, tên Composable viết hoa chữ cái đầu.',
      content: `### Hàm Composable

- Có chú thích **@Composable** phía trên
- **Không trả về** giá trị, chỉ **mô tả** giao diện
- Tên viết **HoaChữĐầu** như một danh từ: \`Greeting\`, \`ProfileCard\`
- Chỉ gọi được từ **Composable khác** hoặc trong **setContent**`,
      teacherPose: 'pointing',
      code: {
        fileName: 'Greeting.kt',
        language: 'kotlin',
        code: greetingCode,
        highlightLines: linesContaining(greetingCode, ['@Composable']),
      },
      unityCompare:
        'Composable giống một script chỉ lo việc vẽ giao diện. Nó không giữ logic game, chỉ nhận dữ liệu vào và hiển thị ra.',
    },
    {
      id: 'l4-s3',
      title: 'Tham số làm Composable linh hoạt',
      narration:
        'Hàm Greeting nhận tham số name. Mỗi lần gọi với một tên khác, em có một lời chào khác. Viết một lần, dùng nhiều lần, đó là sức mạnh của Composable.',
      content: `### Tái sử dụng

Một Composable có thể được gọi **nhiều lần** với **dữ liệu khác nhau**. Column xếp chúng theo chiều dọc.`,
      teacherPose: 'pointing',
      code: {
        fileName: 'WelcomeScreen.kt',
        language: 'kotlin',
        code: nestedCode,
        highlightLines: linesContaining(nestedCode, ['Greeting(name']),
      },
      unityCompare: 'Giống một Prefab: em thiết kế một lần, rồi đặt nhiều bản sao với thông số khác nhau trong Scene.',
    },
    {
      id: 'l4-s4',
      title: 'Xem trước với @Preview',
      narration:
        'Chạy máy ảo mỗi lần sửa giao diện thì khá chậm. Chú thích a còng Preview cho em xem trước ngay trong Android Studio. Em mở chế độ Split ở góc trên bên phải để thấy code và hình cùng lúc.',
      content: `### @Preview

- Thêm **@Preview** phía trên một Composable **không có tham số**
- \`showBackground = true\`: hiện nền trắng phía sau
- \`name = "..."\`: đặt tên cho bản xem trước
- Bấm **Split** hoặc **Design** ở góc trên phải editor
- Sửa code xong, Preview tự cập nhật (hoặc bấm **Build & Refresh**)`,
      teacherPose: 'pointing',
      code: {
        fileName: 'GreetingPreview.kt',
        language: 'kotlin',
        code: previewCode,
        highlightLines: linesContaining(previewCode, ['@Preview']),
      },
      unityCompare:
        'Preview giống việc nhìn giao diện trong Scene view mà không cần bấm Play. Em thấy kết quả ngay, không phải chờ chạy game.',
      tip: 'Composable có tham số thì không preview trực tiếp được. Em tạo một hàm Preview riêng, không tham số, rồi gọi nó với dữ liệu mẫu.',
    },
    {
      id: 'l4-s5',
      title: 'Ví dụ hoàn chỉnh',
      narration:
        'Đây là file hoàn chỉnh. Có Greeting, có WelcomeScreen ghép ba lời chào, và hai hàm Preview. Em dán vào MainActivity, mở chế độ Split và xem cả hai bản xem trước nhé.',
      content: `### Ghép tất cả lại

Thay **MainActivity.kt** bằng đoạn code dưới. Mở **Split** để thấy **2 bản Preview**, rồi bấm **Run ▶** để so sánh với máy thật.`,
      teacherPose: 'pointing',
      code: {
        fileName: 'MainActivity.kt',
        language: 'kotlin',
        code: fullCode,
        highlightLines: linesContaining(fullCode, ['fun Greeting(', 'fun WelcomeScreen(', '@Preview']),
      },
      tip: 'Nếu dòng import Preview báo đỏ, em kiểm tra build.gradle.kts đã có thư viện ui-tooling-preview chưa. Mẫu Empty Activity đã thêm sẵn.',
    },
    {
      id: 'l4-s6',
      title: 'Tổng kết',
      narration:
        'Xuất sắc! Em đã viết Composable, truyền tham số và xem trước bằng Preview. Thế là xong chặng làm quen. Bài sau, mình bước sang chặng giao diện, học cách xếp bố cục với Column, Row và Box.',
      content: `### 3 ý chính

1. **@Composable** là hàm mô tả giao diện, không trả về giá trị
2. **Tham số** giúp một Composable dùng lại nhiều lần
3. **@Preview** xem trước giao diện mà không cần chạy app

🎉 **Hoàn thành chặng 1 – Làm quen!**

**Bài sau:** Bố cục với Column, Row và Box.`,
    },
  ],
  exercise: {
    description:
      'Tạo Composable **BusinessCard(name, role)** hiển thị tên (chữ to, đậm) và chức danh bên dưới. Thêm một hàm **@Preview** cho nó với dữ liệu mẫu.',
    hints: [
      'Dùng Column để xếp hai Text theo chiều dọc.',
      'Chữ đậm dùng tham số fontWeight = FontWeight.Bold.',
      'Hàm Preview không có tham số, bên trong gọi BusinessCard với tên và chức danh mẫu.',
    ],
    solution: {
      fileName: 'MainActivity.kt',
      language: 'kotlin',
      code: solutionCode,
      highlightLines: linesContaining(solutionCode, ['fun BusinessCard(', 'fun BusinessCardPreview']),
    },
  },
  quiz: [
    {
      id: 'l4-q1',
      question: 'Hàm Composable khác hàm thường ở điểm nào?',
      options: [
        'Có chú thích @Composable và mô tả giao diện',
        'Luôn trả về một String',
        'Chỉ chạy được trên máy ảo',
        'Phải đặt trong AndroidManifest.xml',
      ],
      answer: 0,
      explain: 'Composable là hàm có chú thích a còng Composable. Nó mô tả giao diện và không trả về giá trị.',
    },
    {
      id: 'l4-q2',
      question: '@Preview giúp em làm gì?',
      options: ['Chạy app nhanh hơn trên điện thoại', 'Xem trước giao diện ngay trong Android Studio', 'Tự sửa lỗi code', 'Xuất app lên Google Play'],
      answer: 1,
      explain: 'Preview hiển thị giao diện ngay trong editor, em không cần chạy máy ảo mỗi lần sửa.',
    },
    {
      id: 'l4-q3',
      question: 'Muốn preview Composable Greeting(name: String), em nên làm gì?',
      options: [
        'Thêm @Preview thẳng lên Greeting',
        'Tạo hàm Preview không tham số, gọi Greeting với tên mẫu',
        'Xoá tham số name',
        'Không thể preview được',
      ],
      answer: 1,
      explain: 'Hàm Preview không được có tham số. Em tạo một hàm riêng và gọi Greeting với dữ liệu mẫu bên trong.',
    },
  ],
};
