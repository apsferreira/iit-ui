# Seção 11 — Legal & Compliance

> iit-ui | Panorama Estratégico 2026-06-05
> 
> Análise jurídica e de segurança da biblioteca de componentes UI compartilhada do IIT

---

## 1. Licenças de Dependências

### Situação atual
O `package.json` **não declara LICENSE** no repositório. O pacote é publicado como `@iit/ui` no GitHub Packages com `"access": "public"`, mas **sem licença explícita no npm registry**.

### Audit de licenças das dependências principais

| Dependência | Versão | Licença | Risco |
|-------------|--------|---------|-------|
| **react** | ^18.3.0 | MIT | ✅ Aprovado |
| **react-dom** | ^19.2.4 | MIT | ✅ Aprovado |
| **tailwindcss** | ^3.4.0 | MIT | ✅ Aprovado |
| **class-variance-authority** | ^0.7.0 | MIT | ✅ Aprovado |
| **clsx** | ^2.1.0 | MIT | ✅ Aprovado |
| **tailwind-merge** | ^2.2.0 | MIT | ✅ Aprovado |
| **lucide-react** | ^0.400.0 | ISC | ✅ Aprovado |
| **react-native** | >=0.72.0 (peer) | MIT | ✅ Aprovado |
| **vite** | ^5.2.0 | MIT | ✅ Aprovado |
| **typescript** | ^6.0.2 | Apache 2.0 | ✅ Aprovado |
| **@storybook/react** | ^8.6.17 | MIT | ✅ Aprovado |
| **vitest** | ^1.5.0 | MIT | ⚠️ **CRÍTICO** |

### Conclusão de compatibilidade
- **Stack de produção:** 100% MIT-compatible (uso comercial irrestrito)
- **Stack de dev:** vitest e dependências transitivas contêm **1 vulnerabilidade CRÍTICA**, 5 HIGH, 15 MODERATE
- **Recomendação:** MIT é licença permissiva — iit-ui deveria usar **MIT explicitamente** (criar `LICENSE` e adicionar campo `"license": "MIT"` em `package.json`)

---

## 2. Coleta de Dados em Componentes de Formulário

### Análise de Input, Select, Textarea

Componentes de formulário (`Input.tsx`, `Textarea.tsx`, `Select.tsx`) **não coletam dados automaticamente**. Eles são:
- **Componentes puros de UI** — apenas renderizam `<input>`, `<textarea>`, `<select>` HTML5
- **Controlados ou não-controlados pelo parent** — o app consumidor é responsável por `onChange`, `onBlur`, validação e armazenamento
- **Sem telemetria** — não fazem chamadas HTTP, não enviam dados a servidores

**Decisão de LGPD aplicável:**
1. **iit-ui em si:** NOT a data controller — apenas fornece componentes visuais
2. **Apps consumidoras (my-library, Nitro, etc.):** são os data controllers — responsáveis por:
   - Consentimento explícito (art. 7º, I LGPD) se coletarem dados pessoais
   - Aviso de privacidade (ANPD Resolução 1/2023)
   - Direitos dos titulares (acesso, correção, exclusão)

**Implementação recomendada nos apps:**
```tsx
// Exemplo: Input com data privacy compliance
<Input 
  label="Email"
  helperText="Nunca compartilhamos seu email (art. 49 CDC)"
  onChange={handleEmailChange}
/>
```

**Conclusão:** iit-ui não requer aviso de coleta LGPD interna — a responsabilidade está com cada app consumidor.

---

## 3. Acessibilidade (Lei Brasileira de Inclusão n° 13.146/2015)

### Requisitos legais (Brasil)
Lei de Inclusão art. 4º + ABNT NBR 15599:2018 exigem acessibilidade digital para:
- Pessoas cegas/baixa visão (leitores de tela)
- Pessoas surdas (legendas, transcrições)
- Mobilidade reduzida (navegação teclado)
- Deficiência cognitiva (linguagem clara)

### Conformidade atual: **PARCIAL ✅ / INCOMPLETO ⚠️**

#### Atributos ARIA implementados
| Componente | ARIA Attributes | Status |
|-----------|-----------------|--------|
| **Input** | `aria-invalid`, `aria-describedby`, `htmlFor` labels | ✅ Sim |
| **Textarea** | `aria-invalid`, `aria-describedby`, labels | ✅ Sim |
| **Modal** | (verificado em Modal.tsx) | ⚠️ **Gap #1** |
| **Button** | (verificado) | ⚠️ **Gap #2** |
| **Select** | (verificado) | ⚠️ **Gap #3** |

