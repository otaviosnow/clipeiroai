// 🎯 HEADER COMPONENT
import { Bell, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import useAuth from '../hooks/useAuth';

const Header = ({ title, subtitle }) => {
  const { user } = useAuth();

  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-clipeiro-gray/50 border-b border-white/10 px-8 py-6"
    >
      <div className="flex justify-between items-center">
        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          {subtitle && (
            <p className="text-gray-400 mt-1">{subtitle}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Storage Indicator */}
          {user && (
            <div className="glass px-4 py-2 rounded-lg">
              <div className="flex items-center gap-2">
                <div className="text-sm">
                  <span className="text-gray-400">Storage:</span>
                  <span className="ml-2 text-white font-semibold">
                    {((user.storageUsed / 1024 / 1024 / 1024).toFixed(2))}GB
                  </span>
                  <span className="text-gray-400"> / 6GB</span>
                </div>
                <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-red transition-all"
                    style={{ width: `${(user.storageUsed / user.storageLimit) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          <button className="glass p-3 rounded-lg hover:bg-white/5 transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-clipeiro-red rounded-full animate-pulse" />
          </button>

          {/* Settings */}
          <button className="glass p-3 rounded-lg hover:bg-white/5 transition-all">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;
