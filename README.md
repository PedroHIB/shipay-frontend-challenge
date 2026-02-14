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
