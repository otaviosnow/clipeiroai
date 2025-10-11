# 🚀 CLIPEIRO - ESTRUTURA DO PROJETO

```
clipeiro/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── config/            # Configurações (DB, AWS, Redis)
│   │   ├── controllers/       # Controladores de rotas
│   │   ├── middlewares/       # Auth, upload, error handling
│   │   ├── models/            # Schemas MongoDB
│   │   ├── routes/            # Rotas da API
│   │   ├── services/          # Lógica de negócio
│   │   ├── utils/             # Helpers
│   │   └── server.js          # Entry point
│   ├── package.json
│   └── .env
│
├── workers/                    # Playwright automation
│   ├── src/
│   │   ├── automation/        # Scripts Playwright
│   │   ├── queue/             # BullMQ processors
│   │   ├── utils/             # 2FA, helpers
│   │   └── worker.js          # Entry point
│   ├── package.json
│   └── .env
│
├── frontend/                   # React + TailwindCSS
│   ├── public/
│   ├── src/
│   │   ├── components/        # Componentes React
│   │   │   ├── admin/        # Admin components
│   │   │   ├── dashboard/    # Dashboard components
│   │   │   ├── clips/        # Clips components
│   │   │   └── ui/           # UI components
│   │   ├── pages/            # Páginas
│   │   ├── hooks/            # Custom hooks
│   │   ├── services/         # API calls
│   │   ├── utils/            # Helpers
│   │   ├── styles/           # CSS/Tailwind
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── shared/                     # Código compartilhado
│   ├── constants.js
│   ├── types.js
│   └── validators.js
│
├── docker/                     # Docker configs
│   ├── backend.Dockerfile
│   ├── workers.Dockerfile
│   ├── frontend.Dockerfile
│   └── docker-compose.yml
│
├── scripts/                    # Scripts úteis
│   ├── setup.sh
│   ├── deploy.sh
│   └── seed-db.js
│
├── docs/                       # Documentação
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── ARCHITECTURE.md
│
├── .gitignore
├── README.md
└── package.json               # Root package.json
```

## Descrição das Pastas

### Backend
- **config/**: Conexões DB, AWS S3, Redis, variáveis ambiente
- **controllers/**: Lógica de cada endpoint
- **middlewares/**: Auth JWT, upload multer, error handling
- **models/**: Schemas User, Profile, Media, Post, Log, Analytics
- **routes/**: Definição de rotas
- **services/**: FFmpeg, clip generation, AWS upload
- **utils/**: Helpers, validations, crypto

### Workers
- **automation/**: Playwright scripts para TikTok
- **queue/**: BullMQ job processors
- **utils/**: 2FA automation, human simulation

### Frontend
- **components/**: Componentes reutilizáveis
- **pages/**: Login, Dashboard, Upload, Admin
- **hooks/**: useAuth, useClips, useAnalytics
- **services/**: API client (axios)
- **styles/**: Tailwind + custom CSS

## Fluxo de Dados

```
FRONTEND → BACKEND API → MongoDB
                ↓
         BullMQ Queue → Workers → TikTok
                ↓
           AWS S3 Storage
```
