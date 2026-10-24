import { Route, Routes } from 'react-router-dom';
import { ToastViewport } from '@/components/common/Toast';
import { Header } from '@/components/layout/Header';
import { useApplyTheme } from '@/hooks/useTheme';
import LessonPage from '@/routes/LessonPage';
import NotFoundPage from '@/routes/NotFoundPage';
import QuizPage from '@/routes/QuizPage';
import RoadmapPage from '@/routes/RoadmapPage';
import SettingsPage from '@/routes/SettingsPage';

export default function App() {
  useApplyTheme();

  return (
    <div className="min-h-screen bg-bg text-text">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-btn focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
      >
        Bỏ qua tới nội dung chính
      </a>
      <Header />
      <main id="main" className="mx-auto max-w-6xl px-4 pb-16">
        <Routes>
          <Route path="/" element={<RoadmapPage />} />
          <Route path="/lesson/:id" element={<LessonPage />} />
          <Route path="/lesson/:id/quiz" element={<QuizPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <ToastViewport />
    </div>
  );
}
