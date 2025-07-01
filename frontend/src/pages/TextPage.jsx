import { useState } from 'react';
import { Link } from 'react-router-dom';
import { processText } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TextPage = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Processing text with length:', text.length);
      const result = await processText(text);
      console.log('Text processing successful, result:', result);
      setSummary(result.summary);
    } catch (err) {
      console.error('Text processing failed with error:', err);
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError('Impossible de se connecter au serveur. Vérifiez que le serveur backend est en cours d\'exécution.');
      } else {
        setError(err.message || 'Une erreur s\'est produite lors du traitement du texte.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Header />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-white mb-12">Saisir du texte</h2>
          
          <div className="p-6 bg-white bg-opacity-5 backdrop-blur-sm rounded-xl border border-white border-opacity-10">
            <textarea
              className="w-full h-64 p-4 bg-black bg-opacity-20 text-white border border-gray-600 rounded-lg focus:border-blue-400 focus:outline-none"
              placeholder="Saisissez ou collez votre texte ici..."
              value={text}
              onChange={handleTextChange}
            ></textarea>
            
            <div className="mt-6 text-center">
              <button 
                className={`px-8 py-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition ${(!text.trim() || loading) && 'opacity-50 cursor-not-allowed'}`}
                disabled={!text.trim() || loading}
                onClick={handleSubmit}
              >
                {loading ? 'Analyse en cours...' : 'Analyser le texte'}
              </button>
            </div>
            
            {error && (
              <div className="mt-6 p-4 bg-red-500 bg-opacity-20 border border-red-400 text-red-100 rounded-lg">
                {error}
              </div>
            )}
            
            {summary && (
              <div className="mt-8 p-6 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl border border-white border-opacity-10">
                <h3 className="text-2xl font-semibold text-white mb-4">Résultats d'analyse</h3>
                <div className="text-blue-100 whitespace-pre-line">
                  {summary}
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 p-6 bg-white bg-opacity-5 backdrop-blur-sm rounded-xl border border-white border-opacity-10">
            <h3 className="text-2xl font-semibold text-white mb-4">Types de texte supportés</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-blue-100">Contrats</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-blue-100">Rapports financiers</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-blue-100">Documents juridiques</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-blue-100">Normes réglementaires</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-blue-100">Communications d'entreprise</p>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-blue-100">Articles techniques</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TextPage;
