const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-30 py-8 mt-24">
      <div className="container mx-auto px-4">
        <p className="text-center text-blue-200">
          © {new Date().getFullYear()} Apocalipsii - Assistant Intelligent de Synthèse de Documents
        </p>
      </div>
    </footer>
  );
};

export default Footer;
