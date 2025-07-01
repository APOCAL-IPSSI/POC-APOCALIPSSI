import { useState } from 'react';
import { Link } from 'react-router-dom';

const HistoryPage = () => {
  // Exemple de données d'historique (dans une application réelle, ces données viendraient d'une API)
  const [historyItems, setHistoryItems] = useState([
    {
      id: 1,
      type: 'pdf',
      name: 'Rapport_Financier_2024.pdf',
      date: '15/06/2025',
      summary: 'Ce rapport financier présente une croissance de 15% du chiffre d\'affaires par rapport à l\'année précédente, avec une augmentation notable dans le secteur des énergies renouvelables. Les investissements en R&D ont augmenté de 8%, principalement dans les technologies d\'intelligence artificielle et de développement durable.'
    }
  ]);

  const handleDelete = (id) => {
    setHistoryItems(historyItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <header className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-white">Apocalipsii</h1>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-white hover:text-blue-300 transition">Accueil</Link></li>
              <li><Link to="/upload" className="text-white hover:text-blue-300 transition">Télécharger PDF</Link></li>
              <li><Link to="/text" className="text-white hover:text-blue-300 transition">Saisir Texte</Link></li>
              <li><Link to="/history" className="text-white hover:text-blue-300 transition">Historique</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Historique des Analyses</h2>
        
        {historyItems.length === 0 ? (
          <div className="text-center p-12 bg-white bg-opacity-5 backdrop-blur-sm rounded-xl border border-white border-opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <h3 className="text-2xl font-semibold text-white mb-2">Aucune analyse trouvée</h3>
            <p className="text-blue-200 mb-6">Commencez par télécharger un document ou saisir du texte à analyser.</p>
            <div className="flex justify-center space-x-4">
              <Link to="/upload" className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                Télécharger un PDF
              </Link>
              <Link to="/text" className="px-6 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition">
                Saisir du Texte
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {historyItems.map(item => (
              <div key={item.id} className="p-6 bg-white bg-opacity-5 backdrop-blur-sm rounded-xl border border-white border-opacity-10 hover:bg-opacity-10 transition">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-center mb-4 md:mb-0">
                    {item.type === 'pdf' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                    <div>
                      <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                      <p className="text-blue-300">Analysé le {item.date}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
                      Voir
                    </button>
                    <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition">
                      Télécharger
                    </button>
                    <button 
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition"
                      onClick={() => handleDelete(item.id)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-black bg-opacity-30 rounded-lg">
                  <h4 className="text-lg font-medium text-white mb-2">Résumé</h4>
                  <p className="text-blue-100">{item.summary}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="bg-black bg-opacity-30 py-8 mt-24">
        <div className="container mx-auto px-4">
          <p className="text-center text-blue-200">
            © {new Date().getFullYear()} Apocalipsii - Assistant Intelligent de Synthèse de Documents
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HistoryPage;
