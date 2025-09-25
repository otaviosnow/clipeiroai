# Clipeiro 🎬

Plataforma para transformar seus vídeos em múltiplos formatos de clipes e postar automaticamente nas redes sociais.

## 🚀 Funcionalidades

- **Upload de Vídeos**: Faça upload de seus vídeos originais
- **Geração Automática**: Transforme 1 vídeo em 10 formatos diferentes automaticamente
- **Múltiplas Contas**: Conecte até 10 contas do TikTok, Instagram e YouTube
- **Agendamento**: Agende posts para data e hora específicas
- **Painel Admin**: Gerencie vídeos de fundo e configurações
- **Design Moderno**: Interface azul/roxo minimalista e responsiva

## 🛠️ Tecnologias

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB, Mongoose
- **Autenticação**: JWT, bcryptjs
- **Processamento de Vídeo**: FFmpeg
- **Email**: Nodemailer
- **UI**: Framer Motion, Lucide React, React Hot Toast

## 📋 Pré-requisitos

- Node.js 18+ 
- MongoDB
- FFmpeg instalado no sistema

## 🚀 Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/clipeiro.git
cd clipeiro
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` com suas configurações:

```env
MONGODB_URI=mongodb://localhost:27017/clipeiro
JWT_SECRET=seu_jwt_secret_super_seguro_aqui
NEXTAUTH_SECRET=seu_nextauth_secret_aqui
NEXTAUTH_URL=http://localhost:3000

# Email configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app

# Social Media APIs
TIKTOK_CLIENT_KEY=seu_tiktok_client_key
TIKTOK_CLIENT_SECRET=seu_tiktok_client_secret
INSTAGRAM_APP_ID=seu_instagram_app_id
INSTAGRAM_APP_SECRET=seu_instagram_app_secret
YOUTUBE_CLIENT_ID=seu_youtube_client_id
YOUTUBE_CLIENT_SECRET=seu_youtube_client_secret
```

4. **Inicie o MongoDB**
```bash
# Se usando Docker
docker run -d -p 27017:27017 --name mongodb mongo

# Ou inicie seu MongoDB local
mongod
```

5. **Execute o projeto**
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 📱 Como Usar

### 1. Criar Conta
- Acesse a página inicial
- Clique em "Começar Grátis"
- Preencha seus dados e crie sua conta

### 2. Upload de Vídeo
- Faça login no dashboard
- Na aba "Upload", arraste e solte seu vídeo
- Aguarde o processamento automático

### 3. Visualizar Clipes
- Na aba "Clipes", visualize os 10 formatos gerados
- Cada clipe tem um estilo diferente:
  - Tela dividida (topo/base)
  - Zoom focado
  - Legendas estilo CapCut
  - Efeitos de borda
  - E muito mais!

### 4. Agendar Posts
- Clique em "Agendar" em qualquer clipe
- Selecione as contas de destino
- Escolha data e horário
- Adicione legenda e hashtags

### 5. Gerenciar Vídeos de Fundo
- Acesse o painel admin
- Faça upload de vídeos de fundo
- Organize por categorias e tags

## 🔧 Configuração das APIs

### TikTok Business API
1. Acesse [TikTok for Business](https://business.tiktok.com/)
2. Crie uma aplicação
3. Configure as URLs de callback
4. Obtenha Client Key e Client Secret

### Instagram Basic Display API
1. Acesse [Facebook Developers](https://developers.facebook.com/)
2. Crie uma aplicação
3. Adicione o produto "Instagram Basic Display"
4. Configure as URLs de callback
5. Obtenha App ID e App Secret

### YouTube Data API
1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um projeto
3. Ative a YouTube Data API v3
4. Crie credenciais OAuth 2.0
5. Configure as URLs de callback

## 📁 Estrutura do Projeto

```
clipeiro/
├── app/                    # App Router (Next.js 14)
│   ├── api/               # API Routes
│   │   ├── auth/          # Autenticação
│   │   ├── videos/        # Vídeos e clipes
│   │   ├── schedule/      # Agendamento
│   │   └── admin/         # Painel admin
│   ├── dashboard/         # Dashboard principal
│   ├── login/            # Páginas de auth
│   └── admin/            # Painel administrativo
├── components/           # Componentes React
├── lib/                  # Utilitários
├── models/              # Modelos MongoDB
├── uploads/              # Arquivos enviados
└── middleware.ts         # Middleware de auth
```

## 🎨 Formatos de Clipes

A plataforma gera automaticamente 10 formatos diferentes:

1. **Split Screen Top** - Metade do vídeo em cima
2. **Split Screen Bottom** - Metade do vídeo embaixo  
3. **Zoom Focus** - Zoom em partes específicas
4. **Caption Style 1** - Legendas estilo CapCut
5. **Caption Style 2** - Outro estilo de legenda
6. **Border Effect** - Efeitos de borda
7. **Overlay Text** - Texto sobreposto
8. **Highlight Clip** - Destaque de momentos
9. **Slow Motion** - Câmera lenta
10. **Fast Motion** - Acelerado

## 🚀 Deploy

### Render.com
1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Deploy automático

### Vercel
1. Conecte seu repositório
2. Configure as variáveis de ambiente
3. Deploy com um clique

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🆘 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Abra uma [issue](https://github.com/seu-usuario/clipeiro/issues)
2. Entre em contato: seu-email@exemplo.com

## 🎯 Roadmap

- [ ] Integração com mais redes sociais
- [ ] IA para otimização automática
- [ ] Analytics avançados
- [ ] Templates personalizáveis
- [ ] API pública
- [ ] App mobile

---

**Clipeiro** - Transforme seus vídeos em clipes virais! 🚀

