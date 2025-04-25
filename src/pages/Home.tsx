import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { useLinks } from '../hooks/useLinks';

const Home = () => {
  const navigate = useNavigate();
  const { location, setLocation, openAllLinks, links } = useLinks();

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
                      key={link._id}
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
    </MainLayout>
  );
};

export default Home; 