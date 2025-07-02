import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
      <Header />

      <main className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-5xl font-bold text-white leading-tight mb-6">
              Assistant Intelligent de Synthèse de Documents
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Téléchargez vos documents PDF ou saisissez du texte pour obtenir instantanément une synthèse structurée ,des points clés et des suggestions d'actions.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/upload" 
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition text-center"
              >
                Télécharger un PDF
              </Link>
              <Link 
                to="/text" 
                className="px-8 py-4 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition text-center"
              >
                Saisir du Texte
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="w-full max-w-lg p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-xl shadow-2xl border border-white border-opacity-20">
              <div className="p-4 bg-gradient-to-r from-blue-800 to-purple-800 rounded-lg shadow-inner mb-4"></div>
              <div className="h-10 w-3/4 bg-blue-500 bg-opacity-40 rounded mb-3"></div>
              <div className="h-4 w-full bg-white bg-opacity-20 rounded mb-2"></div>
              <div className="h-4 w-5/6 bg-white bg-opacity-20 rounded mb-2"></div>
              <div className="h-4 w-4/6 bg-white bg-opacity-20 rounded mb-4"></div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="h-8 bg-blue-600 rounded"></div>
                <div className="h-8 bg-purple-600 rounded"></div>
                <div className="h-8 bg-indigo-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h3 className="text-3xl font-bold text-center text-white mb-12">Fonctionnalités</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white bg-opacity-5 backdrop-blur-sm rounded-xl border border-white border-opacity-10 hover:bg-opacity-10 transition">
              <div className="w-16 h-16 bg-blue-600 rounded-full mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Analyse de PDF</h4>
              <p className="text-blue-100">Téléchargez vos documents PDF pour une analyse complète et une synthèse détaillée.</p>
            </div>
            <div className="p-6 bg-white bg-opacity-5 backdrop-blur-sm rounded-xl border border-white border-opacity-10 hover:bg-opacity-10 transition">
              <div className="w-16 h-16 bg-purple-600 rounded-full mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Saisie de Texte</h4>
              <p className="text-blue-100">Entrez directement votre texte pour obtenir une analyse instantanée sans avoir besoin d'un fichier.</p>
            </div>
            <div className="p-6 bg-white bg-opacity-5 backdrop-blur-sm rounded-xl border border-white border-opacity-10 hover:bg-opacity-10 transition">
              <div className="w-16 h-16 bg-indigo-600 rounded-full mb-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Historique</h4>
              <p className="text-blue-100">Accédez à vos analyses précédentes et gérez facilement votre historique de documents.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
