import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from '@/components/common/Toast';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';
import { getLesson } from '@/data/lessons';
import { useProgressStore } from '@/store/progressStore';
import NotFoundPage from './NotFoundPage';

/** Sends the learner back to the map when they open a locked lesson by URL. */
function LockedRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    toast('Hoàn thành bài trước để mở khoá nhé!', 'warning');
    navigate('/', { replace: true });
  }, [navigate]);
  return null;
}

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const lesson = getLesson(Number(id));
  const unlocked = useProgressStore((s) => (lesson ? s.isUnlocked(lesson.id) : false));

  if (!lesson) return <NotFoundPage />;
  if (!unlocked) return <LockedRedirect />;

  return (
    <PagePlaceholder
      emoji="📘"
      title={`Bài ${lesson.id}: ${lesson.title}`}
      description="Thầy Kotlin, giọng đọc và các bước bài học sẽ xuất hiện ở đây (Giai đoạn 5–6)."
    >
      <Link className="font-semibold text-primary underline" to={`/lesson/${lesson.id}/quiz`}>
        Sang trắc nghiệm
      </Link>
      <Link className="font-semibold text-primary underline" to="/">
        Về bản đồ
      </Link>
    </PagePlaceholder>
  );
}
