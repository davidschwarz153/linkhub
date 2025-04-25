import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import LinkHub from '../components/LinkHub';
import { useLinks } from '../hooks/useLinks';

const OperationsDashboard = () => {
  const navigate = useNavigate();
  const { isLoading, openAllLinks } = useLinks();

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          className="btn-secondary"
        >
          Zurück zur Startseite
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={openAllLinks}
          className="btn-primary"
        >
          Alle Links öffnen
        </motion.button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amazon-orange"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <h2 className="text-xl font-bold text-amazon-orange mb-4">Operations Tools</h2>
            <LinkHub searchQuery="operations" />
          </div>
          <div className="card p-6">
            <h2 className="text-xl font-bold text-amazon-orange mb-4">Monitoring</h2>
            <LinkHub searchQuery="monitoring" />
          </div>
          <div className="card p-6">
            <h2 className="text-xl font-bold text-amazon-orange mb-4">Reports</h2>
            <LinkHub searchQuery="reports" />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default OperationsDashboard; 