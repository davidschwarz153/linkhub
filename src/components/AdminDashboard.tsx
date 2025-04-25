import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import BackgroundVideo from './BackgroundVideo';
import { Link } from '../services/api';

// Standorte für den Dropdown
const locations = [
  { group: 'EU 12', options: ['DUS4', 'FRA7', 'MUC3', 'PAD1', 'PAD2', 'SCN2', 'STR1'] },
  { group: 'EU 15', options: ['BRE2', 'BRE4', 'ERF1', 'HAM2', 'LEJ5', 'NEU1'] }
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [links, setLinks] = useState<Link[]>([]);
  const [newLink, setNewLink] = useState<Omit<Link, '_id'>>({
    name: '',
    url: '',
    category: 'link'
  });
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('FRA7');
  const [isLoading, setIsLoading] = useState(false);

  // Laden der Links vom Server
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/links');
        const data = await response.json();
        setLinks(data);
      } catch (err) {
        setError('Fehler beim Laden der Links');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []);

  // Standort im localStorage speichern
  useEffect(() => {
    localStorage.setItem('userLocation', selectedLocation);
  }, [selectedLocation]);

  // Funktion zum Ersetzen des Standorts in der URL
  const replaceLocationInUrl = (url: string) => {
    return url.replace(/FRA7|fra7/g, selectedLocation.toUpperCase());
  };

  // Authentifizierung
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'kingbobby') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Falsches Passwort');
      setPassword('');
    }
  };

  // Link hinzufügen
  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newLink.name && newLink.url) {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/links', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newLink),
        });
        const savedLink = await response.json();
        setLinks([...links, savedLink]);
        setNewLink({ name: '', url: '', category: 'link' });
      } catch (err) {
        setError('Fehler beim Hinzufügen des Links');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Link bearbeiten
  const handleEditLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLink) {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/api/links/${editingLink._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(editingLink),
        });
        const updatedLink = await response.json();
        setLinks(links.map(link => 
          link._id === updatedLink._id ? updatedLink : link
        ));
        setEditingLink(null);
      } catch (err) {
        setError('Fehler beim Aktualisieren des Links');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Link löschen
  const handleDeleteLink = async (id: string) => {
    if (window.confirm('Möchtest du diesen Link wirklich löschen?')) {
      try {
        setIsLoading(true);
        await fetch(`http://localhost:5000/api/links/${id}`, {
          method: 'DELETE',
        });
        setLinks(links.filter(link => link._id !== id));
      } catch (err) {
        setError('Fehler beim Löschen des Links');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Alle Links öffnen
  const openAllLinks = () => {
    links.forEach(link => {
      const modifiedUrl = replaceLocationInUrl(link.url);
      window.open(modifiedUrl, '_blank');
    });
  };

  return (
    <div className="min-h-screen relative">
      <BackgroundVideo />
      <div className="relative z-10 container mx-auto px-4 py-8">
        {!isAuthenticated ? (
          <motion.div 
            className="max-w-md mx-auto card p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold text-amazon-orange mb-6">Admin Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-amazon-text-secondary mb-2">
                  Passwort
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded bg-amazon-light/50 border border-white/10 
                           text-amazon-text focus:outline-none focus:ring-2 focus:ring-amazon-orange
                           placeholder-amazon-text-secondary"
                  placeholder="Geben Sie das Admin-Passwort ein"
                />
              </div>
              {error && (
                <motion.p 
                  className="text-red-500 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {error}
                </motion.p>
              )}
              <button
                type="submit"
                className="w-full btn-primary"
              >
                Einloggen
              </button>
              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-full btn-secondary mt-4"
              >
                Zurück zur Startseite
              </button>
            </form>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-amazon-orange">Admin Dashboard</h1>
              <button
                onClick={() => navigate('/')}
                className="btn-secondary"
              >
                Zurück zur Startseite
              </button>
            </div>
            
            {/* Standort-Auswahl */}
            <div className="bg-amazon-light p-6 rounded-lg shadow-lg mb-8">
              <h2 className="text-xl font-semibold mb-4">Standort auswählen</h2>
              <div className="flex items-center">
                <label htmlFor="adminLocation" className="mr-2 font-medium">Standort:</label>
                <select
                  id="adminLocation"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="bg-amazon-dark text-white p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                >
                  {locations.map((group) => (
                    <optgroup key={group.group} label={group.group}>
                      {group.options.map((location) => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                <button
                  onClick={openAllLinks}
                  className="ml-4 bg-amazon-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Alle Links öffnen
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-400">
                Der ausgewählte Standort wird in allen URLs verwendet, die "FRA7" oder "fra7" enthalten.
              </p>
            </div>

            {/* Link hinzufügen */}
            <div className="bg-amazon-light p-6 rounded-lg shadow-lg mb-8">
              <h2 className="text-xl font-semibold mb-4">Neuen Link hinzufügen</h2>
              <form onSubmit={handleAddLink} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={newLink.name}
                    onChange={(e) => setNewLink({...newLink, name: e.target.value})}
                    className="w-full p-2 rounded bg-amazon-dark border border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">URL</label>
                  <input
                    type="url"
                    value={newLink.url}
                    onChange={(e) => setNewLink({...newLink, url: e.target.value})}
                    className="w-full p-2 rounded bg-amazon-dark border border-gray-700 text-white"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Verwende "FRA7" oder "fra7" als Platzhalter für den Standort.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Kategorie</label>
                  <select
                    value={newLink.category}
                    onChange={(e) => setNewLink({...newLink, category: e.target.value as 'link' | 'tool'})}
                    className="w-full p-2 rounded bg-amazon-dark border border-gray-700 text-white"
                  >
                    <option value="link">Link</option>
                    <option value="tool">Tool</option>
                  </select>
                </div>
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    className="bg-amazon-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Wird gespeichert...' : 'Link hinzufügen'}
                  </button>
                </div>
              </form>
            </div>

            {/* Links bearbeiten */}
            <div className="bg-amazon-light p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Links verwalten</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2">Name</th>
                      <th className="text-left py-2">URL</th>
                      <th className="text-left py-2">Kategorie</th>
                      <th className="text-left py-2">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {links.map(link => (
                      <tr key={link._id} className="border-b border-gray-700">
                        {editingLink && editingLink._id === link._id ? (
                          <>
                            <td className="py-2">
                              <input
                                type="text"
                                value={editingLink.name}
                                onChange={(e) => setEditingLink({...editingLink, name: e.target.value})}
                                className="w-full p-1 rounded bg-amazon-dark border border-gray-700 text-white"
                              />
                            </td>
                            <td className="py-2">
                              <input
                                type="url"
                                value={editingLink.url}
                                onChange={(e) => setEditingLink({...editingLink, url: e.target.value})}
                                className="w-full p-1 rounded bg-amazon-dark border border-gray-700 text-white"
                              />
                            </td>
                            <td className="py-2">
                              <select
                                value={editingLink.category}
                                onChange={(e) => setEditingLink({...editingLink, category: e.target.value as 'link' | 'tool'})}
                                className="w-full p-1 rounded bg-amazon-dark border border-gray-700 text-white"
                              >
                                <option value="link">Link</option>
                                <option value="tool">Tool</option>
                              </select>
                            </td>
                            <td className="py-2">
                              <button
                                onClick={handleEditLink}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                                disabled={isLoading}
                              >
                                {isLoading ? 'Wird gespeichert...' : 'Speichern'}
                              </button>
                              <button
                                onClick={() => setEditingLink(null)}
                                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                                disabled={isLoading}
                              >
                                Abbrechen
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="py-2">{link.name}</td>
                            <td className="py-2">
                              <a 
                                href={replaceLocationInUrl(link.url)} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-amazon-orange hover:underline"
                              >
                                {link.url}
                              </a>
                            </td>
                            <td className="py-2">{link.category === 'link' ? 'Link' : 'Tool'}</td>
                            <td className="py-2">
                              <button
                                onClick={() => setEditingLink(link)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2"
                                disabled={isLoading}
                              >
                                Bearbeiten
                              </button>
                              <button
                                onClick={() => handleDeleteLink(link._id)}
                                className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                                disabled={isLoading}
                              >
                                Löschen
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard; 