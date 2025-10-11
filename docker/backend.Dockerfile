# 🚀 CLIPEIRO BACKEND DOCKERFILE
FROM node:18-alpine

# Instalar FFmpeg
RUN apk add --no-cache ffmpeg

# Diretório de trabalho
WORKDIR /app

# Copiar package files
COPY backend/package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Copiar código
COPY backend ./

# Criar diretórios
RUN mkdir -p temp uploads logs

# Expor porta
EXPOSE 5000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start
CMD ["node", "src/server.js"]
