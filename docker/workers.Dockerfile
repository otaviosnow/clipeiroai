# 🤖 CLIPEIRO WORKERS DOCKERFILE
FROM node:18-alpine

# Instalar dependências do Playwright
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Configurar Playwright para usar Chromium instalado
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Diretório de trabalho
WORKDIR /app

# Copiar package files
COPY workers/package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código
COPY workers ./
COPY backend/src/models ../backend/src/models
COPY backend/src/config ../backend/src/config

# Criar diretórios
RUN mkdir -p temp logs

# Start
CMD ["node", "src/worker.js"]
