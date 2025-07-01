import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
