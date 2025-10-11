# 🚀 CLIPEIRO V2 - SISTEMA COMPLETO

## 📖 Sobre

**Clipeiro** é um SaaS que transforma vídeos longos em 10 clipes virais automaticamente e publica no TikTok usando automação inteligente.

### ✨ Funcionalidades

- ✅ **Upload de vídeos** (máx 2GB por vídeo, 6GB total)
- ✅ **Geração automática** de 10 clipes com FFmpeg
- ✅ **Publicação automática** no TikTok com Playwright
- ✅ **2FA automation** (hitools.pro)
- ✅ **Analytics** completo (views, likes, engagement)
- ✅ **Admin panel** para gerenciar perfis
- ✅ **Sistema de filas** com BullMQ

---

## 🏗️ Arquitetura

```
FRONTEND (React + Vite)
     ↓
BACKEND (Express + MongoDB)
     ↓
WORKERS (Playwright + BullMQ)
     ↓
TIKTOK (Publicação automática)
```

---

## 🛠️ Stack Tecnológica

### Backend
- Node.js + Express
- MongoDB Atlas
- AWS S3
- BullMQ + Redis
- FFmpeg
- JWT + bcrypt

### Workers
- Playwright
- BullMQ
- 2FA automation

### Frontend
- React 18
- Vite
- TailwindCSS
- Framer Motion
- Zustand

---

## 📦 Instalação

### 1. Clonar repositório
\`\`\`bash
git clone https://github.com/otaviosnow/clipeiroai.git
cd clipeiro
\`\`\`

### 2. Instalar dependências

#### Backend:
\`\`\`bash
cd backend
npm install
\`\`\`

#### Workers:
\`\`\`bash
cd workers
npm install
npx playwright install chromium
\`\`\`

#### Frontend:
\`\`\`bash
cd frontend
npm install
\`\`\`

### 3. Configurar variáveis de ambiente

#### Backend (.env):
\`\`\`env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://clipeiroai:otaviosnow2012@cluster0.0afjdgs.mongodb.net/clipeiro
JWT_SECRET=clipeiro-jwt-secret-2024
CRYPTO_SECRET=clipeiro-crypto-secret-2024
AWS_ACCESS_KEY_ID=your_key_here
AWS_SECRET_ACCESS_KEY=your_secret_here
AWS_REGION=us-east-1
AWS_BUCKET_NAME=clipeiro-videos
REDIS_URL=redis://localhost:6379
FRONTEND_URL=http://localhost:3000
\`\`\`

#### Workers (.env):
\`\`\`env
NODE_ENV=development
MONGODB_URI=mongodb+srv://clipeiroai:otaviosnow2012@cluster0.0afjdgs.mongodb.net/clipeiro
REDIS_URL=redis://localhost:6379
\`\`\`

#### Frontend (.env):
\`\`\`env
VITE_API_URL=http://localhost:5000/api
\`\`\`

---

## 🚀 Executar Localmente

### Opção 1: Separado

Terminal 1 - Backend:
\`\`\`bash
cd backend
npm run dev
\`\`\`

Terminal 2 - Workers:
\`\`\`bash
cd workers
npm run dev
\`\`\`

Terminal 3 - Frontend:
\`\`\`bash
cd frontend
npm run dev
\`\`\`

Terminal 4 - Redis:
\`\`\`bash
redis-server
\`\`\`

### Opção 2: Docker Compose
\`\`\`bash
docker-compose -f docker/docker-compose.yml up
\`\`\`

---

## 🌐 Deploy no Render

### 1. Conectar repositório GitHub
- Acesse: https://dashboard.render.com/
- Conecte seu repositório

### 2. Configurar serviços
O arquivo \`render.yaml\` já está configurado com:
- ✅ Backend (Web Service)
- ✅ Workers (Background Worker)
- ✅ Frontend (Static Site)
- ✅ Redis (Database)

### 3. Adicionar variáveis de ambiente
No Render, adicione:
- \`AWS_ACCESS_KEY_ID\`
- \`AWS_SECRET_ACCESS_KEY\`

---

## 📋 Fluxo do Sistema

### 1. Usuário faz upload
\`\`\`
Upload vídeo → S3 → Backend salva no MongoDB
\`\`\`

### 2. Gerar clipes
\`\`\`
User clica "Gerar" → Job BullMQ → Worker FFmpeg → 10 clipes → S3
\`\`\`

### 3. Publicar no TikTok
\`\`\`
User clica "Publicar" → Job BullMQ → Worker Playwright → Login TikTok → 2FA → Upload vídeo → Post
\`\`\`

---

## 👑 Admin

### Primeiro Admin
- Email: tavinmktdigital@gmail.com
- Senha: tata2012

### Funcionalidades Admin
- Criar perfis de corte TikTok
- Upload de vídeos background (100 vídeos)
- Ver logs de todos usuários
- Estatísticas gerais

---

## 🎨 Design System

### Cores
- **Primary Red**: #FF4757
- **Black**: #0A0A0A
- **White**: #FFFFFF
- **Gray**: #1A1A1A

### Animações
- Motion vertical no scroll
- Hover zoom nos cards
- Progress bars animados
- Transições suaves

---

## 📊 Limites

- **Vídeo individual**: 2GB máximo
- **Storage total**: 6GB por usuário
- **Clipes por vídeo**: 10 automáticos
- **Perfis por plataforma**: 10 máximo
- **Posts por hora**: 10 máximo (rate limiting)

---

## 🔧 Tecnologias

### Processamento de Vídeo
- **FFmpeg**: Corte e combinação
- **Formato**: MP4 (H.264 + AAC)
- **Resolução**: 1080x1920 (9:16 vertical)

### Automação
- **Playwright**: Navegação headless
- **2FA**: hitools.pro integration
- **Human simulation**: Delays e movimentos naturais

### Queue System
- **BullMQ**: Filas de jobs
- **Redis**: Cache e mensageria
- **Concurrency**: 2 clips, 1 post por vez

---

## 📞 Suporte

- **Email**: suporte@clipeiro.com
- **GitHub**: https://github.com/otaviosnow/clipeiroai

---

## 📝 Licença

MIT License - Clipeiro 2025

---

**🎉 Sistema completo e pronto para produção!**