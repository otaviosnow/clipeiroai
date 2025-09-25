# Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [Unreleased]

### Added
- Sistema de autenticação completo
- Upload de vídeos com drag & drop
- Geração automática de 10 formatos de clipes
- Sistema de agendamento de posts
- Painel administrativo
- Integração com TikTok, Instagram e YouTube
- Design responsivo e moderno

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- N/A

## [0.1.0] - 2024-01-15

### Added
- Estrutura base do projeto
- Configuração do Next.js 14
- Configuração do TypeScript
- Configuração do Tailwind CSS
- Configuração do MongoDB
- Sistema de autenticação JWT
- Middleware de proteção de rotas
- Componentes de UI reutilizáveis
- Sistema de upload de arquivos
- Processamento de vídeo com FFmpeg
- Sistema de agendamento
- Painel administrativo
- Documentação completa
- Scripts de configuração
- Configuração para deploy

### Changed
- N/A

### Deprecated
- N/A

### Removed
- N/A

### Fixed
- N/A

### Security
- Implementação de JWT para autenticação
- Validação de entrada de dados
- Sanitização de uploads
- Headers de segurança

---

## Como Contribuir

Para adicionar uma nova entrada no changelog:

1. Adicione sua mudança na seção `[Unreleased]`
2. Use o formato correto:
   - `### Added` para novas funcionalidades
   - `### Changed` para mudanças em funcionalidades existentes
   - `### Deprecated` para funcionalidades que serão removidas
   - `### Removed` para funcionalidades removidas
   - `### Fixed` para correções de bugs
   - `### Security` para correções de segurança

3. Quando fizer um release, mova as entradas de `[Unreleased]` para a nova versão
4. Adicione a data do release no formato `YYYY-MM-DD`

## Exemplos

```markdown
## [1.0.0] - 2024-01-15

### Added
- Nova funcionalidade de exportação
- Suporte a múltiplos idiomas

### Changed
- Melhorada a performance do upload
- Atualizada a interface do dashboard

### Fixed
- Corrigido bug na geração de clipes
- Resolvido problema de autenticação

### Security
- Corrigida vulnerabilidade XSS
- Implementada validação adicional de uploads
```

