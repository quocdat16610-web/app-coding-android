import type { Lesson } from '@/types/lesson';
import { linesContaining } from '../codeUtils';

const treeCode = `app/
├── manifests/
│   └── AndroidManifest.xml      ← "giấy khai sinh" của app
├── kotlin+java/
│   └── com.example.myfirstapp/
│       ├── MainActivity.kt      ← mã nguồn Kotlin
│       └── ui.theme/            ← màu, font, theme
└── res/
    ├── drawable/                ← hình ảnh, icon vector
    ├── mipmap/                  ← icon app ở nhiều độ phân giải
    └── values/                  ← strings.xml, colors.xml, themes.xml
Gradle Scripts/
├── build.gradle.kts (Project: My_First_App)
├── build.gradle.kts (Module :app)   ← cấu hình app, thư viện
├── libs.versions.toml               ← bảng phiên bản thư viện
└── settings.gradle.kts
`;

const manifestCode = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.MyFirstApp">
        <activity
            android:name=".MainActivity"
            android:exported="true"
            android:theme="@style/Theme.MyFirstApp">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
`;

const mainActivityCode = `package com.example.myfirstapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    Greeting(name = "Android")
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String) {
    Text(text = "Hello $name!", modifier = Modifier.padding(16.dp))
}
`;

const stringsCode = `<resources>
    <string name="app_name">My First App</string>
    <string name="greeting">Xin chào, Kotlin Academy!</string>
</resources>
`;

const gradleCode = `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.kotlin.compose)
}

android {
    namespace = "com.example.myfirstapp"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.example.myfirstapp"
        minSdk = 24
        targetSdk = 35
        versionCode = 1
        versionName = "1.0"
    }

    buildFeatures {
        compose = true
    }
}

dependencies {
    implementation(libs.androidx.core.ktx)
    implementation(libs.androidx.activity.compose)
    implementation(platform(libs.androidx.compose.bom))
    implementation(libs.androidx.material3)
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
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            MaterialTheme {
                Surface(modifier = Modifier.fillMaxSize()) {
                    GreetingFromResources()
                }
            }
        }
    }
}

@Composable
fun GreetingFromResources() {
    // Text comes from res/values/strings.xml instead of being hard-coded
    Text(
        text = stringResource(R.string.greeting),
        modifier = Modifier.padding(16.dp)
    )
}
`;

export const lesson02: Lesson = {
  id: 2,
  stage: 1,
  title: 'Cấu trúc thư mục project',
  concept: 'Vai trò của manifest, mã nguồn, res và Gradle',
  estimatedMinutes: 15,
  objectives: [
    'Biết mỗi thư mục chính trong project Android dùng để làm gì',
    'Đọc hiểu AndroidManifest.xml và file build.gradle.kts của app',
    'Đưa chữ hiển thị vào strings.xml thay vì viết cứng trong code',
  ],
  steps: [
    {
      id: 'l2-s1',
      title: 'Ôn bài cũ và mục tiêu',
      narration:
        'Bài trước, em đã chạy được app đếm số đầu tiên. Hôm nay thầy dẫn em đi tham quan project. Em sẽ biết mỗi thư mục chứa gì, để không bị lạc khi app lớn dần.',
      content: `## Bài 2: Tham quan project

**Ôn lại:** em đã tạo project, chạy app và dùng **state** để đếm số lần bấm.

**Hôm nay em sẽ:**
- Biết vai trò của **manifests**, **kotlin+java**, **res** và **Gradle Scripts**
- Đọc hiểu **AndroidManifest.xml** và **build.gradle.kts**
- Dùng **strings.xml** để quản lý chữ hiển thị`,
    },
    {
      id: 'l2-s2',
      title: 'Toàn cảnh project',
      narration:
        'Ở cột bên trái Android Studio, em chọn chế độ xem Android. Project chia thành ba nhóm chính. Một là manifest, hai là mã nguồn Kotlin, ba là tài nguyên res. Bên dưới còn có các file Gradle để cấu hình.',
      content: `### Cây thư mục ở chế độ xem **Android**

