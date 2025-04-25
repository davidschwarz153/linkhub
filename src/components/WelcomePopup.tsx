import React from 'react';
import { useTheme } from '../context/ThemeContext';

interface WelcomePopupProps {
  onClose: () => void;
}

export const WelcomePopup: React.FC<WelcomePopupProps> = ({ onClose }) => {
  const { theme } = useTheme();

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className={`relative p-6 rounded-lg shadow-lg max-w-md w-full mx-4 ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
      }`}>
        <h2 className="text-2xl font-bold mb-4">Willkommen!</h2>
        <p className="mb-4">
          Herzlich willkommen in der Operations-Dashboard-Anwendung. Hier können Sie Ihre Links verwalten und schnell auf wichtige Ressourcen zugreifen.
        </p>
        <button
          onClick={onClose}
          className={`px-4 py-2 rounded ${
            theme === 'dark' 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Verstanden
        </button>
      </div>
    </div>
  );
}; 