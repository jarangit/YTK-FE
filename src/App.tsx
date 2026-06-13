import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AppHeader from './shared/components/AppHeader';
import HomePage from './features/home/HomePage';
import FeedPage from './features/feed/FeedPage';
import FeedDetailPage from './features/feed/FeedDetailPage';
import ResultPage from './features/result/ResultPage';
import LibraryPage from './features/library/LibraryPage';
import { AuthProvider } from './shared/auth/AuthContext';
import SignInModal from './shared/components/organisms/SignInModal';
import ProtectedRoute from './shared/components/organisms/ProtectedRoute';
import { useAuth } from './shared/auth/AuthContext';

function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLibrary = location.pathname === '/library';
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
      {!isLibrary && <AppHeader />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:id" element={<FeedDetailPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route
          path="/library"
          element={(
            <ProtectedRoute>
              <LibraryPage />
            </ProtectedRoute>
          )}
        />
      </Routes>
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
