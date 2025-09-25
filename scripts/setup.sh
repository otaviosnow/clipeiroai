#!/bin/bash

echo "🚀 Configurando Clipeiro..."

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale Node.js 18+ primeiro."
    exit 1
fi

# Verificar se MongoDB está instalado
if ! command -v mongod &> /dev/null; then
    echo "⚠️  MongoDB não encontrado. Instale MongoDB ou use MongoDB Atlas."
fi

# Verificar se FFmpeg está instalado
if ! command -v ffmpeg &> /dev/null; then
    echo "⚠️  FFmpeg não encontrado. Instale FFmpeg para processamento de vídeo."
fi

# Instalar dependências
echo "📦 Instalando dependências..."
npm install

# Criar diretórios necessários
echo "📁 Criando diretórios..."
mkdir -p uploads/videos
mkdir -p uploads/backgrounds

# Copiar arquivo de ambiente
if [ ! -f .env.local ]; then
    echo "⚙️  Criando arquivo de configuração..."
    cp .env.example .env.local
    echo "✅ Arquivo .env.local criado. Configure suas variáveis de ambiente."
fi

# Verificar configuração
echo "🔍 Verificando configuração..."

if [ ! -f .env.local ]; then
    echo "❌ Arquivo .env.local não encontrado."
    exit 1
fi

# Verificar se as variáveis estão configuradas
if grep -q "seu_jwt_secret_super_seguro_aqui" .env.local; then
    echo "⚠️  Configure suas variáveis de ambiente no arquivo .env.local"
fi

echo "✅ Configuração concluída!"
echo ""
echo "📋 Próximos passos:"
echo "1. Configure as variáveis de ambiente em .env.local"
echo "2. Inicie o MongoDB (se local)"
echo "3. Execute: npm run dev"
echo ""
echo "🌐 Acesse: http://localhost:3000"

