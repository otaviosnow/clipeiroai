# Clipeiro Setup Script for Windows

Write-Host "🚀 Configurando Clipeiro..." -ForegroundColor Green

# Verificar se Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js não encontrado. Instale Node.js 18+ primeiro." -ForegroundColor Red
    exit 1
}

# Verificar se MongoDB está instalado
try {
    mongod --version | Out-Null
    Write-Host "✅ MongoDB encontrado" -ForegroundColor Green
} catch {
    Write-Host "⚠️  MongoDB não encontrado. Instale MongoDB ou use MongoDB Atlas." -ForegroundColor Yellow
}

# Verificar se FFmpeg está instalado
try {
    ffmpeg -version | Out-Null
    Write-Host "✅ FFmpeg encontrado" -ForegroundColor Green
} catch {
    Write-Host "⚠️  FFmpeg não encontrado. Instale FFmpeg para processamento de vídeo." -ForegroundColor Yellow
}

# Instalar dependências
Write-Host "📦 Instalando dependências..." -ForegroundColor Blue
npm install

# Criar diretórios necessários
Write-Host "📁 Criando diretórios..." -ForegroundColor Blue
New-Item -ItemType Directory -Force -Path "uploads\videos" | Out-Null
New-Item -ItemType Directory -Force -Path "uploads\backgrounds" | Out-Null

# Copiar arquivo de ambiente
if (-not (Test-Path ".env.local")) {
    Write-Host "⚙️  Criando arquivo de configuração..." -ForegroundColor Blue
    Copy-Item ".env.example" ".env.local"
    Write-Host "✅ Arquivo .env.local criado. Configure suas variáveis de ambiente." -ForegroundColor Green
}

# Verificar configuração
Write-Host "🔍 Verificando configuração..." -ForegroundColor Blue

if (-not (Test-Path ".env.local")) {
    Write-Host "❌ Arquivo .env.local não encontrado." -ForegroundColor Red
    exit 1
}

# Verificar se as variáveis estão configuradas
$envContent = Get-Content ".env.local" -Raw
if ($envContent -match "seu_jwt_secret_super_seguro_aqui") {
    Write-Host "⚠️  Configure suas variáveis de ambiente no arquivo .env.local" -ForegroundColor Yellow
}

Write-Host "✅ Configuração concluída!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos passos:" -ForegroundColor Cyan
Write-Host "1. Configure as variáveis de ambiente em .env.local" -ForegroundColor White
Write-Host "2. Inicie o MongoDB (se local)" -ForegroundColor White
Write-Host "3. Execute: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Acesse: http://localhost:3000" -ForegroundColor Cyan

