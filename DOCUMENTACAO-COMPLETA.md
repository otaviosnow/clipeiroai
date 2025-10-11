# 🚀 CLIPEIRO AI - DOCUMENTAÇÃO COMPLETA DO SAAS

## 📖 O QUE É O CLIPEIRO AI?

O **Clipeiro AI** é um sistema SaaS (Software as a Service) que transforma vídeos longos em múltiplos clipes virais automaticamente, distribuindo-os por várias contas de redes sociais para maximizar o alcance e engajamento.

---

## 🎯 PROPOSTA DE VALOR

### **Problema que resolve:**
- Criadores de conteúdo precisam criar vários clipes manualmente
- Difícil viralizar conteúdo em múltiplas plataformas
- Tempo gasto criando variações do mesmo vídeo
- Gerenciamento manual de múltiplas contas sociais

### **Solução oferecida:**
- ✅ **Criação automática** de clipes a partir de vídeos longos
- ✅ **Múltiplas variações** do mesmo conteúdo
- ✅ **Distribuição automática** em várias contas
- ✅ **IA avançada** para identificar momentos virais
- ✅ **Analytics completo** de performance

---

## 👤 JORNADA DO USUÁRIO - PASSO A PASSO

### **1. PÁGINA INICIAL (Landing Page)**
**URL:** `https://clipeiroai-1.onrender.com/`

#### **O que o usuário vê:**
- 🎨 **Header** com logo e botões de "Login" e "Cadastrar"
- 🎯 **Hero Section** com título principal:
  - "ClipeiroAI transforma o seu vídeo em diversas variações e espalha o seu video pelo mundo em vários perfis de cortes!"
- 📊 **Stats Section** com métricas:
  - 10K+ Clipes Criados
  - 70% Aumenta chance de viralização
  - 80% Aumenta número de views
- ⚡ **Features Section** com 5 funcionalidades:
  1. **Análise Viral EUA** - Rastreamento de tendências
  2. **Automação Completa** - Criação e publicação automática
  3. **Multi-plataforma** - Instagram, TikTok, YouTube
  4. **IA Avançada** - Aprendizado contínuo
  5. **Studio AI** - Transformação de vídeos longos

#### **Ações disponíveis:**
- 🔵 **Criar Conta** (botão principal)
- ⚪ **Fazer Login** (botão secundário)
- 🔹 **Login** (botão no header)
- 🔹 **Cadastrar** (botão no header)

---

### **2. CADASTRO (Registration)**
**URL:** `https://clipeiroai-1.onrender.com/register`

#### **O que o usuário vê:**
- 📝 **Formulário de cadastro** com campos:
  - Nome completo
  - Email
  - Senha
  - Confirmar senha
- 🔙 **Botão "Voltar"** para página inicial

#### **Validações:**
- ✅ Email válido
- ✅ Senha mínima de 6 caracteres
- ✅ Senhas devem coincidir
- ✅ Nome obrigatório

#### **Backend (o que acontece):**
```
1. Dados são enviados para /api/auth/register
2. Validações no servidor
3. Senha é criptografada com bcrypt (12 rounds)
4. Usuário é criado no MongoDB Atlas
5. Redirecionamento para /login com mensagem de sucesso
```

#### **Próximo passo:**
- ➡️ Redirecionado para **página de login**

---

### **3. LOGIN**
**URL:** `https://clipeiroai-1.onrender.com/login`

#### **O que o usuário vê:**
- 🔐 **Formulário de login** com campos:
  - Email
  - Senha
- 🔙 **Botão "Voltar"** para página inicial
- 📝 **Link "Criar conta"** para cadastro

#### **Backend (o que acontece):**
```
1. Dados são enviados para /api/auth/login
2. Busca usuário no MongoDB
3. Verifica se usuário está ativo
4. Compara senha com bcrypt
5. Gera JWT token (válido por 7 dias)
6. Retorna token + dados do usuário
7. Salva em localStorage:
   - authToken
   - user (id, name, email)
```

#### **Verificação:**
- ✅ Se é **primeiro login** (sem onboarding): redireciona para `/onboarding`
- ✅ Se **já completou onboarding**: redireciona para `/dashboard-dark`

---

### **4. ONBOARDING - ETAPA 1 (Objetivo e Perfis)**
**URL:** `https://clipeiroai-1.onrender.com/onboarding`

#### **O que o usuário vê:**
- 🎯 **Campo de texto grande** para objetivo principal:
  - "Qual é seu principal objetivo?"
  - Placeholder com exemplos
- 📱 **Campos para redes sociais:**
  - Instagram (username)
  - TikTok (username)
  - YouTube (username)
- 💡 **Dica:** "Seja específico! Isso nos ajuda a personalizar"

#### **Validações:**
- ✅ Email obrigatório
- ✅ Objetivo obrigatório
- ✅ Pelo menos um perfil social

