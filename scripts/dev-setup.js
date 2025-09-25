#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando Clipeiro em modo de desenvolvimento...\n');

// Verificar se .env.local existe
const envPath = path.join(process.cwd(), '.env.local');
const envExamplePath = path.join(process.cwd(), '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    console.log('📋 Copiando .env.example para .env.local...');
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ Arquivo .env.local criado');
  } else {
    console.log('📝 Criando .env.local...');
    const envContent = `# Configuração de desenvolvimento
MONGODB_URI=mongodb://localhost:27017/clipeiro
JWT_SECRET=dev_jwt_secret_123456789
NEXTAUTH_SECRET=dev_nextauth_secret_123456789
NEXTAUTH_URL=http://localhost:3000

# Modo de desenvolvimento (bypass de autenticação)
DEV_BYPASS_AUTH=true
NODE_ENV=development

# Email (opcional para desenvolvimento)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app

# APIs das Redes Sociais (opcional)
TIKTOK_CLIENT_KEY=seu_tiktok_client_key
TIKTOK_CLIENT_SECRET=seu_tiktok_client_secret
INSTAGRAM_APP_ID=seu_instagram_app_id
INSTAGRAM_APP_SECRET=seu_instagram_app_secret
YOUTUBE_CLIENT_ID=seu_youtube_client_id
YOUTUBE_CLIENT_SECRET=seu_youtube_client_secret
`;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Arquivo .env.local criado com configurações de desenvolvimento');
  }
} else {
  console.log('✅ Arquivo .env.local já existe');
}

// Verificar se a variável DEV_BYPASS_AUTH está configurada
const envContent = fs.readFileSync(envPath, 'utf8');
if (!envContent.includes('DEV_BYPASS_AUTH=true')) {
  console.log('🔧 Adicionando DEV_BYPASS_AUTH=true...');
  const updatedContent = envContent + '\n# Modo de desenvolvimento (bypass de autenticação)\nDEV_BYPASS_AUTH=true\n';
  fs.writeFileSync(envPath, updatedContent);
  console.log('✅ DEV_BYPASS_AUTH configurado');
} else {
  console.log('✅ DEV_BYPASS_AUTH já está configurado');
}

// Criar diretórios necessários
const dirs = ['uploads', 'uploads/videos', 'uploads/backgrounds'];
dirs.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`📁 Diretório ${dir} criado`);
  } else {
    console.log(`✅ Diretório ${dir} já existe`);
  }
});

console.log('\n🎉 Configuração concluída!');
console.log('\n📋 Próximos passos:');
console.log('1. Execute: npm run dev');
console.log('2. Acesse: http://localhost:3000/dashboard');
console.log('3. Navegue pela interface sem precisar fazer login');
console.log('\n💡 Dicas:');
console.log('- Use a aba "Conexões" para simular conexões do navegador');
console.log('- Use a aba "Clipes" para ver os 10 formatos diferentes');
console.log('- Use a aba "Admin" para gerenciar vídeos de fundo');
console.log('\n🔧 Para desabilitar o modo de desenvolvimento:');
console.log('- Remova ou altere DEV_BYPASS_AUTH=false no .env.local');
console.log('- Reinicie o servidor');

