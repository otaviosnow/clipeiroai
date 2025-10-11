# 🚀 GUIA DE DEPLOY - CLIPEIRO NO RENDER

## ✅ PRÉ-REQUISITOS

1. ✅ MongoDB Atlas configurado (já feito)
2. ⏳ AWS S3 Bucket criado
3. ⏳ Redis Cloud configurado (opcional, Render fornece)
4. ✅ Render.com conta criada

---

## 📋 PASSO A PASSO

### 1. CONFIGURAR AWS S3 (OBRIGATÓRIO)

#### 1.1 Criar Bucket
1. Acesse: https://console.aws.amazon.com/s3/
2. Clique **"Create bucket"**
3. Nome: `clipeiro-videos`
4. Região: `us-east-1`
5. Desmarque **"Block all public access"**
6. Criar

#### 1.2 Criar IAM User
1. Acesse: https://console.aws.amazon.com/iam/
2. Vá em **"Users"** → **"Create user"**
3. Nome: `clipeiro-app`
4. Permissões: **"AmazonS3FullAccess"**
5. Criar

#### 1.3 Gerar Access Keys
1. Selecione o usuário criado
2. Vá em **"Security credentials"**
3. Clique **"Create access key"**
4. Selecione: **"Application running outside AWS"**
5. Copie:
   - `AWS_ACCESS_KEY_ID`
   - `AWS_SECRET_ACCESS_KEY`

### 2. CONFIGURAR RENDER.COM

#### 2.1 Conectar GitHub
1. Acesse: https://dashboard.render.com/
2. Clique **"New +"**
3. Selecione **"Blueprint"**
4. Conecte seu repositório GitHub
5. Selecione `clipeiroai`

#### 2.2 Configurar Variáveis (IMPORTANTE)
No Render, vá em **Environment** e adicione:

**Backend:**
\`\`\`
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxx
\`\`\`

**Frontend:**
\`\`\`
VITE_API_URL=https://clipeiro-backend.onrender.com/api
\`\`\`

#### 2.3 Deploy
1. Render detectará o `render.yaml`
2. Criará 3 serviços automaticamente:
   - clipeiro-backend (API)
   - clipeiro-workers (Jobs)
   - clipeiro-frontend (UI)
3. Criará 1 database:
   - clipeiro-redis (Queue)

### 3. VERIFICAR DEPLOYMENT

#### 3.1 Verificar Logs
1. Vá em cada serviço no Render
2. Clique em **"Logs"**
3. Verifique se não há erros

#### 3.2 Testar API
\`\`\`bash
curl https://clipeiro-backend.onrender.com/health
\`\`\`

Resposta esperada:
\`\`\`json
{
  "status": "healthy",
  "uptime": 123,
  "timestamp": "2025-XX-XX..."
}
\`\`\`

#### 3.3 Testar Frontend
Acesse: https://clipeiro-frontend.onrender.com

---

## 🔧 CONFIGURAÇÕES ADICIONAIS

### FFmpeg no Render
O Render **já possui FFmpeg** instalado por padrão. Não precisa configurar!

### Playwright no Render
No `render.yaml`, o worker já está configurado para instalar Playwright automaticamente.

### Redis
O Render fornece Redis gratuito com 25MB. Suficiente para a fila de jobs.

---

## ⚠️ TROUBLESHOOTING

### Problema: "Build failed"
**Solução:**
- Verifique logs no Render
- Confirme que `render.yaml` está na raiz
- Verifique se `package.json` está correto

### Problema: "502 Bad Gateway"
**Solução:**
- Verifique se MongoDB Atlas permite IP `0.0.0.0/0`
- Verifique logs do backend
- Confirme variáveis de ambiente

### Problema: "Workers não processam jobs"
**Solução:**
- Verifique se Redis está conectado
- Verifique logs do worker
- Teste Redis connection string

---

## 📊 MONITORAMENTO

### Logs
- **Backend**: https://dashboard.render.com/ → clipeiro-backend → Logs
- **Workers**: https://dashboard.render.com/ → clipeiro-workers → Logs

### Health Check
- **Backend**: https://clipeiro-backend.onrender.com/health

### Analytics
- **BullMQ UI**: Adicionar depois

---

## 🎯 PRÓXIMOS PASSOS

1. ✅ Deploy no Render
2. ⏳ Configurar domínio customizado
3. ⏳ Configurar SSL (automático no Render)
4. ⏳ Monitoramento avançado
5. ⏳ Backup automático

---

## 👑 ADMIN LOGIN

Após deploy, acesse:
- URL: https://clipeiro-frontend.onrender.com/register
- Registre com:
  - Email: tavinmktdigital@gmail.com
  - Senha: tata2012
- Sistema detectará e definirá como admin automaticamente

---

## 📞 SUPORTE

Qualquer problema, verifique:
1. Logs do Render
2. MongoDB Atlas Network Access
3. AWS S3 Permissions
4. Redis Connection

---

**🎉 Sistema pronto para deploy!**
