import { Link, useParams } from 'react-router-dom';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <PagePlaceholder
      emoji="📘"
      title={`Bài ${id ?? ''}`}
      description="Thầy Kotlin, giọng đọc và các bước bài học sẽ xuất hiện ở đây (Giai đoạn 5–6)."
    >
      <Link className="font-semibold text-primary underline" to={`/lesson/${id ?? '1'}/quiz`}>
        Sang trắc nghiệm
      </Link>
      <Link className="font-semibold text-primary underline" to="/">
        Về bản đồ
      </Link>
    </PagePlaceholder>
  );
}
