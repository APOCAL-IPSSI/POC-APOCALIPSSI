import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getHistory, deleteHistoryItem } from '../services/api';

const HistoryPage = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setHistoryItems(data);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch history:', err);
        setError('Impossible de charger l\'historique des documents');
        setLoading(false);
      }
    };
    
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    setDeleteLoading(true);
    try {
      await deleteHistoryItem(id);
      setHistoryItems(historyItems.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to delete document:', err);
      alert('Erreur lors de la suppression du document');
    } finally {
      setDeleteLoading(false);
    }
  };
  
  const handleView = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };
  
  const handleDownload = (item) => {
    // Create a text file with the summary content
    const element = document.createElement('a');
    const file = new Blob([item.summary], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    
    let filename = item.name;
    if (item.type === 'pdf') {
      filename = filename.replace(/\.pdf$/i, '') + '_resume.txt';
    } else {
      filename = filename + '_resume.txt';
    }
    
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const closeModal = () => {
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Historique des Analyses</h2>
        
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-300"></div>
          </div>
        ) : error ? (
          <div className="p-6 bg-red-500 bg-opacity-20 border border-red-400 text-red-100 rounded-lg text-center">
            {error}
          </div>
        ) : historyItems.length === 0 ? (
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
                    <button 
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                      onClick={() => handleView(item)}
                    >
                      Voir
                    </button>
                    <button 
                      className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                      onClick={() => handleDownload(item)}
                    >
                      Télécharger
                    </button>
                    <button 
                      className={`px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition ${deleteLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                      onClick={() => handleDelete(item.id)}
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? 'Suppression...' : 'Supprimer'}
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

      <Footer />

      {modalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999] p-4" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0}}>
          <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 rounded-xl border border-white border-opacity-20 w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white border-opacity-10 flex justify-between items-center">
              <h3 className="text-2xl font-semibold text-white">{selectedItem.name}</h3>
              <button 
                onClick={closeModal}
                className="text-white hover:text-blue-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col md:flex-row flex-grow overflow-auto">
              {/* Left panel: PDF or Raw Text */}
              <div className="md:w-1/2 p-6 flex flex-col">
                <h4 className="text-xl font-semibold text-white mb-4">
                  {selectedItem.type === 'pdf' ? 'Document PDF' : 'Texte Original'}
                </h4>
                {selectedItem.type === 'pdf' ? (
                  <iframe 
                    src={`http://localhost:3000${selectedItem.filePath}`} 
                    className="flex-grow bg-white rounded-lg w-full"
                    style={{ height: '70vh' }}
                    title="PDF Viewer"
                  ></iframe>
                ) : (
                  <div className="bg-black bg-opacity-30 p-4 rounded-lg flex-grow" style={{ 
                    maxHeight: '70vh', 
                    overflowY: 'auto', 
                    display: 'block'
                  }}>
                    <p className="text-blue-100 whitespace-pre-wrap">{selectedItem.rawText}</p>
                  </div>
                )}
              </div>
              
              <div className="md:w-1/2 p-6 border-t md:border-t-0 md:border-l border-white border-opacity-10 flex flex-col">
                <h4 className="text-xl font-semibold text-white mb-4">Résumé</h4>
                <div className="bg-black bg-opacity-30 p-4 rounded-lg flex-grow" style={{ 
                  maxHeight: '70vh', 
                  overflowY: 'auto',
                  display: 'block'
                }}>
                  <p className="text-blue-100 whitespace-pre-wrap">{selectedItem.summary}</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-white border-opacity-10 flex justify-end">
              <button 
                onClick={closeModal}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
