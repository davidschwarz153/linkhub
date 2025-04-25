import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import { useLinks } from '../hooks/useLinks';

const Home = () => {
  const navigate = useNavigate();
  const { location, setLocation, openAllLinks, links } = useLinks();
  const [showPopupModal, setShowPopupModal] = useState(true);

  // Standorte für den Dropdown
  const locations = [
    { group: 'EU 12', options: ['DUS4', 'FRA7', 'MUC3', 'PAD1', 'PAD2', 'SCN2', 'STR1'] },
    { group: 'EU 15', options: ['BRE2', 'BRE4', 'ERF1', 'HAM2', 'LEJ5', 'NEU1'] }
  ];

  // Links nach Kategorie gruppieren
  const linksByCategory = links.reduce((acc, link) => {
    if (!acc[link.category]) {
      acc[link.category] = [];
    }
    acc[link.category].push(link);
    return acc;
  }, {} as Record<string, typeof links>);

  // Test-Pop-ups öffnen, um die Chrome-Pop-up-Blocker-Meldung auszulösen
  const triggerPopupBlocker = () => {
    // Öffne mehrere Pop-ups nacheinander, um den Pop-up-Blocker zu testen
    const testUrls = [
      'https://www.google.com',
      'https://www.amazon.com',
      'https://www.youtube.com',
      'https://www.github.com'
    ];
    
    testUrls.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, '_blank', 'width=500,height=500');
      }, index * 100); // Kleine Verzögerung zwischen den Öffnungen
    });
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Standort-Auswahl */}
        <div className="bg-amazon-light p-4 sm:p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-lg sm:text-xl font-semibold mb-4">Standort auswählen</h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center w-full sm:w-auto">
              <label htmlFor="location" className="mr-2 font-medium whitespace-nowrap">Standort:</label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-amazon-dark text-white p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amazon-orange w-full sm:w-auto"
              >
                {locations.map((group) => (
                  <optgroup key={group.group} label={group.group}>
                    {group.options.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={openAllLinks}
                className="bg-amazon-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors flex-1 sm:flex-none"
              >
                Alle Links öffnen
              </button>
              <motion.button
                onClick={() => navigate('/admin')}
                className="bg-amazon-dark hover:bg-amazon-dark/90 text-white font-bold py-2 px-4 rounded transition-colors flex-1 sm:flex-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Admin
              </motion.button>
            </div>
          </div>
        </div>

        {/* Links anzeigen */}
        {Object.keys(linksByCategory).length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(linksByCategory).map(([category, categoryLinks], index) => (
              <motion.div
                key={category}
                className="bg-amazon-light p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-amazon-orange mb-6 capitalize">{category}</h2>
                <div className="space-y-4">
                  {categoryLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url.replace(/FRA7|fra7/g, location.toUpperCase())}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">Keine Links vorhanden. Bitte fügen Sie Links im Admin-Bereich hinzu.</p>
          </div>
        )}
      </div>

      {/* Pop-up Anleitung Modal */}
      {showPopupModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-amazon-light p-6 rounded-lg shadow-lg w-full max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-amazon-orange mb-4">Wichtige Information</h2>
            <div className="space-y-4">
              <p>
                Um alle Links gleichzeitig öffnen zu können, müssen Sie Pop-ups für diese Website erlauben.
              </p>
              <div className="bg-amazon-dark p-4 rounded-lg">
                <h3 className="font-semibold mb-2">So aktivieren Sie Pop-ups:</h3>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Klicken Sie auf das Schloss-Symbol in der Adressleiste</li>
                  <li>Wählen Sie "Website-Einstellungen"</li>
                  <li>Ändern Sie "Pop-ups und Weiterleitungen" auf "Zulassen"</li>
                  <li>Laden Sie die Seite neu</li>
                </ol>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={triggerPopupBlocker}
                  className="w-full bg-amazon-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Test-Pop-ups öffnen (löst Pop-up-Blocker-Meldung aus)
                </button>
                <button
                  onClick={() => setShowPopupModal(false)}
                  className="w-full bg-amazon-dark hover:bg-amazon-dark/90 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Verstanden
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </MainLayout>
  );
};

export default Home; 