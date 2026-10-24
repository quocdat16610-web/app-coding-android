import { Link, useParams } from 'react-router-dom';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';

export default function QuizPage() {
  const { id } = useParams<{ id: string }>();
  return (
    <PagePlaceholder
      emoji="🧩"
      title={`Trắc nghiệm bài ${id ?? ''}`}
      description="Câu hỏi trắc nghiệm, chấm sao và màn hình kết quả sẽ xuất hiện ở đây (Giai đoạn 7)."
    >
      <Link className="font-semibold text-primary underline" to={`/lesson/${id ?? '1'}`}>
        Quay lại bài học
      </Link>
    </PagePlaceholder>
  );
}
