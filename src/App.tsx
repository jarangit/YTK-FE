import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AppHeader from './shared/components/AppHeader';
import HomePage from './features/home/HomePage';
import FeedPage from './features/feed/FeedPage';
import ResultPage from './features/result/ResultPage';
import LibraryPage from './features/library/LibraryPage';

function AppLayout() {
  const location = useLocation();
  const isLibrary = location.pathname === '/library';

  return (
    <>
      {!isLibrary && <AppHeader />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/library" element={<LibraryPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
