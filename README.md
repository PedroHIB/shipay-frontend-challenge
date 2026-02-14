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
