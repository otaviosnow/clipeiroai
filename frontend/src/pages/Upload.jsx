// 📤 UPLOAD PAGE
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload as UploadIcon, File, X, Check } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { uploadAPI } from '../services/api';
import toast from 'react-hot-toast';

const Upload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    
    // Validar tamanho (2GB)
    if (selectedFile.size > 2 * 1024 * 1024 * 1024) {
      toast.error('Arquivo muito grande! Máximo 2GB por vídeo.');
      return;
    }

    setFile(selectedFile);
    toast.success('Vídeo selecionado!');
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    maxFiles: 1
  });

  const handleUpload = async () => {
    if (!file) {
      toast.error('Selecione um vídeo primeiro!');
      return;
    }

    setUploading(true);
    setProgress(0);

    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await uploadAPI.uploadVideo(formData, (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setProgress(percentCompleted);
      });

      toast.success('Vídeo enviado com sucesso!');
      
      // Redirecionar para página de clipes
      setTimeout(() => {
        navigate(`/clips?video=${response.data.media.id}`);
      }, 1500);

    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setProgress(0);
  };

  return (
    <div className="flex min-h-screen bg-clipeiro-black">
      <Sidebar />
      
      <div className="flex-1 ml-64">
        <Header 
          title="Upload de Vídeo"
          subtitle="Envie seu vídeo original para gerar clipes"
        />

        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            {/* Dropzone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card mb-8"
            >
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                  isDragActive
                    ? 'border-clipeiro-red bg-clipeiro-red/10'
                    : 'border-white/20 hover:border-clipeiro-red/50 hover:bg-white/5'
                }`}
              >
                <input {...getInputProps()} />
                
                {file ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-red rounded-full flex items-center justify-center">
                        <Check className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-bold mb-2">{file.name}</p>
                      <p className="text-gray-400">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                      className="btn-secondary inline-flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Remover
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center">
                      <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                        <UploadIcon className="w-10 h-10 text-clipeiro-red" />
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-bold mb-2">
                        {isDragActive ? 'Solte o vídeo aqui' : 'Arraste seu vídeo aqui'}
                      </p>
                      <p className="text-gray-400">
                        ou clique para selecionar (máx. 2GB)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Progress */}
            {uploading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="card mb-8"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Enviando vídeo...</span>
                    <span className="text-clipeiro-red font-bold">{progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-red"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Upload Button */}
            {file && !uploading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <button
                  onClick={handleUpload}
                  className="btn-primary w-full text-lg py-4"
                >
                  🚀 Enviar e Gerar Clipes
                </button>
              </motion.div>
            )}

            {/* Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-8 p-6 bg-white/5 rounded-xl border border-white/10"
            >
              <h3 className="font-bold mb-3">ℹ️ Informações</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>• Formatos aceitos: MP4, MOV, AVI, MKV</li>
                <li>• Tamanho máximo: 2GB por vídeo</li>
                <li>• Limite total: 6GB de storage</li>
                <li>• Após o upload, 10 clipes serão gerados automaticamente</li>
                <li>• Você poderá baixar ou publicar os clipes gerados</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
