import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import { useLinks } from '../hooks/useLinks';
import DeleteModal from '../components/DeleteModal';
import { Link } from '../types';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { links, addLink, editLink, deleteLink, isLoading, error } = useLinks();
  const [newLink, setNewLink] = useState<Omit<Link, 'id' | 'created_at' | 'updated_at'>>({
    name: '',
    url: '',
    category: 'link'
  });
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [isAddingLink, setIsAddingLink] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [linkToDelete, setLinkToDelete] = useState<Link | null>(null);

  // Kategorien für den Dropdown
  const categories = ['link', 'tool', 'resource'];

  // Formular zurücksetzen
  const resetForm = () => {
    setNewLink({
      name: '',
      url: '',
      category: 'link'
    });
    setEditingLink(null);
    setIsAddingLink(false);
    setIsEditing(false);
  };

  // Link hinzufügen
  const handleAddLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingLink(true);
    
    try {
      await addLink(newLink);
      resetForm();
    } finally {
      setIsAddingLink(false);
    }
  };

  // Link bearbeiten
  const handleEditLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLink) return;
    
    setIsEditing(true);
    
    try {
      await editLink(editingLink);
      resetForm();
    } finally {
      setIsEditing(false);
    }
  };

  // Link zum Bearbeiten auswählen
  const selectLinkForEdit = (link: Link) => {
    setEditingLink(link);
    setIsEditing(true);
  };

  // Link zum Löschen auswählen
  const selectLinkForDelete = (link: Link) => {
    setLinkToDelete(link);
    setDeleteModalOpen(true);
  };

  // Link löschen bestätigen
  const confirmDelete = async () => {
    if (!linkToDelete) return;
    
    try {
      await deleteLink(linkToDelete.id);
      setDeleteModalOpen(false);
      setLinkToDelete(null);
    } catch (error) {
      console.error('Fehler beim Löschen des Links:', error);
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-4 sm:py-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
          <motion.button
            onClick={() => navigate('/')}
            className="w-full sm:w-auto bg-amazon-dark hover:bg-amazon-dark/90 text-white font-bold py-2 px-4 rounded transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Zurück zur Startseite
          </motion.button>
        </div>

        {/* Fehleranzeige */}
        {error && (
          <div className="bg-red-500/20 border border-red-500 p-4 rounded-lg shadow-lg mb-4">
            <h2 className="text-lg font-semibold mb-2 text-red-500">Fehler</h2>
            <p className="text-red-500 break-words">{error}</p>
          </div>
        )}

        {/* Link hinzufügen */}
        <div className="bg-amazon-light p-4 sm:p-6 rounded-lg shadow-lg mb-6 sm:mb-8">
          <h2 className="text-xl font-bold text-white mb-4">Neuen Link hinzufügen</h2>
          <form onSubmit={handleAddLink} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newLink.name}
                  onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                  className="w-full bg-amazon-dark text-white p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                  required
                />
              </div>
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-300 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  id="url"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="w-full bg-amazon-dark text-white p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-300 mb-1">
                Kategorie
              </label>
              <select
                id="category"
                value={newLink.category}
                onChange={(e) => setNewLink({ ...newLink, category: e.target.value })}
                className="w-full bg-amazon-dark text-white p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isAddingLink}
                className="w-full sm:w-auto bg-amazon-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAddingLink ? 'Wird hinzugefügt...' : 'Link hinzufügen'}
              </button>
            </div>
          </form>
        </div>

        {/* Link bearbeiten */}
        {editingLink && (
          <div className="bg-amazon-light p-4 sm:p-6 rounded-lg shadow-lg mb-6 sm:mb-8">
            <h2 className="text-xl font-bold text-white mb-4">Link bearbeiten</h2>
            <form onSubmit={handleEditLink} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit-name" className="block text-sm font-medium text-gray-300 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="edit-name"
                    value={editingLink.name}
                    onChange={(e) => setEditingLink({ ...editingLink, name: e.target.value })}
                    className="w-full bg-amazon-dark text-white p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="edit-url" className="block text-sm font-medium text-gray-300 mb-1">
                    URL
                  </label>
                  <input
                    type="url"
                    id="edit-url"
                    value={editingLink.url}
                    onChange={(e) => setEditingLink({ ...editingLink, url: e.target.value })}
                    className="w-full bg-amazon-dark text-white p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="edit-category" className="block text-sm font-medium text-gray-300 mb-1">
                  Kategorie
                </label>
                <select
                  id="edit-category"
                  value={editingLink.category}
                  onChange={(e) => setEditingLink({ ...editingLink, category: e.target.value })}
                  className="w-full bg-amazon-dark text-white p-2 rounded border border-gray-700 focus:outline-none focus:ring-2 focus:ring-amazon-orange"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  disabled={isEditing}
                  className="w-full sm:w-auto bg-amazon-orange hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isEditing ? 'Wird gespeichert...' : 'Änderungen speichern'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Links anzeigen */}
        <div className="bg-amazon-light p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-white mb-4">Vorhandene Links</h2>
          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Lade Links...</p>
            </div>
          ) : links.length > 0 ? (
            <div className="overflow-x-auto -mx-4 sm:mx-0">
              <div className="min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          URL
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Kategorie
                        </th>
                        <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">
                          Aktionen
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {links.map((link) => (
                        <tr key={link.id} className="hover:bg-white/5">
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-white">
                            {link.name}
                          </td>
                          <td className="hidden sm:table-cell px-6 py-4 whitespace-nowrap text-sm text-white">
                            <a
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-amazon-orange hover:underline"
                            >
                              {link.url}
                            </a>
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-white capitalize">
                            {link.category}
                          </td>
                          <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
                              <button
                                onClick={() => selectLinkForEdit(link)}
                                className="text-blue-400 hover:text-blue-300"
                              >
                                Bearbeiten
                              </button>
                              <button
                                onClick={() => selectLinkForDelete(link)}
                                className="text-red-400 hover:text-red-300"
                              >
                                Löschen
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">Keine Links vorhanden. Fügen Sie einen Link hinzu.</p>
            </div>
          )}
        </div>
      </div>

      {/* Lösch-Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        linkName={linkToDelete?.name || ''}
      />
    </MainLayout>
  );
};

export default AdminDashboard; 