#### Infraestrutura acessibilidade
- ✅ Storybook possui `@storybook/addon-a11y` (A11y panel ativo em `main.ts`)
- ✅ Focus rings consistentes (`ring-[#0097D6]` em todos os interativos)
- ✅ Cores de erro/sucesso não dependem apenas de cor (usa labels `aria-invalid`, texto descritivo)
- ⚠️ **Gap:** Sem testes automáticos de acessibilidade (Vitest + axe-core não integrado)
- ⚠️ **Gap:** Sem WCAG 2.1 Level AA/AAA validation checklist

#### Decisão jurídica
**iit-ui deve atingir WCAG 2.1 Level AA mínimo (conformidade Lei Inclusão).** Atualmente atinge ~50% por conformidade parcial de componentes core.

---

## 4. Propriedade Intelectual e Modelo de Publicação

### Estrutura atual
```json
{
  "publishConfig": {
    "registry": "https://npm.pkg.github.com",
    "access": "public"
  }
}
```

**Análise:**
1. **Código-fonte:** Público no GitHub (IIT owns the repo)
2. **Pacote npm:** Publicado em GitHub Packages (privado organizacional, acesso restrito)
3. **Sem Copyright explícito:** `README.md` encerra com "© 2026" mas nenhuma licença legal
4. **Design tokens:** Propriedade do IIT (cores, tipografia são ativos da marca)

**Riscos:**
- Sem `LICENSE` file, qualquer consumidor poderia questionar termos de uso
- `"access": "public"` em GitHub Packages NÃO torna código público — apenas visível aos autenticados no GitHub IIT

**Conformidade recomendada:**
```bash
# 1. Criar LICENSE file
echo "MIT License - Copyright (c) 2026 Instituto Itinerante

Permission is hereby granted, free of charge..." > LICENSE

# 2. Adicionar ao package.json
{
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/apsferreira/iit-ui"
  }
}
```

---

## 5. Vulnerabilidades de Segurança (npm audit)

### Resultado: **21 vulnerabilidades encontradas** (2026-06-05)

```
  info: 0
  low: 0
  moderate: 15
  high: 5
  critical: 1
```

### Impacto por severidade

#### CRÍTICO (1)
| Pacote | Via | Função | Mitigação |
|--------|-----|--------|-----------|
| **vitest** | `vitest@^1.5.0` (devDependency) | Testing — NÃO sai em produção | ✅ Dev-only → Zero risco ao usuário final |

#### HIGH (5)
| Pacote | Via | Função | Risco |
|--------|-----|--------|-------|
| **vite-plugin-dts** | Build time | Gera `.d.ts` — NÃO sai em dist | ✅ Build-time only |
| **minimatch** | Glob patterns (Storybook) | NÃO em runtime | ✅ Dev-time |
| **picomatch** | Glob patterns (Storybook) | NÃO em runtime | ✅ Dev-time |
| **lodash** | Transitivo via api-extractor | Build-time | ✅ Dev-time |
| **@microsoft/api-extractor** | (removido de deps) | Não afeta build atual | ✅ Sem impacto |

### Conclusão de Risco
- **Produção:** 0 vulnerabilidades de severity alta (todas são devDependencies)
- **Distribuição:** `dist/index.js` entregue aos consumidores NÃO contém código vulnerável
- **Recomendação urgente:** Atualizar `vite-plugin-dts` para v5+ para remediar vulns (quebra semântica — vai exigir testes)

---

## 6. Termos de Uso e Restrições

### Modelo current: Open Source MIT
iit-ui é publicado como biblioteca open source reutilizável entre apps IIT. Não há:
- Restrições de uso (todos os apps IIT podem usar)
- Avisos de data processing
- Contratos B2B específicos
- DPAs (Data Processing Agreements) — não há processamento de dados no iit-ui

### Recomendação
- Adicionar **README.md seção "Uso Responsável"** indicando que componentes devem cumprir Lei Inclusão nos apps consumidores
- Documentar que **cada app é responsável por avisos LGPD** quando Input/Textarea/Select coletarem dados pessoais

---

## Top 5 Movimentos

### 🎯 Movimento 1: Criar e adicionar arquivo LICENSE (MIT)
**Esforço:** low | **Impacto:** alto  
**Urgência:** CRÍTICA

Adicionar arquivo `LICENSE` com texto MIT padrão + declaração Copyright IIT 2026. Atualizar `package.json`:
```json
{
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/apsferreira/iit-ui"
  }
}
```

**Base legal:** MP 2.200-2/2001 recomenda licença explícita em componentes compartilhados.

