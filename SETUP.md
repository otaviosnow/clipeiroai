# 🚀 Guia de Configuração - Clipeiro

## Passo a Passo para Executar o Projeto

### 1. Pré-requisitos
Certifique-se de ter instalado:
- Node.js 18+ 
- MongoDB (local ou MongoDB Atlas)
- FFmpeg
- Git

### 2. Instalação do FFmpeg

**Windows:**
```bash
# Via Chocolatey
choco install ffmpeg

# Ou baixe de https://ffmpeg.org/download.html
```

**macOS:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt update
sudo apt install ffmpeg
```

### 3. Configuração do MongoDB

**Opção 1 - MongoDB Local:**
```bash
# Instalar MongoDB
# Windows: Baixe do site oficial
# macOS: brew install mongodb-community
# Linux: sudo apt install mongodb

# Iniciar MongoDB
mongod
```

**Opção 2 - MongoDB Atlas (Recomendado):**
1. Acesse [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Crie uma conta gratuita
3. Crie um cluster
4. Obtenha a string de conexão

### 4. Configuração do Projeto

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/clipeiro.git
cd clipeiro

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env.local
```

### 5. Configuração das Variáveis de Ambiente

Edite o arquivo `.env.local`:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/clipeiro
# Ou use MongoDB Atlas: mongodb+srv://usuario:senha@cluster.mongodb.net/clipeiro

# JWT
JWT_SECRET=seu_jwt_secret_super_seguro_aqui_123456789
NEXTAUTH_SECRET=seu_nextauth_secret_aqui_123456789
NEXTAUTH_URL=http://localhost:3000

# Email (para recuperação de senha)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app_do_gmail

# APIs das Redes Sociais (opcional por enquanto)
TIKTOK_CLIENT_KEY=seu_tiktok_client_key
TIKTOK_CLIENT_SECRET=seu_tiktok_client_secret
INSTAGRAM_APP_ID=seu_instagram_app_id
INSTAGRAM_APP_SECRET=seu_instagram_app_secret
YOUTUBE_CLIENT_ID=seu_youtube_client_id
YOUTUBE_CLIENT_SECRET=seu_youtube_client_secret
```

### 6. Configuração do Email (Gmail)

Para usar o sistema de recuperação de senha:

1. Ative a verificação em 2 etapas no Gmail
2. Gere uma "Senha de app":
   - Acesse: https://myaccount.google.com/security
   - Clique em "Senhas de app"
   - Gere uma nova senha para "Mail"
   - Use essa senha no `EMAIL_PASS`

### 7. Executar o Projeto

```bash
# Desenvolvimento
npm run dev

# Produção
npm run build
npm start
```

### 8. Acessar a Aplicação

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🎯 Primeiros Passos

### 1. Criar Conta
- Acesse a página inicial
- Clique em "Começar Grátis"
- Preencha seus dados

### 2. Testar Upload
- Faça login no dashboard
- Vá para a aba "Upload"
- Envie um vídeo de teste

### 3. Configurar Admin
- Acesse a aba "Admin"
- Faça upload de vídeos de fundo
- Organize por categorias

## 🔧 Solução de Problemas

### Erro de Conexão com MongoDB
```bash
# Verificar se MongoDB está rodando
mongosh

# Ou reiniciar o serviço
sudo systemctl restart mongod
```

### Erro de FFmpeg
```bash
# Verificar se FFmpeg está instalado
ffmpeg -version

# Se não estiver, reinstalar
```

### Erro de Permissões
```bash
# Dar permissões para a pasta uploads
mkdir -p uploads/videos uploads/backgrounds
chmod 755 uploads
```

### Porta 3000 em Uso
```bash
# Matar processo na porta 3000
npx kill-port 3000

# Ou usar outra porta
npm run dev -- -p 3001
```

## 📱 Testando as Funcionalidades

### 1. Sistema de Autenticação
- ✅ Registro de usuário
- ✅ Login/Logout
- ✅ Recuperação de senha
- ✅ Middleware de proteção

### 2. Upload de Vídeos
- ✅ Upload com drag & drop
- ✅ Validação de formato
- ✅ Preview do vídeo
- ✅ Processamento em background

### 3. Geração de Clipes
- ✅ 10 formatos diferentes
- ✅ Status de processamento
- ✅ Preview dos clipes
- ✅ Download individual

### 4. Agendamento
- ✅ Seleção de contas
- ✅ Data e horário
- ✅ Legendas e hashtags
- ✅ Status de agendamento

### 5. Painel Admin
- ✅ Upload de vídeos de fundo
- ✅ Categorização
- ✅ Ativação/Desativação
- ✅ Exclusão

## 🚀 Deploy

### Render.com
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático

### Vercel
1. Conecte seu repositório
2. Configure as variáveis de ambiente
3. Deploy com um clique

### Railway
1. Conecte seu repositório
2. Configure MongoDB Atlas
3. Deploy automático

## 📊 Monitoramento

### Logs da Aplicação
```bash
# Ver logs em tempo real
npm run dev

# Logs de produção
pm2 logs clipeiro
```

### Banco de Dados
```bash
# Conectar ao MongoDB
mongosh mongodb://localhost:27017/clipeiro

# Ver coleções
show collections

# Ver usuários
db.users.find()
```

## 🔒 Segurança

### Configurações Importantes
- Use senhas fortes para JWT_SECRET
- Configure HTTPS em produção
- Use MongoDB Atlas com autenticação
- Configure CORS adequadamente
- Valide todos os inputs

### Backup
```bash
# Backup do MongoDB
mongodump --db clipeiro --out backup/

# Restore
mongorestore --db clipeiro backup/clipeiro/
```

## 📈 Performance

### Otimizações
- Use CDN para arquivos estáticos
- Configure cache do MongoDB
- Use Redis para sessões
- Otimize imagens com Sharp
- Configure compressão gzip

### Monitoramento
- Use MongoDB Compass
- Configure alertas
- Monitore uso de CPU/RAM
- Configure logs estruturados

---

**Pronto!** 🎉 Sua plataforma Clipeiro está funcionando!

Para dúvidas ou problemas, abra uma issue no GitHub.

