import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/Layour';
import BoardsPage from './pages/BoardsPage';
import { route } from './types/route';
import BoardPage from './pages/BoardPage';
import NotFoundPage from './components/NotFound';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

export default App;
