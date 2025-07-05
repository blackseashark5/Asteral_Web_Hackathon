import React from 'react';
import { WifiOff, Download } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const OfflineIndicator: React.FC = () => {
  const { offlineMode } = useAppContext();

  return (
    <AnimatePresence>
      {offlineMode && (
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 bg-orange-600/90 backdrop-blur-md text-white px-6 py-3 rounded-lg shadow-lg border border-orange-500/30"
        >
          <div className="flex items-center space-x-3">
            <WifiOff className="w-5 h-5" />
            <span className="font-medium">You're offline</span>
            <div className="w-px h-4 bg-orange-300/50"></div>
            <div className="flex items-center space-x-2 text-sm">
              <Download className="w-4 h-4" />
              <span>Cached content available</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfflineIndicator;