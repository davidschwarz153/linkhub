import { ReactNode } from 'react';
import BackgroundVideo from '../components/BackgroundVideo';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen relative">
      <BackgroundVideo />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default MainLayout; 