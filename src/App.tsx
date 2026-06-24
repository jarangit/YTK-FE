import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import ErrorBoundary from './shared/components/atoms/ErrorBoundary';
import { useEffect } from 'react';
import AppHeader from './app/components/AppHeader';
import AppFooter from './app/components/AppFooter';
import HomePage from './features/home/HomePage';
import FeedPage from './features/feed/FeedPage';
import FeedDetailPage from './features/feed/FeedDetailPage';
import ResultPage from './features/result/ResultPage';
import LibraryPage from './features/library/LibraryPage';
import HistoryPage from './features/history/HistoryPage';
import AccountPage from './features/account/AccountPage';
import PodcastPage from './features/podcast/PodcastPage';
import StaticPage from './features/static/StaticPage';
import NotFoundPage from './features/static/NotFoundPage';
import { AuthProvider } from './shared/auth/AuthContext';
import SignInModal from './app/components/SignInModal';
import ProtectedRoute from './app/components/ProtectedRoute';
import { useAuth } from './shared/auth/AuthContext';

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const usesCollectionShell = location.pathname === '/library' || location.pathname === '/history';
  const { openSignInModal } = useAuth();

  useEffect(() => {
    if (!location.state || typeof location.state !== 'object' || !('openSignIn' in location.state)) {
      return;
    }

    if (location.state.openSignIn) {
      openSignInModal();
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate, openSignInModal]);

  return (
    <>
      {!usesCollectionShell && <AppHeader />}
      <ErrorBoundary>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<StaticPage pageKey="about" />} />
        <Route path="/contact" element={<StaticPage pageKey="contact" />} />
        <Route path="/help" element={<StaticPage pageKey="help" />} />
        <Route path="/privacy" element={<StaticPage pageKey="privacy" />} />
        <Route path="/terms" element={<StaticPage pageKey="terms" />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:id" element={<FeedDetailPage />} />
        <Route path="/podcast" element={<PodcastPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route
          path="/account"
          element={(
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/library"
          element={(
            <ProtectedRoute>
              <LibraryPage />
            </ProtectedRoute>
          )}
        />
        <Route
          path="/history"
          element={(
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          )}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </ErrorBoundary>
      {!usesCollectionShell && <AppFooter />}
      <SignInModal />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
