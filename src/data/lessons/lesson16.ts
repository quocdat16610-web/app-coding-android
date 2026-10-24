import type { Lesson } from '@/types/lesson';
import { linesContaining } from '../codeUtils';

const architectureCode = `UI (Compose)          NotesScreen, NoteEditor
   ↑ state  ↓ event
ViewModel             NotesViewModel: list, search query, add/edit/delete
   ↑ Flow   ↓ suspend
Room                  NoteDao  →  NoteDatabase  →  notes table
`;

const solutionCode = `package com.example.notes.data

import android.content.Context
import androidx.room.Dao
import androidx.room.Database
import androidx.room.Delete
import androidx.room.Entity
import androidx.room.Insert
import androidx.room.PrimaryKey
import androidx.room.Query
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.Update
import kotlinx.coroutines.flow.Flow

@Entity(tableName = "notes")
data class Note(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val title: String,
    val content: String,
    val updatedAt: Long = System.currentTimeMillis()
)

@Dao
interface NoteDao {
    @Query("SELECT * FROM notes ORDER BY updatedAt DESC")
    fun observeAll(): Flow<List<Note>>

    @Query("SELECT * FROM notes WHERE title LIKE '%' || :query || '%' OR content LIKE '%' || :query || '%' ORDER BY updatedAt DESC")
    fun search(query: String): Flow<List<Note>>

    @Insert
    suspend fun insert(note: Note): Long

    @Update
    suspend fun update(note: Note)

    @Delete
    suspend fun delete(note: Note)
}

@Database(entities = [Note::class], version = 1)
abstract class NoteDatabase : RoomDatabase() {
    abstract fun noteDao(): NoteDao

    companion object {
        @Volatile
        private var instance: NoteDatabase? = null

        fun get(context: Context): NoteDatabase =
            instance ?: synchronized(this) {
                instance ?: Room.databaseBuilder(
                    context.applicationContext,
                    NoteDatabase::class.java,
                    "notes.db"
                ).build().also { instance = it }
            }
    }
}
`;

export const lesson16: Lesson = {
  id: 16,
  stage: 4,
  title: 'Dự án cuối: app ghi chú hoàn chỉnh',
  concept: 'Kết hợp Compose, ViewModel và Room thành một app thật',
  estimatedMinutes: 60,
  draft: true,
  objectives: [
    'Thiết kế kiến trúc ba lớp: giao diện, ViewModel và dữ liệu',
    'Xây dựng chức năng thêm, sửa, xoá và tìm kiếm ghi chú',
    'Lưu ghi chú bền vững bằng Room',
  ],
  steps: [
    {
      id: 'l16-s1',
      title: 'Ôn khoá học và mục tiêu',
      narration:
        'Em đã đi một chặng đường dài! Từ app đếm số, em đã học bố cục, state, danh sách, ViewModel, điều hướng, lưu dữ liệu và gọi mạng. Hôm nay mình ghép tất cả thành một app ghi chú hoàn chỉnh.',
      content: `## Bài 16: Dự án cuối 🏆

**App ghi chú** với đầy đủ chức năng:
- ➕ **Thêm** ghi chú mới
- ✏️ **Sửa** ghi chú
- 🗑️ **Xoá** ghi chú
- 🔍 **Tìm kiếm** theo tiêu đề và nội dung
- 💾 **Lưu** bằng Room, tắt app vẫn còn`,
    },
    {
      id: 'l16-s2',
      title: 'Kiến trúc ba lớp',
      narration:
        'App chia làm ba lớp. Lớp giao diện chỉ lo hiển thị và gửi sự kiện. ViewModel giữ trạng thái và xử lý logic. Room lo việc lưu trữ. Mỗi lớp chỉ nói chuyện với lớp bên cạnh.',
      content: `### Dữ liệu chảy một chiều

- **UI** gửi **sự kiện** (bấm thêm, gõ tìm kiếm) xuống ViewModel
- **ViewModel** gọi **Room** và đưa **state** mới lên UI
- **Room** trả về **Flow**, tự báo khi dữ liệu thay đổi`,
      code: { fileName: 'Architecture', language: 'text', code: architectureCode },
      unityCompare:
        'Giống tách game thành UI Canvas, GameManager và hệ thống save. Đổi giao diện không ảnh hưởng cách lưu game.',
    },
  ],
  exercise: {
    description: 'Viết lớp dữ liệu cho app: **Entity Note**, **NoteDao** có observeAll, search, insert, update, delete, và **NoteDatabase**.',
    hints: [
      'Thêm plugin KSP và thư viện room-runtime, room-ktx, room-compiler vào Gradle.',
      'Hàm đọc trả về Flow để giao diện tự cập nhật, hàm ghi là suspend.',
      'Tìm kiếm dùng LIKE kết hợp ký tự phần trăm ở hai đầu từ khoá.',
    ],
    solution: {
      fileName: 'NoteDatabase.kt',
      language: 'kotlin',
      code: solutionCode,
      highlightLines: linesContaining(solutionCode, ['@Entity', '@Dao', '@Database']),
    },
  },
  quiz: [
    {
      id: 'l16-q1',
      question: 'Trong kiến trúc ba lớp, ai nên gọi Room trực tiếp?',
      options: ['Composable', 'ViewModel', 'AndroidManifest', 'Theme'],
      answer: 1,
      explain: 'ViewModel gọi Room và đưa state lên giao diện. Composable chỉ hiển thị và gửi sự kiện.',
    },
    {
      id: 'l16-q2',
      question: 'Vì sao hàm observeAll trả về Flow?',
      options: ['Để chạy nhanh hơn', 'Để tự phát danh sách mới mỗi khi dữ liệu đổi', 'Vì Room bắt buộc', 'Để mã hoá dữ liệu'],
      answer: 1,
      explain: 'Flow phát giá trị mới mỗi khi bảng thay đổi, nên danh sách trên màn hình luôn cập nhật.',
    },
    {
      id: 'l16-q3',
      question: 'Chú thích nào đánh dấu một data class là bảng trong Room?',
      options: ['@Dao', '@Entity', '@Database', '@Composable'],
      answer: 1,
      explain: 'Entity biến một data class thành một bảng, mỗi thuộc tính là một cột.',
    },
  ],
};
