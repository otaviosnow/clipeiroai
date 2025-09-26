#!/bin/bash

# 🚀 SCRIPT DE DEPLOYMENT EXCEPCIONAL
echo "🚀 Iniciando deployment do Clipeiro AI..."

# 🎯 CONFIGURAÇÕES
PROJECT_NAME="clipeiroai"
DOCKER_COMPOSE_FILE="docker-compose.yml"
ENV_FILE=".env.production"

# 🔧 FUNÇÕES
log() {
    echo "📊 $1"
}

error() {
    echo "❌ $1"
    exit 1
}

success() {
    echo "✅ $1"
}

# 🎯 VERIFICAÇÕES INICIAIS
log "Verificando pré-requisitos..."

# Verificar Docker
if ! command -v docker &> /dev/null; then
    error "Docker não encontrado. Instale o Docker primeiro."
fi

# Verificar Docker Compose
if ! command -v docker-compose &> /dev/null; then
    error "Docker Compose não encontrado. Instale o Docker Compose primeiro."
fi

# 🎯 CRIAR DIRETÓRIOS NECESSÁRIOS
log "Criando diretórios necessários..."
mkdir -p logs uploads temp ssl

# 🎯 CONFIGURAR PERMISSÕES
log "Configurando permissões..."
chmod +x deploy.sh
chmod 755 logs uploads temp

# 🎯 PARAR CONTAINERS EXISTENTES
log "Parando containers existentes..."
docker-compose down --remove-orphans

# 🎯 LIMPAR IMAGENS ANTIGAS
log "Limpando imagens antigas..."
docker system prune -f

# 🎯 BUILD E DEPLOY
log "Fazendo build da aplicação..."
docker-compose build --no-cache

log "Iniciando serviços..."
docker-compose up -d

# 🎯 VERIFICAR SAÚDE DOS SERVIÇOS
log "Verificando saúde dos serviços..."
sleep 30

# Verificar aplicação principal
if curl -f http://localhost:3000/api/health > /dev/null 2>&1; then
    success "Aplicação principal está funcionando!"
else
    error "Aplicação principal não está respondendo"
fi

# Verificar MongoDB
if docker-compose exec mongodb mongosh --eval "db.runCommand('ping')" > /dev/null 2>&1; then
    success "MongoDB está funcionando!"
else
    error "MongoDB não está respondendo"
fi

# Verificar Redis
if docker-compose exec redis redis-cli ping > /dev/null 2>&1; then
    success "Redis está funcionando!"
else
    error "Redis não está respondendo"
fi

# 🎯 MOSTRAR STATUS
log "Status dos serviços:"
docker-compose ps

# 🎯 MOSTRAR LOGS
log "Últimos logs da aplicação:"
docker-compose logs --tail=50 clipeiro-app

success "Deployment concluído com sucesso!"
echo "🌐 Aplicação disponível em: http://localhost:3000"
echo "📊 Monitoramento em: http://localhost:3001"
echo "📈 Métricas em: http://localhost:9090"
