# 🚀 DEPLOYMENT NO DIGITALOCEAN - GUIA DEFINITIVO

## ✅ O QUE VOCÊ PRECISA FAZER:

### 1. **CONFIGURAR MONGODB ATLAS (OBRIGATÓRIO)**
1. Acesse: https://cloud.mongodb.com/
2. Faça login na sua conta
3. Vá em **"Network Access"**
4. Clique **"Add IP Address"**
5. Adicione: `0.0.0.0/0` (Permitir todos os IPs)
6. Salve as configurações

### 2. **CONFIGURAR DIGITALOCEAN**
1. Acesse: https://cloud.digitalocean.com/
2. Faça login/cadastre-se
3. Crie um **Droplet** (Ubuntu 22.04)
4. Configure SSH e conecte-se

### 3. **INSTALAR DOCKER NO SERVER:**
```bash
# Conectar via SSH
ssh root@seu-ip

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 4. **DEPLOY DA APLICAÇÃO:**
```bash
# Clonar repositório
git clone https://github.com/otaviosnow/clipeiroai.git
cd clipeiroai

# Configurar variáveis
cp .env.production .env

# Deploy
docker-compose up -d
```

## 🎯 RESULTADO:
- ✅ Sistema completo funcionando
- ✅ MongoDB + Redis + Nginx
- ✅ Monitoramento com Grafana
- ✅ Escalável e robusto
