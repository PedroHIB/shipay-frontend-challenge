# Shipay Front-End Engineer Challenge

Este repositório contém a implementação das tarefas propostas no desafio técnico para Front-End Engineer.

---

## ✅ Task 1 — Text Filter Feature

Implementação de um filtro dinâmico para a listagem de produtos transacionais.

### Features

- Text filter (case-insensitive)
- Debounced input (300ms)
- Result counter
- Empty state handling
- Clean and scalable component structure
- Unit tests using Vitest and React Testing Library

---

## 🛠 Tech Stack

- React
- TypeScript
- Vite (SWC)
- Vitest
- React Testing Library

---

## ▶️ How to Run

1. Install dependencies:

```
npm install
```

2. Start development server:

```
npm run dev
```

---

## 🧪 Run Tests

```
npm run test
```

---

## ✅ Task 2 — Pull Request Review

A implementação funciona parcialmente, porém identifiquei problemas relacionados à manipulação direta do state e uso de `forceUpdate`, o que viola o padrão de imutabilidade do React.

Recomendo refatorar utilizando `setState` corretamente ou migrar para functional component com hooks, garantindo previsibilidade, manutenibilidade e aderência às boas práticas atuais.

🔎 Detailed commented review available here:

[UserManagement.reviewed.js](./src/review/UserManagement.reviewed.js)

---

## ✅ Task 3 — Análise de Stack Trace (Debugging)

### 📌 Identificação da Causa

O erro reportado:

```
TypeError: Cannot read properties of null (reading 'map')
```

indica que o componente tentou executar o método `.map()` em uma variável que está com valor `null`.

Isso normalmente ocorre quando o estado responsável por armazenar a lista de produtos é inicializado como `null` e o componente renderiza antes que os dados sejam carregados (por exemplo, após uma requisição assíncrona).

---

### ⚠️ Explicação do Problema

Componentes React são renderizados pelo menos uma vez antes da conclusão de chamadas assíncronas (como requisições HTTP).

Se o estado inicial for `null` e o JSX tentar executar:

```
products.map(...)
```

ocorrerá erro em tempo de execução, pois `null` não possui o método `.map()`.

Isso demonstra ausência de renderização defensiva e tratamento adequado do estado inicial.

---

### ✅ Correção Sugerida

A forma mais segura é inicializar o estado como um array vazio:

```
const [products, setProducts] = useState([]);
```

Dessa forma, mesmo antes do carregamento dos dados, o método `.map()` poderá ser executado sem erro.

---

### 🔒 Alternativa com Renderização Condicional

Outra abordagem segura seria proteger a renderização:

```
if (!products) {
  return <p>Carregando...</p>;
}
```

ou

```
{Array.isArray(products) && products.map(product => (...))}
```

---

### 🎯 Conclusão

O erro é causado por tentativa de acesso a método de um valor `null`.  
A correção consiste em garantir que o estado inicial seja compatível com o uso do `.map()` ou aplicar renderização condicional defensiva.

Essa prática aumenta a robustez da aplicação e evita falhas em tempo de execução.

---

## ✅ Task 4 — Autenticação OAuth JWT + Estratégia de Performance (Server Side)

### 📌 Contexto

A aplicação Server Side em React precisa consumir múltiplos endpoints da API para manipular dados de um formulário de Leads.

Os endpoints exigem autenticação via OAuth com JWT com duração de 1 hora.

---

## 🔐 Estratégia de Autenticação (Server Side)

Como a aplicação é Server Side, as credenciais (`access_key` e `secret_key`) **não devem ser expostas ao cliente**.

Portanto, a geração do token deve ocorrer exclusivamente no servidor.

---

### 🏗 Arquitetura Proposta

1. O servidor realiza uma requisição POST para:

```
POST https://api.acme.com/auth
```

Enviando:

```
{
  access_key: process.env.ACCESS_KEY,
  secret_key: process.env.SECRET_KEY
}
```

2. A API retorna:

- access_token
- access_token_expires_in
- refresh_token
- refresh_token_expires_in

3. O servidor armazena o token temporariamente (em memória ou cache).

4. Todas as requisições subsequentes para os endpoints utilizam:

```
Authorization: Bearer <access_token>
```

---

## 🧠 Implementação Recomendada (Server)

### 🔹 Serviço de Autenticação

Criar um módulo responsável por:

- Gerar token
- Armazenar token em cache
- Renovar token automaticamente antes da expiração

Exemplo conceitual:

```
let cachedToken = null;
let tokenExpiration = null;

async function getAccessToken() {
  if (cachedToken && Date.now() < tokenExpiration) {
    return cachedToken;
  }

  const response = await fetch("https://api.acme.com/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: process.env.ACCESS_KEY,
      secret_key: process.env.SECRET_KEY
    })
  });

  const data = await response.json();

  cachedToken = data.access_token;
  tokenExpiration = Date.now() + (data.access_token_expires_in * 1000);

  return cachedToken;
}
```

---

## ⚡ Estratégias de Otimização de Performance

Como o formulário pode consumir múltiplos endpoints, podemos aplicar:

---

### 1️⃣ Cache de Token (Essencial)

Evita múltiplas requisições de autenticação a cada chamada de API.

O token deve ser reutilizado até próximo da expiração.

---

### 2️⃣ Requisições Paralelas

