# Configuração de Desenvolvimento

## Modo de Teste Local (Sem Login)

Para testar a interface localmente sem precisar fazer login, configure as seguintes variáveis de ambiente:

```env
# .env.local
DEV_BYPASS_AUTH=true
NODE_ENV=development
```

## Como Funciona

1. **Bypass de Autenticação**: O middleware ignora a verificação de token
2. **Dados Mock**: As APIs retornam dados simulados
3. **Interface Completa**: Você pode navegar por todas as funcionalidades

## Funcionalidades Disponíveis em Modo Dev

- ✅ Dashboard completo
- ✅ Upload de vídeos (simulado)
- ✅ Preview de clipes (dados mock)
- ✅ Sistema de conexões do navegador
- ✅ Postagem via navegador
- ✅ Painel administrativo
- ✅ Agendamento de posts

## Dados Mock Incluídos

- **Usuário**: Usuário de Teste (teste@clipeiro.com)
- **Contas Sociais**: TikTok, Instagram, YouTube
- **Vídeos**: 3 vídeos de exemplo
- **Clipes**: 10 formatos diferentes
- **Conexões**: Simulação de navegador conectado

## Como Testar

1. Configure `DEV_BYPASS_AUTH=true` no `.env.local`
2. Execute `npm run dev`
3. Acesse `http://localhost:3000/dashboard`
4. Navegue pelas abas sem precisar fazer login

## Desabilitar Modo Dev

Para usar autenticação real:
```env
DEV_BYPASS_AUTH=false
# ou remova a variável
```

## Sistema de Navegador Conectado

O sistema simula conexões através do navegador:

1. **Detecção**: Escaneia o navegador em busca de contas logadas
2. **Conexão**: Conecta automaticamente as contas encontradas
3. **Postagem**: Posta diretamente através do navegador
4. **Monitoramento**: Acompanha o progresso em tempo real

### Vantagens do Sistema de Navegador

- ✅ Não precisa de APIs oficiais
- ✅ Funciona com qualquer conta
- ✅ Postagem em tempo real
- ✅ Controle total do processo
- ✅ Sem limitações de rate limit

### Como Funciona

1. **Escaneamento**: Detecta contas logadas no navegador
2. **Conexão**: Estabelece conexão com as contas
3. **Postagem**: Abre as redes sociais e posta automaticamente
4. **Monitoramento**: Acompanha o progresso em tempo real

## Estrutura dos Dados Mock

```typescript
// Usuário mock
const MOCK_USER = {
  id: 'dev-user-123',
  name: 'Usuário de Teste',
  email: 'teste@clipeiro.com',
  socialAccounts: {
    tiktok: [...],
    instagram: [...],
    youtube: [...]
  }
}

// Clipes mock
const MOCK_CLIPS = [
  { format: 'split-screen-top', ... },
  { format: 'split-screen-bottom', ... },
  { format: 'zoom-focus', ... },
  // ... 10 formatos diferentes
]
```

## Próximos Passos

1. **Teste a Interface**: Navegue por todas as funcionalidades
2. **Teste o Upload**: Simule upload de vídeos
3. **Teste os Clipes**: Visualize os 10 formatos
4. **Teste as Conexões**: Simule conexões do navegador
5. **Teste a Postagem**: Simule postagem via navegador

## Troubleshooting

### Erro de Autenticação
- Verifique se `DEV_BYPASS_AUTH=true`
- Reinicie o servidor após mudanças

### Dados Não Carregam
- Verifique o console do navegador
- Confirme que as APIs estão retornando dados mock

### Interface Não Atualiza
- Limpe o cache do navegador
- Verifique se o hot reload está funcionando

