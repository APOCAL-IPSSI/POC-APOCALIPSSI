import { useState } from 'react';
import { Link } from 'react-router-dom';
import { uploadPDF } from '../services/api';
import Header from '../components/Header';
import Footer from '../components/Footer';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        alert('Veuillez sélectionner un fichier PDF');
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        alert('Veuillez sélectionner un fichier PDF');
      }
    }
  };

  const handleSubmit = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    
    try {
      console.log('Uploading file:', file.name, 'size:', file.size);
      const result = await uploadPDF(file);
      console.log('Upload successful, result:', result);
      setSummary(result.summary);
    } catch (err) {
      console.error('Upload failed with error:', err);
      if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
        setError('Impossible de se connecter au serveur. Vérifiez que le serveur backend est en cours d\'exécution.');
      } else {
        setError(err.message || 'Une erreur s\'est produite lors du traitement du document.');
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
          <h2 className="text-4xl font-bold text-center text-white mb-12">Télécharger un document PDF</h2>
          
          <div 
            className={`border-4 border-dashed ${dragOver ? 'border-blue-400' : 'border-gray-300'} rounded-lg p-12 flex flex-col items-center justify-center bg-white bg-opacity-5 backdrop-blur-sm transition-all`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            
            {file ? (
              <div className="text-center">
                <p className="text-xl font-medium text-white mb-2">Fichier sélectionné:</p>
                <p className="text-lg text-blue-300">{file.name}</p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-xl font-medium text-white mb-2">Glissez-déposez votre PDF ici</p>
                <p className="text-blue-300">ou</p>
              </div>
            )}
            
            <div className="mt-4">
              <label className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer">
                Parcourir
                <input 
                  type="file"
                  className="hidden"
                  accept=".pdf"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button 
              className={`px-8 py-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition ${(!file || loading) && 'opacity-50 cursor-not-allowed'}`}
              disabled={!file || loading}
              onClick={handleSubmit}
            >
              {loading ? 'Analyse en cours...' : 'Analyser le document'}
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

          <div className="mt-12 p-6 bg-white bg-opacity-5 backdrop-blur-sm rounded-xl border border-white border-opacity-10">
            <h3 className="text-2xl font-semibold text-white mb-4">Comment ça marche?</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                  <span className="text-white font-medium">1</span>
                </div>
                <p className="text-blue-100">Téléchargez votre document PDF (contrat, rapport, norme, etc.)</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                  <span className="text-white font-medium">2</span>
                </div>
                <p className="text-blue-100">Notre algorithme analyse votre document en quelques secondes</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mr-4">
                  <span className="text-white font-medium">3</span>
                </div>
                <p className="text-blue-100">Recevez une synthèse structurée ,des points clés et des suggestions d'actions.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UploadPage;
