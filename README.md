## Simple Full-Stack Item Management Web App

A lightweight full-stack web application built to demonstrate core technical implementations using a **.NET 8 Web API** backend and a **React (Vite + TypeScript)** frontend. This project showcases a complete development lifecycle, including pagination, automated testing, and CI/CD deployment.

---

## Live Demo
* **Frontend (React):** [View Live App](https://csharp-react-frontend.incogpass.net/) 
* **Backend API (.NET):** [View API Endpoint](https://csharp-react.incogpass.net/) 

---

## Tech Stack

### Backend (.NET API)
* **Framework:** .NET 8 (Minimal API / Controller Pattern)
* **Architecture:** Repository Pattern, Dependency Injection
* **Testing:** xUnit, Moq
* **Containerization & Deployment:** Docker, Render.com

### Frontend (React)
* **Core:** React, TypeScript, Vite
* **Styling & Components:** Modern CSS / Responsive Design
* **Testing:** Vitest, React Testing Library (RTL), Happy-DOM
* **Deployment:** Vercel

### DevOps & CI/CD
* **Version Control:** Git & GitHub
* **CI/CD Pipeline:** GitHub Actions (Automated Linting, Unit Testing, and Build verification on every push to `master`)

---

## Key Features
1. **Advanced Pagination System:** Supports dynamic `pageNumber` and `pageSize` queries, complete with robust metadata (`totalRecords`, `totalPages`).
2. **Standardized API Client:** Centralized HTTP request wrapper in the frontend for clean data fetching and error management.
3. **Automated Quality Control (CI/CD):** Integrated GitHub Actions workflows that automatically build, test, and deploy code updates to production environments.
4. **Comprehensive Unit Testing:** High test coverage on both client and server sides to guarantee system reliability and maintainability.

---

## Project Architecture

```text
csharp_react/
├── Backend_API/          # .NET 8 Web API project
├── Backend_API.Tests/    # xUnit backend testing project
├── Frontend_React/       # React + Vite frontend project
│   └── src/
│       ├── components/   # UI components and colocated .test.tsx files
│       └── utils/        # API client and helper functions
└── .github/workflows/    # GitHub Actions CI/CD pipeline configurations

```
---

## Getting Started
To run this project locally, ensure you have the following installed:
.NET 8 SDK
Node.js (v20+ )

1. Clone the Repository
```bash
git clone https://github.com/tempgoodman/csharp_react.git
cd csharp_react
```

2. Run the Backend (.NET API)
```bash
cd Backend_API
dotnet run
```

3. Run the Frontend (React)
```bash
cd Frontend_React
npm install
npm run dev
```

---

## Running Tests
1. Backend Tests (xUnit)
```bash
dotnet test Backend_API.Tests
```

2. Frontend Tests (Vitest)
```bash
cd Frontend_React
npm run test
```
