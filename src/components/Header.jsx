import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Apocal'IPPSI</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link 
                to="/" 
                className={`${location.pathname === '/' ? 'text-blue-300' : 'text-white'} hover:text-blue-300 transition`}
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link 
                to="/upload" 
                className={`${location.pathname === '/upload' ? 'text-blue-300' : 'text-white'} hover:text-blue-300 transition`}
              >
                Télécharger PDF
              </Link>
            </li>
            <li>
              <Link 
                to="/text" 
                className={`${location.pathname === '/text' ? 'text-blue-300' : 'text-white'} hover:text-blue-300 transition`}
              >
                Saisir Texte
              </Link>
            </li>
            <li>
              <Link 
                to="/history" 
                className={`${location.pathname === '/history' ? 'text-blue-300' : 'text-white'} hover:text-blue-300 transition`}
              >
                Historique
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