Chọn menu thả xuống ở góc trên cột **Project** → **Android**.`,
      code: { fileName: 'Project tree', language: 'text', code: treeCode },
      unityCompare:
        'Giống thư mục Assets trong Unity: có chỗ cho Scripts, chỗ cho Textures, chỗ cho Settings. Android cũng chia rõ code, tài nguyên và cấu hình.',
    },
    {
      id: 'l2-s3',
      title: 'AndroidManifest.xml',
      narration:
        'File manifest giống giấy khai sinh của app. Nó khai báo tên app, biểu tượng, các màn hình và quyền cần xin. Màn hình nào có bộ lọc MAIN và LAUNCHER sẽ mở đầu tiên khi bấm vào biểu tượng.',
      content: `### AndroidManifest.xml – giấy khai sinh của app

- **application**: tên app (\`label\`), icon, theme
- **activity**: mỗi màn hình phải được khai báo ở đây
- **intent-filter MAIN + LAUNCHER**: màn hình mở đầu tiên
- **uses-permission**: quyền cần xin, ví dụ truy cập Internet`,
      teacherPose: 'pointing',
      code: {
        fileName: 'AndroidManifest.xml',
        language: 'xml',
        code: manifestCode,
        highlightLines: linesContaining(manifestCode, ['android:name=".MainActivity"', 'action.MAIN', 'category.LAUNCHER']),
      },
      tip: 'Quên khai báo activity trong manifest là lỗi kinh điển. App sẽ báo ActivityNotFoundException khi mở màn hình đó.',
    },
    {
      id: 'l2-s4',
      title: 'Mã nguồn Kotlin',
      narration:
        'Thư mục kotlin cộng java chứa toàn bộ code của em. Code được xếp theo package, giống địa chỉ nhà. Dòng package ở đầu file phải khớp với thư mục chứa nó.',
      content: `### Thư mục **kotlin+java**

- Code nằm trong package **com.example.myfirstapp**
- Dòng \`package\` đầu file phải khớp với thư mục
- Các dòng \`import\` lấy thư viện từ nơi khác về dùng`,
      teacherPose: 'pointing',
      code: {
        fileName: 'MainActivity.kt',
        language: 'kotlin',
        code: mainActivityCode,
        highlightLines: linesContaining(mainActivityCode, ['package com.example', 'class MainActivity']),
      },
      unityCompare:
        'Package giống namespace trong C#. Nó giúp hai class trùng tên ở hai nơi khác nhau không bị đụng nhau.',
    },
    {
      id: 'l2-s5',
      title: 'Thư mục res – tài nguyên',
      narration:
        'Thư mục res chứa mọi thứ không phải code. Hình ảnh nằm trong drawable, icon app nằm trong mipmap. Chữ hiển thị nên đặt trong strings chấm xml, để sau này dịch sang tiếng khác cho dễ.',
      content: `### Thư mục **res**

| Thư mục | Chứa gì |
| --- | --- |
| drawable | Hình ảnh, icon vector |
| mipmap | Icon app ở nhiều độ phân giải |
| values | strings.xml, colors.xml, themes.xml |

Mỗi tài nguyên có một mã trong lớp **R** do Android tự sinh, ví dụ \`R.string.greeting\`.`,
      code: {
        fileName: 'res/values/strings.xml',
        language: 'xml',
        code: stringsCode,
        highlightLines: linesContaining(stringsCode, ['name="greeting"']),
      },
      unityCompare:
        'Lớp R giống việc kéo thả asset vào Inspector: em tham chiếu tài nguyên qua một cái tên, không cần đường dẫn file.',
    },
    {
      id: 'l2-s6',
      title: 'Gradle – người quản lý build',
      narration:
        'Gradle là công cụ đóng gói app. File build gradle của module app khai báo phiên bản Android tối thiểu và các thư viện cần dùng. Mỗi khi sửa file này, em bấm Sync Now để Gradle cập nhật.',
      content: `### build.gradle.kts (Module :app)

- **namespace / applicationId**: mã định danh app trên Google Play
- **minSdk**: Android thấp nhất app chạy được
- **dependencies**: các thư viện app dùng
- Phiên bản thư viện được gom trong **libs.versions.toml**`,
      teacherPose: 'pointing',
      code: {
        fileName: 'build.gradle.kts',
        language: 'kotlin',
        code: gradleCode,
        highlightLines: linesContaining(gradleCode, ['minSdk', 'implementation(libs.androidx.material3)']),
      },
      unityCompare:
        'Phần dependencies giống Package Manager trong Unity. Em khai báo gói cần dùng, Gradle tự tải về.',
      tip: 'Sau khi sửa file Gradle, thanh vàng "Sync Now" sẽ hiện ở trên cùng. Nhớ bấm vào đó nhé.',
    },
    {
      id: 'l2-s7',
      title: 'Tổng kết',
      narration:
        'Giỏi lắm! Em đã biết manifest khai báo app, thư mục kotlin chứa code, res chứa tài nguyên và Gradle lo việc build. Bài sau, thầy sẽ dạy em những viên gạch đầu tiên của ngôn ngữ Kotlin.',
      content: `### 3 ý chính

1. **AndroidManifest.xml** khai báo app, màn hình và quyền
2. **kotlin+java** chứa code, **res** chứa tài nguyên truy cập qua lớp **R**
3. **Gradle** cấu hình phiên bản và thư viện, nhớ **Sync Now** sau khi sửa

**Bài sau:** Kotlin cơ bản – val/var, kiểu dữ liệu, hàm và chuỗi template.`,
    },
  ],
  exercise: {
    description:
      'Thêm chuỗi **greeting** vào **strings.xml**, rồi viết một Composable hiển thị chuỗi đó bằng `stringResource(R.string.greeting)`.',
    hints: [
      'Mở res/values/strings.xml và thêm một thẻ string có name là greeting.',
      'Trong code, import androidx.compose.ui.res.stringResource.',
      'Truyền stringResource(R.string.greeting) vào tham số text của Text.',
    ],
    solution: {
      fileName: 'MainActivity.kt',
      language: 'kotlin',
      code: solutionCode,
      highlightLines: linesContaining(solutionCode, ['stringResource(R.string.greeting)']),
    },
  },
  quiz: [
    {
      id: 'l2-q1',
      question: 'File nào khai báo các màn hình (Activity) và quyền của app?',
      options: ['build.gradle.kts', 'AndroidManifest.xml', 'strings.xml', 'MainActivity.kt'],
      answer: 1,
      explain: 'AndroidManifest.xml là giấy khai sinh của app. Mọi Activity và quyền đều phải khai báo ở đó.',
    },
    {
      id: 'l2-q2',
      question: 'Chữ hiển thị trên giao diện nên đặt ở đâu để dễ dịch sang ngôn ngữ khác?',
      options: ['Viết thẳng trong code Kotlin', 'res/values/strings.xml', 'AndroidManifest.xml', 'libs.versions.toml'],
      answer: 1,
      explain: 'Đặt chữ trong strings.xml giúp em dịch app chỉ bằng cách thêm một file strings cho ngôn ngữ mới.',
    },
    {
      id: 'l2-q3',
      question: 'Muốn thêm một thư viện mới vào app, em sửa file nào?',
      options: ['build.gradle.kts của module app', 'strings.xml', 'AndroidManifest.xml', 'Thư mục drawable'],
      answer: 0,
      explain: 'Thư viện khai báo trong khối dependencies của build.gradle.kts. Sau đó em bấm Sync Now.',
    },
    {
      id: 'l2-q4',
      question: 'Hình ảnh dùng trong giao diện thường được đặt trong thư mục nào?',
      options: ['res/values', 'manifests', 'res/drawable', 'Gradle Scripts'],
      answer: 2,
      explain: 'Thư mục drawable chứa hình ảnh và icon vector. Em gọi chúng qua mã R.drawable cộng tên file.',
    },
  ],
};
