import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';
import { useProgressStore } from '@/store/progressStore';

export default function RoadmapPage() {
  const navigate = useNavigate();
  const currentLessonId = useProgressStore((s) => s.currentLessonId);

  return (
    <PagePlaceholder
      emoji="🗺️"
      title="Bản đồ lộ trình"
      description="16 trạm bài học chia thành 4 chặng sẽ xuất hiện ở đây (Giai đoạn 3)."
    >
      <Button onClick={() => navigate(`/lesson/${currentLessonId}`)}>Học tiếp bài {currentLessonId}</Button>
      <Button variant="secondary" onClick={() => navigate('/settings')}>
        Cài đặt
      </Button>
    </PagePlaceholder>
  );
}
