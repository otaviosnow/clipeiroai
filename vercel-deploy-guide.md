# 🚀 DEPLOYMENT NO VERCEL - GUIA DEFINITIVO

## ✅ O QUE VOCÊ PRECISA FAZER:

### 1. **CONFIGURAR MONGODB ATLAS (OBRIGATÓRIO)**
1. Acesse: https://cloud.mongodb.com/
2. Faça login na sua conta
3. Vá em **"Network Access"**
4. Clique **"Add IP Address"**
5. Adicione: `0.0.0.0/0` (Permitir todos os IPs)
6. Salve as configurações

### 2. **CONFIGURAR VERCEL**
1. Acesse: https://vercel.com/
2. Faça login com GitHub
3. Clique **"New Project"**
4. Selecione seu repositório `clipeiroai`
5. Configure as variáveis de ambiente (veja abaixo)

### 3. **VARIÁVEIS DE AMBIENTE NO VERCEL:**
```
MONGODB_URI=mongodb+srv://clipeiroai:otaviosnow2012@cluster0.0afjdgs.mongodb.net/clipeiro?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=clipeiro-super-secret-jwt-key-2024
NEXTAUTH_SECRET=clipeiro-nextauth-secret-key-2024
NEXTAUTH_URL=https://seu-app.vercel.app
```

### 4. **CONFIGURAÇÕES DO VERCEL:**
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 🎯 RESULTADO:
- ✅ Aplicação funcionando online
- ✅ Deploy automático a cada push
- ✅ HTTPS automático
- ✅ CDN global
