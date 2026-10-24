import type { Lesson } from '@/types/lesson';
import { linesContaining } from '../codeUtils';

const counterCode = `package com.example.myfirstapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    CounterScreen()
                }
            }
        }
    }
}

@Composable
fun CounterScreen() {
    var count by remember { mutableStateOf(0) }

    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(text = "Bạn đã bấm $count lần", fontSize = 24.sp)
        Spacer(modifier = Modifier.height(16.dp))
        Button(onClick = { count++ }) {
            Text("Bấm tôi")
        }
    }
}
`;

const solutionCode = `package com.example.myfirstapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    CounterScreen()
                }
            }
        }
    }
}

@Composable
fun CounterScreen() {
    var count by remember { mutableStateOf(0) }

    Column(
        modifier = Modifier.fillMaxSize().padding(24.dp),
        verticalArrangement = Arrangement.Center,
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(text = "Bạn đã bấm $count lần", fontSize = 24.sp)
        Spacer(modifier = Modifier.height(16.dp))
        Button(onClick = { count++ }) {
            Text("Bấm tôi")
        }
        Spacer(modifier = Modifier.height(8.dp))
        // Second button: put the counter back to zero
        OutlinedButton(onClick = { count = 0 }) {
            Text("Reset")
        }
    }
}
`;

