import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { Link } from '../types';
import { useLinks } from '../hooks/useLinks';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { links, setLinks } = useLinks();
  const [newLink, setNewLink] = useState<Omit<Link, 'id'>>({
    name: '',
    url: '',
    category: 'link'
  });
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
  const handleAddLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (newLink.name && newLink.url) {
      const linkWithId = {
        ...newLink,
        id: Date.now().toString()
      };
      setLinks([...links, linkWithId]);
      setNewLink({ name: '', url: '', category: 'link' });
    }
  };

  // Link bearbeiten
  const handleEditLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingLink) {
      setLinks(links.map(link => 
        link.id === editingLink.id ? editingLink : link
      ));
      setEditingLink(null);
    }
  };

  // Link löschen
  const handleDeleteLink = (id: string) => {
    if (window.confirm('Möchtest du diesen Link wirklich löschen?')) {
      setLinks(links.filter(link => link.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="max-w-md mx-auto bg-amazon-light p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Passwort
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 rounded bg-amazon-dark border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                />
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm"
                >
                  {error}
                </motion.p>
              )}
              <button
                type="submit"
                className="w-full bg-amazon-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Einloggen
              </button>
            </form>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-amazon-dark hover:bg-amazon-dark/90 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Zurück zur Startseite
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Link hinzufügen */}
          <div className="bg-amazon-light p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Neuen Link hinzufügen</h2>
            <form onSubmit={handleAddLink} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newLink.name}
                  onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                  className="w-full p-2 rounded bg-amazon-dark border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                  required
                />
              </div>
              <div>
                <label htmlFor="url" className="block text-sm font-medium mb-2">
                  URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="w-full p-2 rounded bg-amazon-dark border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                  required
                />
                <p className="mt-1 text-xs text-gray-400">
                  Verwenden Sie "FRA7" oder "fra7" in der URL als Platzhalter für den Standort. Dieser wird automatisch durch den ausgewählten Standort ersetzt.
                </p>
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-2">
                  Kategorie
                </label>
                <select
                  id="category"
                  value={newLink.category}
                  onChange={(e) => setNewLink({ ...newLink, category: e.target.value as 'link' | 'tool' })}
                  className="w-full p-2 rounded bg-amazon-dark border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                >
                  <option value="link">Link</option>
                  <option value="tool">Tool</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-amazon-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Link hinzufügen
              </button>
            </form>
          </div>

          {/* Links verwalten */}
          <div className="bg-amazon-light p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Links verwalten</h2>
            <div className="space-y-4">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="bg-amazon-dark p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{link.name}</h3>
                    <p className="text-sm text-gray-400 truncate">{link.url}</p>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => setEditingLink(link)}
                      className="bg-amazon-orange hover:bg-orange-600 text-white font-bold py-1 px-3 rounded transition-colors flex-1 sm:flex-none text-sm"
                    >
                      Bearbeiten
                    </button>
                    <button
                      onClick={() => handleDeleteLink(link.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded transition-colors flex-1 sm:flex-none text-sm"
                    >
                      Löschen
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Link bearbeiten Modal */}
        {editingLink && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
            <div className="bg-amazon-light p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Link bearbeiten</h2>
              <form onSubmit={handleEditLink} className="space-y-4">
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="edit-name"
                    value={editingLink.name}
                    onChange={(e) => setEditingLink({ ...editingLink, name: e.target.value })}
                    className="w-full p-2 rounded bg-amazon-dark border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="edit-url" className="block text-sm font-medium mb-2">
                    URL
                  </label>
                  <input
                    type="url"
                    id="edit-url"
                    value={editingLink.url}
                    onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                    className="w-full p-2 rounded bg-amazon-dark border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="edit-category" className="block text-sm font-medium mb-2">
                    Kategorie
                  </label>
                  <select
                    id="edit-category"
                    value={editingLink.category}
                    onChange={(e) => setEditingLink({ ...editingLink, category: e.target.value as 'link' | 'tool' })}
                    className="w-full p-2 rounded bg-amazon-dark border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                  >
                    <option value="link">Link</option>
                    <option value="tool">Tool</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-amazon-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    Speichern
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingLink(null)}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors"
                  >
                    Abbrechen
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default AdminDashboard; 