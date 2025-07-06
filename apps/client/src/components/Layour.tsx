import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
