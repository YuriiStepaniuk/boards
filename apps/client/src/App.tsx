import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layour';
import BoardsPage from './pages/BoardsPage';
import { route } from './types/route';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path={route.BASE}
            element={<Navigate to={route.BOARDS} replace />}
          />
          <Route path={route.BOARDS} element={<BoardsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