export const lesson01: Lesson = {
  id: 1,
  stage: 1,
  title: 'Cài Android Studio và chạy app đầu tiên',
  concept: 'Tạo và chạy một project Android',
  estimatedMinutes: 15,
  objectives: [
    'Tạo được project Empty Activity với Jetpack Compose',
    'Chạy app trên máy ảo hoặc điện thoại thật',
    'Viết app đếm số lần bấm nút đầu tiên',
  ],
  steps: [
    {
      id: 'l1-s1',
      title: 'Chào mừng',
      narration:
        'Chào em! Thầy là thầy Kotlin. Hôm nay chúng ta sẽ làm app Android đầu tiên. Cuối bài, em sẽ có một app đếm số lần bấm nút chạy thật trên điện thoại. Bắt đầu thôi!',
      content: `## Bài 1: App đầu tiên

Chào mừng em đến với **Kotlin Academy**! Sau bài này em sẽ:

1. Tạo được project **Empty Activity** với Jetpack Compose
2. Chạy app trên **máy ảo** hoặc **điện thoại thật**
3. Viết **app đếm số lần bấm nút** đầu tiên`,
    },
    {
      id: 'l1-s2',
      title: 'Tạo project',
      narration:
        'Đầu tiên, em mở Android Studio và chọn New Project. Em chọn mẫu Empty Activity, loại có biểu tượng Compose. Đặt tên app là My First App. Ngôn ngữ chọn Kotlin, Minimum SDK chọn API 24. Sau đó bấm Finish và đợi Gradle tải thư viện xong.',
      content: `### Các bước tạo project

1. Mở **Android Studio** → chọn **New Project**
2. Chọn mẫu **Empty Activity** (biểu tượng Compose)
3. Điền thông tin như bảng dưới rồi bấm **Finish**
4. Đợi thanh trạng thái báo **Gradle sync finished**

| Trường | Giá trị |
| --- | --- |
| Name | My First App |
| Package name | com.example.myfirstapp |
| Minimum SDK | API 24 ("Nougat"; Android 7.0) |
| Build configuration language | Kotlin DSL (build.gradle.kts) |`,
      tip: 'Lần đầu Gradle sync có thể mất vài phút vì phải tải thư viện. Em cứ kiên nhẫn đợi nhé.',
    },
    {
      id: 'l1-s3',
      title: 'Chuẩn bị thiết bị chạy thử',
      narration:
        'Để chạy app, em cần một thiết bị. Cách thứ nhất là tạo máy ảo trong Device Manager. Cách thứ hai là dùng điện thoại thật, bật chế độ nhà phát triển và gỡ lỗi USB.',
      content: `### Chọn một trong hai cách

| Máy ảo (Emulator) | Điện thoại thật |
| --- | --- |
| 1. Mở **Device Manager** (thanh bên phải) | 1. Vào **Cài đặt → Thông tin điện thoại** |
| 2. Bấm **+** → **Create Virtual Device** | 2. Bấm **7 lần** vào **Số hiệu bản tạo** (Build number) |
| 3. Chọn máy **Pixel**, bấm **Next** | 3. Quay lại, mở **Tuỳ chọn nhà phát triển** |
| 4. Chọn bản Android mới nhất, bấm **Download** rồi **Finish** | 4. Bật **Gỡ lỗi USB** (USB debugging) |
| 5. Bấm ▶ để khởi động máy ảo | 5. Cắm cáp, chọn **Cho phép** trên điện thoại |`,
      tip: 'Máy ảo cần khoảng 8 GB RAM để chạy mượt. Nếu máy tính yếu, dùng điện thoại thật sẽ nhanh hơn.',
    },
    {
      id: 'l1-s4',
      title: 'Chạy app mẫu',
      narration:
        'Bây giờ em bấm nút Run màu xanh, hoặc phím Shift F10. Nếu thấy chữ Hello Android trên màn hình, chúc mừng em, app đầu tiên đã chạy!',
      content: `### Chạy app

- Chọn thiết bị ở thanh công cụ phía trên
- Bấm nút **Run ▶** màu xanh hoặc **Shift + F10** (macOS: **Ctrl + R**)
- Màn hình hiện **Hello Android!** là thành công 🎉`,
      tip: 'Nếu báo lỗi, em mở tab Build ở dưới cùng và đọc dòng màu đỏ đầu tiên. Thường đó là nơi chỉ ra nguyên nhân.',
    },
    {
      id: 'l1-s5',
      title: 'Viết app đếm số',
      narration:
        'Giờ chúng ta tự viết app. Em mở file MainActivity chấm kt, xoá hết và dán đoạn code này vào. Nhớ là dòng package phải khớp với tên package của em.',
      content: `### App đếm số lần bấm

Mở **app/src/main/java/.../MainActivity.kt**, xoá toàn bộ và dán đoạn code dưới đây. Sau đó bấm **Run ▶** lại.`,
      teacherPose: 'pointing',
      code: {
        fileName: 'MainActivity.kt',
        language: 'kotlin',
        code: counterCode,
        highlightLines: linesContaining(counterCode, ['var count by', 'Button(onClick']),
      },
      tip: 'Nếu tên package của em khác com.example.myfirstapp, hãy giữ nguyên dòng package cũ của em.',
    },
    {
      id: 'l1-s6',
      title: 'Hiểu code: Activity và onCreate',
      narration:
        'MainActivity là một màn hình của app. Hàm onCreate chạy một lần khi màn hình được tạo. Lệnh setContent nói với Android rằng giao diện màn hình là những gì nằm trong ngoặc.',
      content: `### Activity và onCreate

- **MainActivity** là một màn hình của app
- **onCreate()** chạy **một lần** khi màn hình được tạo
- **setContent { ... }** khai báo giao diện bằng Compose`,
      unityCompare:
        'Activity giống như một Scene trong Unity, còn onCreate() giống Start() – chỉ chạy một lần khi khởi tạo.',
    },
    {
      id: 'l1-s7',
      title: 'Hiểu code: State',
      narration:
        'Dòng quan trọng nhất là biến count. Đây là state, tức là trạng thái. Khi count thay đổi, Compose tự vẽ lại phần giao diện dùng nó. Em không cần tự cập nhật chữ.',
      content: `### State – trạng thái

\`var count by remember { mutableStateOf(0) }\`

- **mutableStateOf(0)**: tạo một state có giá trị ban đầu là 0
- **remember**: giữ giá trị qua các lần vẽ lại
- Khi **count++**, Compose tự vẽ lại **Text** đang dùng count`,
      unityCompare:
        'Khác với Update() chạy mỗi frame, Compose chỉ vẽ lại khi state thay đổi. Nhờ vậy app tiết kiệm pin hơn.',
    },
    {
      id: 'l1-s8',
      title: 'Tổng kết',
      narration:
        'Tuyệt vời! Hôm nay em đã tạo project, chạy app và hiểu state cơ bản. Bài sau, thầy sẽ dẫn em đi tham quan cấu trúc thư mục của project.',
      content: `### 3 ý chính

1. Tạo project **Empty Activity** và chạy bằng nút **Run ▶**
2. **Activity** là một màn hình, **onCreate()** chạy một lần khi tạo
3. **State** thay đổi → Compose tự vẽ lại giao diện

**Bài sau:** Tham quan cấu trúc thư mục project – manifest, mã nguồn, tài nguyên và Gradle.`,
    },
  ],
  exercise: {
    description: 'Thêm nút thứ hai tên **Reset**, khi bấm thì đưa count về 0.',
    hints: ['Dùng thêm một Button nữa bên dưới nút cũ.', 'Trong onClick, gán count = 0.'],
    solution: {
      fileName: 'MainActivity.kt',
      language: 'kotlin',
      code: solutionCode,
      highlightLines: linesContaining(solutionCode, ['OutlinedButton(onClick', 'Text("Reset")']),
    },
  },
  quiz: [
    {
      id: 'l1-q1',
      question: 'Hàm onCreate chạy khi nào?',
      options: ['Mỗi frame', 'Một lần khi màn hình được tạo', 'Khi bấm nút', 'Khi tắt app'],
      answer: 1,
      explain: 'Hàm onCreate chạy một lần khi Activity được tạo. Đây là nơi ta gọi setContent để dựng giao diện.',
    },
    {
      id: 'l1-q2',
      question: 'Vì sao chữ trên màn hình tự cập nhật khi count tăng?',
      options: [
        'Vì count là state, Compose tự vẽ lại',
        'Vì Android tự làm mới mỗi giây',
        'Vì Button tự đổi chữ',
        'Vì có hàm Update',
      ],
      answer: 0,
      explain: 'Biến count được tạo bằng mutableStateOf nên là state. Khi state đổi, Compose vẽ lại phần giao diện đang dùng nó.',
    },
    {
      id: 'l1-q3',
      question: 'Trong Unity, Activity giống với gì nhất?',
      options: ['GameObject', 'Scene', 'Prefab', 'Material'],
      answer: 1,
      explain: 'Mỗi Activity là một màn hình riêng của app, giống như một Scene trong Unity.',
    },
  ],
};
