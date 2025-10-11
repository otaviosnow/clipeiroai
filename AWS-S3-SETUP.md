# ☁️ AWS S3 - CONFIGURAÇÃO COMPLETA

## 📋 O QUE VOCÊ PRECISA FAZER

### 1. CRIAR BUCKET S3

1. **Acesse**: https://console.aws.amazon.com/s3/
2. **Clique**: "Create bucket"
3. **Configure**:
   - **Nome**: `clipeiro-videos`
   - **Região**: US East (N. Virginia) - `us-east-1`
   - **Block Public Access**: ❌ DESMARQUE todas as opções
   - **Versioning**: Desabilitado
   - **Encryption**: Habilitado (padrão)
4. **Criar bucket**

### 2. CONFIGURAR BUCKET POLICY

1. Vá no bucket criado
2. Clique em **"Permissions"**
3. Role até **"Bucket policy"**
4. Clique **"Edit"**
5. Cole este JSON:

\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::clipeiro-videos/*"
    }
  ]
}
\`\`\`

6. Salve

### 3. CONFIGURAR CORS

1. No bucket, vá em **"Permissions"**
2. Role até **"CORS"**
3. Clique **"Edit"**
4. Cole este JSON:

\`\`\`json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": []
  }
]
\`\`\`

5. Salve

### 4. CRIAR IAM USER

1. **Acesse**: https://console.aws.amazon.com/iam/
2. Clique em **"Users"** no menu lateral
3. Clique **"Create user"**
4. **Nome**: `clipeiro-app`
5. Clique **"Next"**
6. **Permissions**: Selecione **"Attach policies directly"**
7. Busque e selecione: **"AmazonS3FullAccess"**
8. Clique **"Next"** e **"Create user"**

### 5. GERAR ACCESS KEYS

1. Clique no usuário criado (`clipeiro-app`)
2. Vá em **"Security credentials"**
3. Role até **"Access keys"**
4. Clique **"Create access key"**
5. Selecione: **"Application running outside AWS"**
6. Clique **"Next"** e **"Create access key"**
7. **COPIE E SALVE**:
   - `Access key ID`: AKIAXXXXXXXXXXXX
   - `Secret access key`: xxxxxxxxxxxxxxxxxxxxxxxx

⚠️ **IMPORTANTE**: Você só verá o secret key uma vez!

### 6. ADICIONAR NO RENDER

1. Acesse: https://dashboard.render.com/
2. Vá no serviço **"clipeiro-backend"**
3. Clique em **"Environment"**
4. Adicione:
   - Key: `AWS_ACCESS_KEY_ID`
   - Value: `AKIAXXXXXXXXXXXX` (seu access key)
5. Adicione:
   - Key: `AWS_SECRET_ACCESS_KEY`
   - Value: `xxxxxxxxxxxxxxxxxxxxxxxx` (seu secret key)
6. Clique **"Save Changes"**

### 7. VERIFICAR

Execute este comando para testar:
\`\`\`bash
curl -X POST https://clipeiro-backend.onrender.com/api/upload/video \
  -H "Authorization: Bearer SEU_TOKEN" \
  -F "video=@test.mp4"
\`\`\`

---

## 💰 CUSTOS ESTIMADOS

### Free Tier (Primeiro Ano)
- ✅ 5GB de armazenamento grátis
- ✅ 20.000 GET requests/mês grátis
- ✅ 2.000 PUT requests/mês grátis

### Após Free Tier
- **Storage**: $0.023/GB/mês
- **Requests**: $0.0004/1000 GET
- **Transfer**: $0.09/GB (primeiros 10TB)

### Estimativa para 100 usuários:
- **Storage**: ~500GB = $11.50/mês
- **Requests**: ~1M = $0.40/mês
- **Transfer**: ~1TB = $90/mês
- **TOTAL**: ~$100/mês

---

## 🔒 SEGURANÇA

### Recomendações:
1. ✅ Use IAM user específico (não root)
2. ✅ Limite permissões apenas ao bucket necessário
3. ✅ Habilite encryption
4. ✅ Configure lifecycle policy (deletar após X dias)
5. ✅ Monitor custos no AWS Billing

---

## 📊 LIFECYCLE POLICY (OPCIONAL)

Para deletar vídeos antigos automaticamente:

1. No bucket, vá em **"Management"**
2. Clique **"Create lifecycle rule"**
3. Configure:
   - Nome: "Delete old videos"
   - Scope: All objects
   - Actions: Delete
   - Days: 30
4. Criar

Isso deletará vídeos com mais de 30 dias automaticamente.

---

**✅ CONFIGURAÇÃO COMPLETA!**
