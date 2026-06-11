import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import HomePage from './pages/HomePage';
import ResultPage from './pages/ResultPage';
import LibraryPage from './pages/LibraryPage';

function AppLayout() {
  const location = useLocation();
  const isLibrary = location.pathname === '/library';

  return (
    <>
      {!isLibrary && <AppHeader />}
      <Routes>
        <Route path="/" element={<HomePage />} />
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
