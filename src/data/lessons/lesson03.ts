import type { Lesson } from '@/types/lesson';
import { linesContaining } from '../codeUtils';

const valVarCode = `fun main() {
    val playerName = "Lan"   // val: cannot be reassigned
    var score = 0            // var: can change later

    score = score + 10
    score += 5

    // playerName = "Minh"   // Error: Val cannot be reassigned
    println(playerName)
    println(score)           // 15
}
`;

const typesCode = `fun main() {
    val level: Int = 3
    val speed: Double = 1.5
    val isAlive: Boolean = true
    val title: String = "Kotlin Hero"

    // Type inference: Kotlin figures out the type for you
    val coins = 120          // Int
    val ratio = 0.75         // Double

    var nickname: String? = null   // "?" means it may be null
    nickname = "Hero"

    println(level + coins)
    println(title.length)
    println(nickname)
}
`;

const functionsCode = `fun add(a: Int, b: Int): Int {
    return a + b
}

// Single-expression function: same result, shorter
fun multiply(a: Int, b: Int): Int = a * b

// Default parameter value
fun greet(name: String, emoji: String = "👋"): String {
    return "Xin chào $name $emoji"
}

fun main() {
    println(add(2, 3))              // 5
    println(multiply(4, 5))         // 20
    println(greet("Lan"))           // Xin chào Lan 👋
    println(greet(name = "Minh", emoji = "🚀"))
}
`;

const templateCode = `fun main() {
    val name = "Lan"
    val level = 3
    val hp = 80
    val maxHp = 100

    println("Người chơi: $name")
    println("Level $level, máu \${hp * 100 / maxHp}%")
    println("Tên có \${name.length} ký tự")
}
`;

const appCode = `package com.example.myfirstapp

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
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    PlayerInfo()
                }
            }
        }
    }
}

fun hpPercent(hp: Int, maxHp: Int): Int = hp * 100 / maxHp

@Composable
fun PlayerInfo() {
    val name = "Lan"
    val level = 3
    var hp = 80
    hp -= 20

    Column(
        modifier = Modifier.padding(24.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        Text(text = "Người chơi: $name", fontSize = 24.sp)
        Text(text = "Level $level")
        Text(text = "Máu còn \${hpPercent(hp, 100)}%")
    }
}
`;

const solutionCode = `package com.example.myfirstapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val message = introduce(name = "Minh", age = 20, city = "Đà Nẵng")
        setContent {
            MaterialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    Text(text = message, fontSize = 22.sp, modifier = Modifier.padding(24.dp))
                }
            }
        }
    }
}

fun introduce(name: String, age: Int, city: String = "Hà Nội"): String {
    val nextYear = age + 1
    return "Mình là $name, $age tuổi, sống ở $city. Năm sau mình \${nextYear} tuổi."
}
`;

