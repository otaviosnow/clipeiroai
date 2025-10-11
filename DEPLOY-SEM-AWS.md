# 🚀 DEPLOY NO RENDER - SEM AWS S3

## ✅ CONFIGURAÇÃO SIMPLIFICADA PARA TESTES

Este guia mostra como rodar o Clipeiro **sem AWS S3**, usando storage local do Render.

**⚠️ ATENÇÃO**: Storage local no Render é **temporário**. Os arquivos podem ser deletados quando o serviço reiniciar. Use apenas para testes!

---

## 📋 PASSO A PASSO

### 1. VERIFICAR MONGODB ATLAS (JÁ CONFIGURADO)
✅ IP Whitelist: `0.0.0.0/0` já configurado
✅ Conexão funcionando

### 2. VERIFICAR RENDER.COM

O sistema **já foi enviado** para o GitHub e o Render **já detectou**!

**Acesse**: https://dashboard.render.com/

Você deve ver 3 serviços sendo criados:

1. **clipeiro-backend** (API)
   - Status: Building ou Live
   - URL: https://clipeiro-backend.onrender.com

2. **clipeiro-workers** (Jobs)
   - Status: Building ou Live
   - Processa clipes e posts

3. **clipeiro-frontend** (UI)
   - Status: Building ou Live
   - URL: https://clipeiro-frontend.onrender.com

4. **clipeiro-redis** (Database)
   - Status: Available
   - Para filas BullMQ

### 3. AGUARDAR BUILD (5-10 minutos)

O Render está:
- 📦 Instalando dependências
- 🏗️ Fazendo build
- 🚀 Iniciando serviços

**Acompanhe nos logs**: Clique em cada serviço → "Logs"

### 4. VERIFICAR SE ESTÁ FUNCIONANDO

Quando os serviços ficarem **"Live"**:

**Teste a API:**
```
https://clipeiro-backend.onrender.com/health
```

Deve retornar:
```json
{
  "status": "healthy",
  "uptime": 123,
  "timestamp": "2025-XX-XX..."
}
```

**Acesse o Frontend:**
```
https://clipeiro-frontend.onrender.com
```

---

## 👑 PRIMEIRO ACESSO (CRIAR ADMIN)

### 1. Registrar conta admin
1. Acesse: https://clipeiro-frontend.onrender.com/register
2. Preencha:
   - **Nome**: Seu nome
   - **Email**: tavinmktdigital@gmail.com
   - **Senha**: tata2012
3. Clique "Criar Conta"
4. Sistema detecta email e define como **admin** automaticamente

### 2. Fazer Login
1. Login com as credenciais
2. Você será redirecionado para o Dashboard
3. Verá menu Admin no sidebar

---

## 🎯 TESTAR SISTEMA COMPLETO

### 1. Upload de Vídeo Background (Admin)
1. Vá em **Admin** no menu
2. Clique **"Upload Backgrounds"**
3. Selecione 10-100 vídeos de background
4. Aguarde upload completar

### 2. Upload de Vídeo Original (Usuário)
1. Vá em **Upload** no menu
2. Arraste um vídeo (máx 2GB)
3. Clique **"Enviar e Gerar Clipes"**
4. Aguarde processamento (5-10 min)

### 3. Ver Clipes Gerados
1. Vá em **Meus Clipes**
2. Verá 10 clipes gerados
3. Pode:
   - 📥 Baixar cada clipe
   - 🚀 Publicar no TikTok
   - 🗑️ Deletar

### 4. Publicar no TikTok (Requer perfil)
1. Admin cria perfil em **Admin** → **"Criar Perfil"**
2. Usuário vai em **Meus Clipes**
3. Clica **"Publicar"** em um clipe
4. Worker processa e posta automaticamente

---

## ⚠️ LIMITAÇÕES DO STORAGE LOCAL

### Problemas:
- ❌ Arquivos são deletados em reinicializações
- ❌ Não é escalável
- ❌ Limitado pelo disco do Render

### Quando usar S3:
Quando estiver pronto para produção, adicione:
1. Configurar AWS S3 (guia: `AWS-S3-SETUP.md`)
2. Adicionar keys no Render
3. Mudar `USE_S3=true`
4. Redeploy

---

## 🔍 VERIFICAR LOGS

### Backend Logs:
```
https://dashboard.render.com/ → clipeiro-backend → Logs
```

Procure por:
- ✅ "MongoDB conectado com sucesso!"
- ✅ "Redis conectado!"
- ✅ "Server running on port 5000"

### Workers Logs:
```
https://dashboard.render.com/ → clipeiro-workers → Logs
```

Procure por:
- ✅ "Clip Worker iniciado"
- ✅ "Post Worker iniciado"

---

## 🎯 RESULTADO ESPERADO

Após 5-10 minutos:

✅ **Backend**: https://clipeiro-backend.onrender.com
✅ **Frontend**: https://clipeiro-frontend.onrender.com
✅ **Workers**: Rodando em background
✅ **Redis**: Conectado e funcionando

---

## 📞 TROUBLESHOOTING

### Problema: Build failed
**Solução**: 
- Verifique logs no Render
- Confirme que MongoDB Atlas permite conexões (`0.0.0.0/0`)

### Problema: Frontend não conecta na API
**Solução**:
- Verifique se `VITE_API_URL` está correto
- Teste API diretamente: `/health`

### Problema: Workers não processam
**Solução**:
- Verifique se Redis está conectado
- Verifique logs do worker

---

## ✅ TUDO PRONTO!

Agora você pode testar o sistema **completo** sem precisar de AWS S3!

Quando quiser migrar para S3, é só seguir o guia `AWS-S3-SETUP.md`.

**🎉 Sistema funcionando 100% no Render!**