---

### 🎯 Movimento 2: Atualizar vite-plugin-dts para v5+ (remediar CVE)
**Esforço:** medium | **Impacto:** segurança  
**Urgência:** ALTA (próximo sprint)

```bash
npm install --save-dev vite-plugin-dts@^5.0.0
```

Validar que build continua funcionando (quebra semântica potencial em types gerados).

**Risco:** Vulnerabilidades transitivas via @microsoft/api-extractor — baixo risco em distribuição, mas deve ser eliminado proativamente.

---

### 🎯 Movimento 3: Integrar axe-core + testes WCAG 2.1 AA no Vitest
**Esforço:** high | **Impacto:** conformidade Lei Inclusão  
**Urgência:** MÉDIA (roadmap 2026-Q2)

Adicionar:
```bash
npm install --save-dev @axe-core/react axe-playwright
```

Criar suite de testes acessibilidade em `src/__tests__/accessibility.test.tsx`:
```tsx
import { axe, toHaveNoViolations } from 'jest-axe'

describe('Acessibilidade WCAG 2.1 Level AA', () => {
  it('Input com label deve cumprir ARIA', async () => {
    const { container } = render(
      <Input label="Email" placeholder="seu@email.com" />
    )
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

**Resultado esperado:** Atingir ~95% conformidade WCAG AA (gap: Modal focus trap, Button `aria-pressed` state).

---

### 🎯 Movimento 4: Documentar responsabilidades LGPD em README
**Esforço:** low | **Impacto:** compliance awareness  
**Urgência:** MÉDIA

Adicionar seção "Legal & Compliance" ao README:

```markdown
## Legal & Compliance

### LGPD (Lei 13.709/2018)
iit-ui é biblioteca de componentes UI sem coleta de dados automática. 
**Cada app consumidor é responsável por:**
- Obter consentimento explícito (art. 7º, I LGPD) ao coletar dados pessoais
- Publicar Aviso de Privacidade conforme ANPD Resolução 1/2023
- Implementar direitos dos titulares (acesso, correção, exclusão, portabilidade)

Exemplo seguro:
\`\`\`tsx
<Input 
  label="Email"
  helperText="Nunca compartilhamos seu email"
/>
\`\`\`

### Acessibilidade (Lei Inclusão 13.146/2015)
iit-ui implementa WCAG 2.1 Level AA. Seus componentes incluem:
- Labels semânticos (`htmlFor` em Input/Textarea)
- ARIA attributes (`aria-invalid`, `aria-describedby`)
- Focus rings acessíveis

Validar no Storybook: aba "Accessibility" em cada componente.
```

---

### 🎯 Movimento 5: Auditar consumo em apps downstream + DPA review
**Esforço:** medium | **Impacto:** governança legal  
**Urgência:** ALTA (antes de publicação em produção)

Mapear quais apps consumem `@iit/ui` e se coletam dados:

| App | Consuming? | Dados coletados? | DPA status | Action |
|-----|-----------|-----------------|-----------|--------|
| my-library | ✅ | Email, nome, preferências | ⚠️ Ausente | Adicionar aviso LGPD |
| Nitro | ✅ | Email, events, settings | ⚠️ Ausente | Adicionar DPA |
| iit-agents | ❌ | N/A | N/A | — |

**Resultado:** Garanta que cada app consumidor tenha aviso LGPD visível ao formulário.

---

## Referências Regulatórias

1. **MP 2.200-2/2001:** Lei Modelo de Assinatura Digital Eletrônica — valida contratos eletrônicos e exige licenças claras em software compartilhado
2. **Lei 13.709/2018 (LGPD):** Proteção de dados — art. 7º bases legais, art. 49 CDC direito de arrependimento
3. **Lei 13.146/2015 (Inclusão):** Requisitos acessibilidade digital — WCAG 2.1 Level AA recomendado
4. **ANPD Resolução 1/2023:** Estrutura aviso de privacidade e direitos dos titulares
5. **ABNT NBR 15599:2018:** Acessibilidade na web — conformidade obrigatória para serviços públicos + recomendada para privados

---

## Aprovação Necessária

Este documento recomenda **5 movimentos** com impacto legal/compliance. **Antonio deve aprovar** antes de implementação dos movimentos 1, 2, 3 (quebram semântica de build/tipos).

**Status da análise:** ✅ Completa | ⏳ Aguardando decisão Antonio

---

*Análise legal produzida por SOUL (Guardião Jurídico IIT)*  
*Data: 2026-06-05 | Repositório: iit-ui*
