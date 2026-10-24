import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/common/Button';
import { PagePlaceholder } from '@/components/layout/PagePlaceholder';

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <PagePlaceholder
      emoji="🤔"
      title="Ơ, trang này không tồn tại"
      description="Thầy tìm mãi không thấy trang em cần. Mình quay về bản đồ nhé!"
    >
      <Button onClick={() => navigate('/')}>Về bản đồ</Button>
    </PagePlaceholder>
  );
}
