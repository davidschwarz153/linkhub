import { motion, AnimatePresence } from 'framer-motion';

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  linkName: string;
}

const DeleteModal = ({ isOpen, onClose, onConfirm, linkName }: DeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Hintergrund-Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-amazon-dark p-6 rounded-lg shadow-xl z-50 w-full max-w-md"
          >
            <h2 className="text-xl font-bold text-white mb-4">Link löschen</h2>
            <p className="text-gray-300 mb-6">
              Sind Sie sicher, dass Sie den Link <span className="font-semibold text-amazon-orange">{linkName}</span> löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.
            </p>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
              >
                Abbrechen
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
              >
                Löschen
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DeleteModal; 