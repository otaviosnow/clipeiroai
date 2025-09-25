# Guia de Contribuição

Obrigado por considerar contribuir para o Clipeiro! 🎬

## Como Contribuir

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/seu-usuario/clipeiro.git
cd clipeiro
```

### 2. Configurar Ambiente

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env.local

# Executar o projeto
npm run dev
```

### 3. Criar Branch

```bash
# Criar uma nova branch
git checkout -b feature/nova-funcionalidade
# ou
git checkout -b fix/corrigir-bug
```

### 4. Fazer Mudanças

- Siga as convenções de código
- Escreva testes para novas funcionalidades
- Atualize a documentação se necessário
- Execute os testes: `npm test`

### 5. Commit

```bash
# Adicionar mudanças
git add .

# Commit com mensagem descritiva
git commit -m "feat: adicionar nova funcionalidade"
```

### 6. Push e Pull Request

```bash
# Push para seu fork
git push origin feature/nova-funcionalidade

# Criar Pull Request no GitHub
```

## Convenções de Código

### Commits

Use o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` nova funcionalidade
- `fix:` correção de bug
- `docs:` mudanças na documentação
- `style:` formatação, ponto e vírgula, etc
- `refactor:` refatoração de código
- `test:` adição de testes
- `chore:` mudanças em ferramentas, configuração, etc

### Estrutura de Arquivos

```
src/
├── components/     # Componentes reutilizáveis
├── pages/         # Páginas da aplicação
├── api/           # API routes
├── lib/           # Utilitários
├── types/         # Definições TypeScript
└── styles/        # Estilos globais
```

### Nomenclatura

- **Componentes**: PascalCase (`VideoUpload.tsx`)
- **Arquivos**: camelCase (`videoUpload.ts`)
- **Variáveis**: camelCase (`userName`)
- **Constantes**: UPPER_SNAKE_CASE (`API_URL`)
- **Funções**: camelCase (`handleSubmit`)

### TypeScript

- Use tipos explícitos
- Evite `any`
- Use interfaces para objetos
- Documente funções complexas

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

const getUser = async (id: string): Promise<User> => {
  // implementação
};
```

### React

- Use hooks funcionais
- Evite re-renders desnecessários
- Use `useCallback` e `useMemo` quando apropriado
- Mantenha componentes pequenos e focados

```typescript
const VideoUpload: React.FC<VideoUploadProps> = ({ onUpload }) => {
  const [isUploading, setIsUploading] = useState(false);
  
  const handleUpload = useCallback(async (file: File) => {
    // implementação
  }, [onUpload]);
  
  return (
    // JSX
  );
};
```

## Testes

### Executar Testes

```bash
# Todos os testes
npm test

# Testes com coverage
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

### Escrever Testes

```typescript
import { render, screen } from '@testing-library/react';
import VideoUpload from './VideoUpload';

describe('VideoUpload', () => {
  it('should render upload area', () => {
    render(<VideoUpload onUpload={jest.fn()} />);
    expect(screen.getByText('Faça upload do seu vídeo')).toBeInTheDocument();
  });
});
```

## Documentação

### README

- Mantenha atualizado
- Inclua exemplos de uso
- Documente APIs públicas

### Código

- Use JSDoc para funções complexas
- Comente lógica de negócio
- Explique "por que", não "o que"

```typescript
/**
 * Processa um vídeo e gera múltiplos formatos de clipes
 * @param videoPath - Caminho para o arquivo de vídeo
 * @param formats - Array de formatos a serem gerados
 * @returns Promise com os clipes gerados
 */
const processVideo = async (videoPath: string, formats: string[]) => {
  // implementação
};
```

## Issues

### Reportar Bug

1. Verifique se já existe uma issue similar
2. Use o template de bug report
3. Inclua informações do ambiente
4. Adicione screenshots se aplicável

### Sugerir Feature

1. Verifique se já existe uma issue similar
2. Use o template de feature request
3. Descreva o problema e solução
4. Explique o valor para os usuários

## Pull Requests

### Processo

1. Fork o repositório
2. Crie uma branch
3. Faça suas mudanças
4. Adicione testes
5. Atualize documentação
6. Submeta o PR

### Template

Use o template de PR disponível no GitHub.

### Review

- Mantenha PRs pequenos e focados
- Responda a feedback rapidamente
- Seja respeitoso e construtivo
- Teste suas mudanças localmente

## Comunidade

### Código de Conduta

Siga nosso [Código de Conduta](CODE_OF_CONDUCT.md).

### Comportamento

- Seja respeitoso e inclusivo
- Ajude outros contribuidores
- Mantenha discussões focadas
- Seja paciente com iniciantes

### Canais de Comunicação

- **Issues**: Bugs e features
- **Discussions**: Perguntas e ideias
- **Discord**: Chat em tempo real

## Reconhecimento

Contribuidores serão reconhecidos no README e releases.

## Dúvidas?

- Abra uma issue
- Entre em contato: seu-email@exemplo.com
- Participe das discussions

---

Obrigado por contribuir! 🚀

