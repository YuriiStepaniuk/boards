import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layour';
import BoardsPage from './pages/BoardsPage';
import { route } from './types/route';
import BoardPage from './pages/BoardPage';
import NotFoundPage from './components/NotFound';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={route.BASE} element={<WelcomePage />} />
          <Route path={route.BOARDS} element={<BoardsPage />} />
          <Route path="/boards/:id" element={<BoardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