Caso o formulário precise de múltiplos dados:

```
const [products, categories, campaigns] = await Promise.all([
  fetchProducts(),
  fetchCategories(),
  fetchCampaigns()
]);
```

Reduz tempo total de resposta.

---

### 3️⃣ Camada BFF (Recomendado)

Criar um endpoint interno no servidor:

```
GET /leads/form-data
```

Esse endpoint:

- Obtém token
- Agrega múltiplos endpoints externos
- Retorna resposta consolidada para o front

Isso reduz:

- Latência
- Complexidade no front-end
- Exposição da API externa

---

### 4️⃣ Cache de Dados Não Sensíveis

Se alguns dados mudam pouco (ex: lista de categorias):

- Aplicar cache em memória (ex: Node Cache)
- Aplicar cache Redis (em produção)

---

### 5️⃣ Renovação Antecipada do Token

Renovar token alguns minutos antes da expiração evita erro 401 inesperado.

---

## 🔒 Considerações de Segurança

- Nunca expor `secret_key` no front-end.
- Utilizar variáveis de ambiente.
- Garantir HTTPS.
- Implementar tratamento de erro para 401.

---

## 🎯 Conclusão

A autenticação deve ocorrer exclusivamente no servidor, com cache inteligente do JWT.

Para performance, recomenda-se:

- Reutilização do token
- Requisições paralelas
- Agregação via BFF
- Cache estratégico

Essa abordagem garante:

- Segurança
- Escalabilidade
- Baixa latência
- Manutenabilidade

---

## ✅ Task 5 — Arquitetura utilizando padrão BFF (Back for Front-end)

---

## 📌 Conceito de BFF

O padrão **Back for Front-end (BFF)** consiste na criação de uma camada intermediária entre os clientes (Web, Mobile, Smart TV) e os microsserviços de back-end.

Cada BFF é responsável por adaptar e orquestrar os dados especificamente para as necessidades de um tipo de cliente.

### 🎯 Principal papel do BFF

- Agregar dados de múltiplos microsserviços
- Reduzir complexidade no front-end
- Adaptar payloads conforme o dispositivo
- Aplicar regras específicas por canal
- Melhorar performance e reduzir latência

### ✅ Benefícios no cenário da empresa de streaming

- Respostas otimizadas para cada dispositivo
- Menor acoplamento entre front-end e microsserviços
- Redução de overfetching e underfetching
- Melhor escalabilidade e manutenabilidade

---

## 🏗 Design da Solução

### 🎯 Decisão: Múltiplos BFFs

Eu implementaria **múltiplos BFFs**, um para cada tipo de cliente:

- BFF Web
- BFF Mobile
- BFF Smart TV

### 📌 Justificativa

Cada interface possui necessidades distintas:

- Web: muitos dados, alta personalização
- Mobile: payload leve, foco em performance
- Smart TV: navegação simplificada, foco em mídia

Um único BFF aumentaria a complexidade interna com múltiplas regras condicionais.

Separando BFFs:

- Código mais limpo
- Deploy independente
- Evolução isolada por plataforma

---

## 🧩 Diagrama Simplificado

```
[ Web App ] ------\
                    \
[ Mobile App ] -----> [ BFF Web / BFF Mobile / BFF TV ] ----> [ MS Catálogo ]
                    /                                       \--> [ MS Usuários ]
[ Smart TV ] -----/                                        \--> [ MS Streaming ]
```

Cada cliente se comunica apenas com seu respectivo BFF, que orquestra os microsserviços.

---

## ⚙ Distribuição de Lógicas e Responsabilidades

---

### a) Lógica para renderizar botões e layout

📍 Cliente

Justificativa:  
Layout e renderização são responsabilidades da camada de apresentação.

---

### b) Agregação de dados para "Recomendações Personalizadas" (Web)

📍 BFF Web

Justificativa:  
A tela exige combinação de dados do MS de Catálogo + MS de Usuários.  
A agregação deve ocorrer no BFF para evitar múltiplas chamadas no front-end.

---

### c) Lista simplificada de "Novos Lançamentos" (Mobile)

📍 BFF Mobile

Justificativa:  
O Mobile precisa payload reduzido.  
O BFF pode retornar apenas:

- título
- imagem
- duração

Evita overfetching.

---

### d) Registrar que usuário assistiu a um vídeo

📍 Microsserviço de Usuários

Justificativa:  
Essa é regra de negócio central.  
Deve permanecer no domínio responsável para manter consistência e integridade.

---

### e) Adaptar qualidade do stream conforme conexão

📍 MS de Streaming (principal)  
📍 Cliente Mobile (secundário)

Justificativa:

- O MS de Streaming deve implementar Adaptive Bitrate (ABR).
- O cliente pode fornecer métricas de rede.
- A lógica principal pertence ao serviço de streaming.

---

### f) Validação de formato de e-mail no cadastro

📍 Cliente Web (validação inicial)  
📍 Backend (validação definitiva)

Justificativa:

- Cliente: melhora UX
- Backend: garante integridade e segurança

---

## 🎯 Conclusão

O padrão BFF permite:

- Especialização por canal
- Melhor performance
- Separação clara de responsabilidades
- Escalabilidade independente

Para o cenário proposto, a implementação de múltiplos BFFs é a abordagem mais adequada.
