// 🏠 DASHBOARD PAGE
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Scissors, TrendingUp, Users } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { analyticsAPI } from '../services/api';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await analyticsAPI.getDashboard();
      setStats(response.data.dashboard);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      icon: Video,
      label: 'Total de Posts',
      value: stats?.postStats?.total || 0,
      color: 'from-clipeiro-red to-clipeiro-red-dark'
    },
    {
      icon: Scissors,
      label: 'Clipes Gerados',
      value: stats?.totals?.views || 0,
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: TrendingUp,
      label: 'Total Views',
      value: stats?.totals?.views?.toLocaleString() || '0',
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: Users,
      label: 'Perfis Ativos',
      value: stats?.activeProfiles || 0,
      color: 'from-green-500 to-green-700'
    }
  ];

  return (
    <div className="flex min-h-screen bg-clipeiro-black">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header 
          title={`Olá, ${user?.name}! 👋`}
          subtitle="Bem-vindo ao Clipeiro"
        />

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card hover:scale-105"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="card mb-8"
          >
            <h2 className="text-xl font-bold mb-4">Ações Rápidas</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => window.location.href = '/upload'}
                className="btn-primary"
              >
                📤 Upload Vídeo
              </button>
              <button
                onClick={() => window.location.href = '/clips'}
                className="btn-secondary"
              >
                ✂️ Ver Clipes
              </button>
              <button
                onClick={() => window.location.href = '/analytics'}
                className="btn-secondary"
              >
                📊 Analytics
              </button>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="card"
          >
            <h2 className="text-xl font-bold mb-4">Atividade Recente</h2>
            
            {loading ? (
              <div className="text-center py-8 text-gray-400">
                Carregando...
              </div>
            ) : stats?.topPosts?.length > 0 ? (
              <div className="space-y-3">
                {stats.topPosts.map((post, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all"
                  >
                    <div>
                      <p className="font-medium">Post #{index + 1}</p>
                      <p className="text-sm text-gray-400">
                        @{post.profileId?.username || 'N/A'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-clipeiro-red">{post.views?.toLocaleString()} views</p>
                      <p className="text-sm text-gray-400">{post.likes} likes</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p>Nenhuma atividade ainda</p>
                <p className="text-sm mt-2">Comece fazendo upload de um vídeo!</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
