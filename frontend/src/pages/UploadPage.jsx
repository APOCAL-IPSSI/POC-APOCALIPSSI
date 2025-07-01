import { useState } from 'react';
import { Link } from 'react-router-dom';

const UploadPage = () => {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);

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
              className={`px-8 py-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition ${!file && 'opacity-50 cursor-not-allowed'}`}
              disabled={!file}
            >
              Analyser le document
            </button>
          </div>

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
                <p className="text-blue-100">Recevez une synthèse structurée.</p>
              </div>
            </div>
          </div>
        </div>
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

export default UploadPage;
