// 👑 ADMIN PAGE
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit, Eye, EyeOff } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { adminAPI, uploadAPI } from '../services/api';
import toast from 'react-hot-toast';

const Admin = () => {
  const [profiles, setProfiles] = useState([]);
  const [stats, setStats] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [newProfile, setNewProfile] = useState({
    userId: '',
    platform: 'tiktok',
    username: '',
    password: '',
    twoFactorSecret: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [profilesRes, statsRes] = await Promise.all([
        adminAPI.getProfiles(),
        adminAPI.getStats()
      ]);
      
      setProfiles(profilesRes.data.profiles);
      setStats(statsRes.data.stats);
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  const handleCreateProfile = async (e) => {
    e.preventDefault();
    
    try {
      await adminAPI.createProfile(newProfile);
      toast.success('Perfil criado com sucesso!');
      setShowModal(false);
      setNewProfile({
        userId: '',
        platform: 'tiktok',
        username: '',
        password: '',
        twoFactorSecret: ''
      });
      loadData();
    } catch (error) {
      console.error('Error creating profile:', error);
    }
  };

  const handleDeleteProfile = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este perfil?')) return;
    
    try {
      await adminAPI.deleteProfile(id);
      toast.success('Perfil deletado!');
      loadData();
    } catch (error) {
      console.error('Error deleting profile:', error);
    }
  };

  const handleUploadBackgrounds = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    
    for (const file of files) {
      formData.append('videos', file);
    }

    try {
      await uploadAPI.uploadBackgrounds(formData);
      toast.success(`${files.length} vídeos de background enviados!`);
    } catch (error) {
      console.error('Error uploading backgrounds:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-clipeiro-black">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header 
          title="Painel Admin"
          subtitle="Gerenciar perfis e sistema"
        />

        <div className="p-8">
          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="card">
                <p className="text-gray-400 text-sm">Usuários</p>
                <p className="text-3xl font-bold text-clipeiro-red">{stats.users}</p>
              </div>
              <div className="card">
                <p className="text-gray-400 text-sm">Perfis</p>
                <p className="text-3xl font-bold text-clipeiro-red">{stats.profiles}</p>
              </div>
              <div className="card">
                <p className="text-gray-400 text-sm">Backgrounds</p>
                <p className="text-3xl font-bold text-clipeiro-red">{stats.backgrounds}</p>
              </div>
              <div className="card">
                <p className="text-gray-400 text-sm">Posts Publicados</p>
                <p className="text-3xl font-bold text-clipeiro-red">{stats.posts?.published || 0}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setShowModal(true)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Criar Perfil
            </button>
            
            <label className="btn-secondary cursor-pointer flex items-center gap-2">
              <input
                type="file"
                multiple
                accept="video/*"
                onChange={handleUploadBackgrounds}
                className="hidden"
              />
              {uploading ? 'Enviando...' : '📹 Upload Backgrounds'}
            </label>
          </div>

          {/* Profiles Table */}
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Perfis de Corte</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4">Username</th>
                    <th className="text-left py-3 px-4">Plataforma</th>
                    <th className="text-left py-3 px-4">Posts</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {profiles.map((profile) => (
                    <tr key={profile._id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="py-3 px-4">@{profile.username}</td>
                      <td className="py-3 px-4 capitalize">{profile.platform}</td>
                      <td className="py-3 px-4">{profile.postsCount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${
                          profile.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {profile.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => handleDeleteProfile(profile._id)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Create Profile */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass max-w-md w-full p-6 rounded-xl mx-4"
          >
            <h2 className="text-xl font-bold mb-4">Criar Perfil de Corte</h2>
            
            <form onSubmit={handleCreateProfile} className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Username</label>
                <input
                  type="text"
                  value={newProfile.username}
                  onChange={(e) => setNewProfile({...newProfile, username: e.target.value})}
                  required
                  className="input w-full"
                  placeholder="@usuario"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Senha</label>
                <input
                  type="password"
                  value={newProfile.password}
                  onChange={(e) => setNewProfile({...newProfile, password: e.target.value})}
                  required
                  className="input w-full"
                  placeholder="Senha do perfil"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">2FA Secret (opcional)</label>
                <input
                  type="text"
                  value={newProfile.twoFactorSecret}
                  onChange={(e) => setNewProfile({...newProfile, twoFactorSecret: e.target.value})}
                  className="input w-full"
                  placeholder="ABCD1234..."
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button type="submit" className="btn-primary flex-1">
                  Criar
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Admin;