#### **Backend (o que acontece):**
```
1. Gera userId único
2. Dados são enviados para /api/onboarding
3. Salva no MongoDB:
   - userId
   - userEmail
   - objetivo
   - socialProfiles (array)
   - productChoice: 'clipeiro-ai'
   - status: 'processing'
4. Cria clipAccounts automaticamente:
   - Para cada perfil social
   - Adiciona sufixo "_clips"
   - Status: 'pending'
5. Salva onboardingUserId no localStorage
```

#### **Próximo passo:**
- ➡️ Redirecionado para `/onboarding/choose-product`

---

### **5. ONBOARDING - ETAPA 2 (Escolha de Produto)**
**URL:** `https://clipeiroai-1.onrender.com/onboarding/choose-product`

#### **O que o usuário vê:**
- 🎯 **Card do Clipeiro AI** com:
  - Logo e nome
  - Descrição: "Plataforma completa de criação e automação + Studio AI incluído"
  - 4 funcionalidades principais:
    1. ✅ Criação Automática de Clipes
    2. ✅ Postagem Multi-Plataforma
    3. ✅ Analytics Avançado
    4. ✅ Studio AI Integrado
  - Tag: "Solução Completa"
  - Botão: "Escolher Clipeiro AI"

#### **Backend (o que acontece):**
```
1. Verifica se há onboardingUserId no localStorage
2. Se não houver, redireciona para /onboarding
3. Ao escolher, aguarda 1 segundo (simula processamento)
4. Redireciona para /onboarding/social-usernames
```

#### **Próximo passo:**
- ➡️ Redirecionado para `/onboarding/social-usernames`

---

### **6. ONBOARDING - ETAPA 3 (Usernames Sociais)**
**URL:** `https://clipeiroai-1.onrender.com/onboarding/social-usernames`

#### **O que o usuário vê:**
- 📱 **Campos para usernames finais:**
  - Instagram (pré-preenchido se fornecido antes)
  - TikTok (pré-preenchido se fornecido antes)
  - YouTube (pré-preenchido se fornecido antes)
- 💡 **Explicação:** "Nossa IA usará essas informações para criar e gerenciar contas de clipes"
- 🚀 **Botão:** "Finalizar e Criar Contas"

#### **Backend (o que acontece):**
```
1. Busca dados do onboarding no MongoDB
2. Pré-preenche campos com dados anteriores
3. Ao submeter:
   - Envia para /api/onboarding/update
   - Atualiza socialProfiles
   - Atualiza clipAccounts
   - Muda status para 'processing'
4. Simula criação de contas (3 segundos)
5. Após 5 segundos (background):
   - Atualiza status para 'completed'
   - Marca clipAccounts como 'created'
6. Salva no localStorage:
   - userOnboardingCompleted: true
   - userId
7. Remove onboardingUserId temporário
```

#### **Tela de processamento:**
- ⏳ Spinner de carregamento
- 🎯 Mensagem: "Finalizando configuração..."
- 📊 Texto: "Aguarde enquanto preparamos tudo para você"

#### **Próximo passo:**
- ➡️ Redirecionado para `/dashboard-dark`

---

### **7. DASHBOARD PRINCIPAL**
**URL:** `https://clipeiroai-1.onrender.com/dashboard-dark`

#### **O que o usuário vê:**

##### **Header:**
- 🎨 Logo Clipeiro AI (esquerda)
- 💎 **Botão "Assinar Studio AI"** (roxo/rosa)
- 👑 **Botão "Assinar Clipeiro PRO"** (ciano/azul)
- 👤 Avatar do usuário (iniciais)

##### **Sidebar (Menu Lateral):**
- 🏠 **Home** (ativo)
- 📊 **Analytics** (link para `/analytics-portugues`)
- ⚙️ **Studio AI** (badge "NEW")
- ✂️ **Meus cortes**
- ⭐ **Insights da AI**
- ➕ **Novo corte** (botão destaque)
- 👤 **Meu perfil**
- 📌 Footer: "Clipeiro® 2025"

##### **Conteúdo Central:**
- 🎯 **Card principal** com:
  - Ícone grande (+)
  - Título: "Comece criando seu primeiro corte"
  - Descrição: "Faça upload de um vídeo e deixe nossa IA criar múltiplos clipes virais automaticamente"
  - Botão: "Criar Primeiro Corte"

#### **Backend (o que acontece):**
```
1. Verifica autenticação:
   - authToken no localStorage
   - user no localStorage
2. Se não autenticado, redireciona para /login
3. Busca dados do onboarding no MongoDB
4. Carrega métricas das contas (futuro):
   - Total de views
   - Total de engagement
   - Total de followers
   - Contas conectadas
```

#### **Ações disponíveis:**
- 🎬 **Criar Primeiro Corte** → vai para `/upload-video`
- 📊 **Analytics** → vai para `/analytics-portugues`
- 🚪 **Logout** → limpa localStorage e vai para `/`

---

### **8. UPLOAD DE VÍDEO**
**URL:** `https://clipeiroai-1.onrender.com/upload-video`

