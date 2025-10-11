// ✂️ CLIPS PAGE
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Send, Trash2, Play } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { clipsAPI, postsAPI, uploadAPI } from '../services/api';
import toast from 'react-hot-toast';

const Clips = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get('video');
  
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [clips, setClips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    loadVideos();
  }, []);

  useEffect(() => {
    if (videoId) {
      loadClips(videoId);
    }
  }, [videoId]);

  const loadVideos = async () => {
    try {
      const response = await uploadAPI.getMyVideos('original');
      setVideos(response.data.videos);
      
      if (videoId) {
        const video = response.data.videos.find(v => v._id === videoId);
        setSelectedVideo(video);
      }
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadClips = async (vId) => {
    try {
      setGenerating(true);
      const response = await clipsAPI.getClipsByVideo(vId);
      
      if (response.data.clips.length === 0) {
        // Gerar clipes se não existirem
        await generateClips(vId);
      } else {
        setClips(response.data.clips);
      }
    } catch (error) {
      console.error('Error loading clips:', error);
    } finally {
      setGenerating(false);
    }
  };

  const generateClips = async (vId) => {
    try {
      setGenerating(true);
      toast.loading('Gerando 10 clipes...', { id: 'generating' });
      
      const response = await clipsAPI.generateClips({
        videoId: vId,
        overlayText: null,
        useFixedBackground: false
      });

      toast.success('Clipes sendo gerados! Aguarde...', { id: 'generating' });
      
      // Poll para verificar status
      const interval = setInterval(async () => {
        const clipsResponse = await clipsAPI.getClipsByVideo(vId);
        
        if (clipsResponse.data.clips.length > 0) {
          setClips(clipsResponse.data.clips);
          clearInterval(interval);
          toast.success('10 clipes gerados com sucesso!');
          setGenerating(false);
        }
      }, 5000);

    } catch (error) {
      console.error('Error generating clips:', error);
      setGenerating(false);
    }
  };

  const handleDownload = async (clipId) => {
    try {
      const response = await clipsAPI.downloadClip(clipId);
      window.open(response.data.downloadUrl, '_blank');
      toast.success('Download iniciado!');
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const handlePublish = async (clipId) => {
    // TODO: Modal para selecionar perfil
    toast.success('Funcionalidade de publicação em desenvolvimento');
  };

  return (
    <div className="flex min-h-screen bg-clipeiro-black">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header 
          title="Meus Clipes"
          subtitle="Gerencie seus clipes gerados"
        />

        <div className="p-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-clipeiro-red border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-gray-400">Carregando...</p>
            </div>
          ) : generating ? (
            <div className="text-center py-20">
              <div className="animate-spin w-12 h-12 border-4 border-clipeiro-red border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-xl font-bold mb-2">Gerando 10 clipes...</p>
              <p className="text-gray-400">Isso pode levar alguns minutos</p>
            </div>
          ) : clips.length > 0 ? (
            <div>
              {/* Original Video Info */}
              {selectedVideo && (
                <div className="card mb-6">
                  <h3 className="font-bold mb-2">Vídeo Original</h3>
                  <p className="text-gray-400">{selectedVideo.filename}</p>
                </div>
              )}

              {/* Clips Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clips.map((clip, index) => (
                  <motion.div
                    key={clip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card group"
                  >
                    {/* Video Preview */}
                    <div className="relative aspect-[9/16] bg-black rounded-lg mb-4 overflow-hidden">
                      <video
                        src={clip.url}
                        className="w-full h-full object-cover"
                        controls
                      />
                      <div className="absolute top-2 left-2 bg-clipeiro-red px-2 py-1 rounded text-xs font-bold">
                        Clipe #{clip.clipNumber}
                      </div>
                    </div>

                    {/* Info */}
                    <div className="mb-4">
                      <p className="font-medium mb-1">{clip.filename}</p>
                      <p className="text-sm text-gray-400">
                        {(clip.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownload(clip.id)}
                        className="flex-1 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
                      >
                        <Download className="w-4 h-4" />
                        Baixar
                      </button>
                      <button
                        onClick={() => handlePublish(clip.id)}
                        className="flex-1 bg-gradient-red hover:scale-105 px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all"
                      >
                        <Send className="w-4 h-4" />
                        Publicar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                <Scissors className="w-10 h-10 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Nenhum clipe ainda</h2>
              <p className="text-gray-400 mb-6">
                Faça upload de um vídeo para gerar clipes
              </p>
              <button
                onClick={() => navigate('/upload')}
                className="btn-primary"
              >
                📤 Fazer Upload
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clips;
