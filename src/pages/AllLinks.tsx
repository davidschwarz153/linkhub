import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import LinkHub from '../components/LinkHub';
import { useLinks } from '../hooks/useLinks';

const AllLinks = () => {
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
        <LinkHub searchQuery="" />
      )}
    </MainLayout>
  );
};

export default AllLinks; 