#### **O que o usuário vê:**
- 📤 **Área de upload** (drag & drop ou clique)
- 🎯 **Seleção de nicho** (dropdown)
- ⚙️ **Configurações:**
  - Número de clipes a gerar
  - Duração dos clipes
  - Formato (Story, Square, Landscape)
- 🚀 **Botão "Processar Vídeo"**

#### **Backend (o que acontece - FUTURO):**
```
1. Upload do vídeo para servidor/S3
2. Processamento com FFmpeg:
   - Análise de áudio (identificar momentos virais)
   - Análise de vídeo (identificar cenas interessantes)
3. IA identifica melhores momentos:
   - Picos de emoção
   - Frases de impacto
   - Momentos engraçados
4. Gera múltiplos clipes:
   - Corta vídeo nos pontos identificados
   - Adiciona legendas automáticas
   - Aplica edições (zoom, transições)
5. Cria variações:
   - Diferentes formatos (9:16, 1:1, 16:9)
   - Diferentes durações
   - Diferentes thumbnails
6. Salva clipes no banco
7. Agenda publicação nas contas de clipes
```

---

### **9. ANALYTICS**
**URL:** `https://clipeiroai-1.onrender.com/analytics-portugues`

#### **O que o usuário vê:**
- 📊 **Métricas gerais:**
  - Total de visualizações
  - Total de curtidas
  - Total de comentários
  - Total de compartilhamentos
  - Taxa de engajamento
- 📈 **Gráficos:**
  - Visualizações por dia
  - Engajamento por plataforma
  - Crescimento de seguidores
- 🏆 **Top Clipes:**
  - Lista dos clipes mais performáticos
  - Métricas individuais

---

## 🔧 ARQUITETURA TÉCNICA

### **Frontend:**
- **Framework:** Next.js 14.2.33
- **UI:** React 18 + Tailwind CSS
- **Animações:** Framer Motion
- **Ícones:** Lucide React

### **Backend:**
- **Runtime:** Node.js 18+
- **Framework:** Next.js API Routes
- **Database:** MongoDB Atlas (cluster0)
- **Cache:** Redis (opcional)
- **Auth:** JWT + bcrypt

### **Infraestrutura:**
- **Hosting:** Render.com
- **Database:** MongoDB Atlas (cloud)
- **Storage:** Futuro (AWS S3 / Cloudflare R2)
- **CDN:** Futuro (Cloudflare)

### **Segurança:**
- ✅ Passwords criptografadas (bcrypt, 12 rounds)
- ✅ JWT tokens (7 dias de validade)
- ✅ HTTPS obrigatório
- ✅ Rate limiting (Nginx)
- ✅ Validações em cliente e servidor

---

## 📊 FLUXO DE DADOS

```
USUÁRIO → FRONTEND → API ROUTES → MONGODB
   ↓         ↓           ↓            ↓
INTERFACE  VALIDAÇÃO  LÓGICA    PERSISTÊNCIA
   ↓         ↓           ↓            ↓
FEEDBACK ← RESPOSTA ← RESULTADO ← QUERY
```

---

## 🎯 PRÓXIMAS FUNCIONALIDADES (ROADMAP)

### **Fase 1 - MVP (Atual):**
- ✅ Autenticação completa
- ✅ Onboarding flow
- ✅ Dashboard básico
- ⏳ Upload de vídeo
- ⏳ Processamento básico

### **Fase 2 - Core Features:**
- 🔄 Processamento de vídeo com IA
- 🔄 Geração de clipes automática
- 🔄 Legendas automáticas
- 🔄 Múltiplos formatos
- 🔄 Sistema de filas

### **Fase 3 - Automação:**
- 🔮 Criação automática de contas sociais
- 🔮 Publicação automática em horários otimizados
- 🔮 Gerenciamento de múltiplas contas
- 🔮 Analytics em tempo real

### **Fase 4 - IA Avançada:**
- 🔮 Análise de tendências virais
- 🔮 Sugestões de conteúdo
- 🔮 Otimização automática
- 🔮 Previsão de viralização

### **Fase 5 - Monetização:**
- 🔮 Planos pagos (Basic, Pro, Enterprise)
- 🔮 Créditos por vídeo
- 🔮 API para desenvolvedores
- 🔮 White label

---

## 💰 MODELO DE NEGÓCIO

### **Planos (Futuro):**

#### **FREE:**
- 1 vídeo por mês
- 3 clipes por vídeo
- 1 conta social
- Analytics básico

#### **PRO ($29/mês):**
- 10 vídeos por mês
- 10 clipes por vídeo
- 5 contas sociais
- Analytics avançado
- Suporte prioritário

#### **ENTERPRISE ($99/mês):**
- Vídeos ilimitados
- Clipes ilimitados
- Contas ilimitadas
- Analytics completo
- API access
- Suporte dedicado

---

## 📞 SUPORTE E CONTATO

- **Email:** suporte@clipeiroai.com
- **Documentação:** docs.clipeiroai.com
- **Status:** status.clipeiroai.com

---

**Clipeiro AI - Transforme seus vídeos em clipes virais automaticamente! 🚀**