export const lesson03: Lesson = {
  id: 3,
  stage: 1,
  title: 'Kotlin cơ bản',
  concept: 'Biến, kiểu dữ liệu, hàm và chuỗi template',
  estimatedMinutes: 20,
  objectives: [
    'Phân biệt được val và var, biết khi nào dùng cái nào',
    'Viết được hàm có tham số và giá trị trả về',
    'Ghép biến vào chuỗi bằng string template',
  ],
  steps: [
    {
      id: 'l3-s1',
      title: 'Ôn bài cũ và mục tiêu',
      narration:
        'Bài trước, em đã biết project gồm manifest, mã nguồn, tài nguyên và Gradle. Hôm nay mình học những viên gạch đầu tiên của ngôn ngữ Kotlin. Nếu em biết Python, em sẽ thấy rất quen.',
      content: `## Bài 3: Kotlin cơ bản

**Ôn lại:** project gồm **manifest**, **kotlin+java**, **res** và **Gradle**.

**Hôm nay em sẽ:**
- Dùng **val** và **var** đúng chỗ
- Biết các kiểu dữ liệu cơ bản
- Viết **hàm** và dùng **chuỗi template**`,
      tip: 'Em có thể chạy thử các đoạn code có hàm main trong Kotlin Playground trên trình duyệt, hoặc tạo Scratch File trong Android Studio.',
    },
    {
      id: 'l3-s2',
      title: 'val và var',
      narration:
        'Kotlin có hai cách khai báo biến. Val là giá trị chỉ gán một lần, không đổi được nữa. Var là biến có thể thay đổi. Lời khuyên của thầy là luôn dùng val trước, chỉ đổi sang var khi thật sự cần.',
      content: `### val và var

| Từ khoá | Gán lại được? | Dùng khi |
| --- | --- | --- |
| **val** | ❌ Không | Giá trị cố định sau khi gán |
| **var** | ✅ Có | Giá trị cần thay đổi |

So với Python: Python không phân biệt, mọi biến đều gán lại được.`,
      teacherPose: 'pointing',
      code: {
        fileName: 'ValVar.kt',
        language: 'kotlin',
        code: valVarCode,
        highlightLines: linesContaining(valVarCode, ['val playerName', 'var score']),
      },
      unityCompare:
        'val giống trường readonly trong C#: gán một lần rồi thôi. var giống một biến C# bình thường, ví dụ biến score trong script của em.',
    },
    {
      id: 'l3-s3',
      title: 'Kiểu dữ liệu',
      narration:
        'Mỗi biến có một kiểu. Int là số nguyên, Double là số thực, Boolean là đúng sai, String là chuỗi chữ. Thường em không cần ghi kiểu, vì Kotlin tự đoán được. Dấu hỏi sau kiểu nghĩa là biến được phép rỗng.',
      content: `### Các kiểu cơ bản

| Kiểu | Ví dụ | Ý nghĩa |
| --- | --- | --- |
| Int | 42 | Số nguyên |
| Double | 1.5 | Số thực |
| Boolean | true / false | Đúng / sai |
| String | "Kotlin" | Chuỗi chữ |

- **Suy luận kiểu:** \`val coins = 120\` → Kotlin tự hiểu là **Int**
- **String?** có dấu hỏi → được phép mang giá trị **null**`,
      teacherPose: 'pointing',
      code: {
        fileName: 'Types.kt',
        language: 'kotlin',
        code: typesCode,
        highlightLines: linesContaining(typesCode, ['val coins = 120', 'String? = null']),
      },
      tip: 'Kotlin bắt lỗi null ngay lúc viết code. Đây là lý do app Kotlin ít bị lỗi NullPointerException hơn Java.',
    },
    {
      id: 'l3-s4',
      title: 'Hàm',
      narration:
        'Hàm khai báo bằng từ khoá fun. Sau tên hàm là tham số kèm kiểu, rồi đến kiểu trả về sau dấu hai chấm. Nếu hàm chỉ có một biểu thức, em có thể viết gọn trên một dòng. Tham số còn có thể có giá trị mặc định.',
      content: `### Hàm với **fun**

\`\`\`
fun tênHàm(thamSố: Kiểu): KiểuTrảVề { ... }
\`\`\`

- Hàm một biểu thức: \`fun multiply(a: Int, b: Int) = a * b\`
- Giá trị mặc định: \`emoji: String = "👋"\`
- Gọi có tên tham số: \`greet(name = "Minh")\` – giống Python`,
      teacherPose: 'pointing',
      code: {
        fileName: 'Functions.kt',
        language: 'kotlin',
        code: functionsCode,
        highlightLines: linesContaining(functionsCode, ['fun add(', 'fun greet(']),
      },
      unityCompare:
        'Trong C# em viết int Add(int a, int b). Kotlin đảo ngược: tên trước, kiểu sau, và dùng chữ fun ở đầu.',
    },
    {
      id: 'l3-s5',
      title: 'Chuỗi template',
      narration:
        'Muốn ghép biến vào chuỗi, em chỉ cần đặt dấu đô la trước tên biến. Nếu là một phép tính, em bọc nó trong cặp ngoặc nhọn. Cách này giống f string trong Python.',
      content: `### String template

- \`"Level $level"\` → chèn giá trị biến
- \`"\${hp * 100 / maxHp}%"\` → chèn kết quả một biểu thức
- Python: \`f"Level {level}"\` ↔ Kotlin: \`"Level $level"\``,
      teacherPose: 'pointing',
      code: {
        fileName: 'Templates.kt',
        language: 'kotlin',
        code: templateCode,
        highlightLines: linesContaining(templateCode, ['$name")', 'maxHp}%']),
      },
    },
    {
      id: 'l3-s6',
      title: 'Ghép lại trong app',
      narration:
        'Giờ mình dùng tất cả trong một app thật. Em thấy có val cho tên và level, var cho máu, một hàm tính phần trăm, và chuỗi template để hiển thị. Em dán vào MainActivity rồi chạy thử nhé.',
      content: `### App thông tin người chơi

Thay toàn bộ **MainActivity.kt** bằng đoạn code dưới rồi bấm **Run ▶**. Màn hình sẽ hiện tên, level và phần trăm máu.`,
      teacherPose: 'pointing',
      code: {
        fileName: 'MainActivity.kt',
        language: 'kotlin',
        code: appCode,
        highlightLines: linesContaining(appCode, ['fun hpPercent', 'var hp = 80', 'hpPercent(hp, 100)']),
      },
      tip: 'Ở bài này var hp chỉ đổi một lần trước khi vẽ. Muốn giao diện tự cập nhật khi máu đổi, em cần state như ở bài 1.',
    },
    {
      id: 'l3-s7',
      title: 'Tổng kết',
      narration:
        'Em làm tốt lắm! Hãy nhớ, ưu tiên val, chỉ dùng var khi cần đổi. Hàm khai báo bằng fun, và dấu đô la giúp ghép biến vào chuỗi. Bài sau, mình sẽ viết Composable đầu tiên và xem trước giao diện ngay trong Android Studio.',
      content: `### 3 ý chính

1. **val** không đổi, **var** đổi được – ưu tiên **val**
2. Hàm: \`fun ten(thamSo: Kieu): KieuTraVe\`, có giá trị mặc định và gọi theo tên
3. **String template**: \`$bien\` và \`\${bieuThuc}\`

**Bài sau:** Composable đầu tiên và @Preview.`,
    },
  ],
  exercise: {
    description:
      'Viết hàm `introduce(name, age, city)` trả về câu giới thiệu, ví dụ *"Mình là Minh, 20 tuổi, sống ở Đà Nẵng."*. Tham số **city** có giá trị mặc định là "Hà Nội". Hiển thị kết quả lên màn hình bằng Text.',
    hints: [
      'Khai báo hàm bằng fun introduce(name: String, age: Int, city: String = "Hà Nội"): String.',
      'Dùng chuỗi template với dấu đô la để ghép name, age và city.',
      'Gọi hàm trong onCreate, lưu kết quả vào một val rồi truyền vào Text.',
    ],
    solution: {
      fileName: 'MainActivity.kt',
      language: 'kotlin',
      code: solutionCode,
      highlightLines: linesContaining(solutionCode, ['fun introduce(', 'return "Mình là']),
    },
  },
  quiz: [
    {
      id: 'l3-q1',
      question: 'Điều gì xảy ra khi em gán lại một biến khai báo bằng val?',
      options: ['Giá trị được cập nhật bình thường', 'Trình biên dịch báo lỗi', 'App bị crash khi chạy', 'Biến tự đổi thành var'],
      answer: 1,
      explain: 'Val chỉ gán được một lần. Nếu gán lại, Android Studio báo lỗi ngay khi em viết code, chưa cần chạy app.',
    },
    {
      id: 'l3-q2',
      question: 'Với val price = 9.99, Kotlin tự suy ra kiểu gì?',
      options: ['Int', 'String', 'Double', 'Boolean'],
      answer: 2,
      explain: 'Số có phần thập phân được Kotlin suy ra là Double. Em không cần ghi kiểu một cách tường minh.',
    },
    {
      id: 'l3-q3',
      question: 'Với val name = "Lan", câu lệnh nào in ra: Xin chào Lan?',
      options: ['println("Xin chào name")', 'println("Xin chào $name")', 'println("Xin chào {name}")', 'println(Xin chào + name)'],
      answer: 1,
      explain: 'Dấu đô la đặt trước tên biến trong chuỗi sẽ chèn giá trị của biến đó vào.',
    },
    {
      id: 'l3-q4',
      question: 'Khai báo hàm nào đúng cú pháp Kotlin?',
      options: ['int sum(int a, int b)', 'def sum(a, b):', 'fun sum(a: Int, b: Int): Int = a + b', 'function sum(a: Int, b: Int)'],
      answer: 2,
      explain: 'Kotlin dùng từ khoá fun, ghi kiểu sau tên tham số, và kiểu trả về đứng sau dấu hai chấm.',
    },
  ],
};
