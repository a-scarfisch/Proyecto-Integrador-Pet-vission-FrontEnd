# 🐾 PetVission — Frontend

Interfaz web del sistema PetVission, desarrollada con HTML5, CSS3, Bootstrap 5 y JavaScript.

---

## 🚀 Cómo correr el proyecto

No requiere instalación ni servidor.

1. Clonar el repositorio
   git clone https://github.com/DiegoPenaG/petvission-frontend

2. Abrir index.html en el navegador
   — O usar la extensión Live Server en VS Code (recomendado)

---

## 📁 Estructura del proyecto
```
petvission-frontend/
├── index.html                  ← Landing page pública
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js
│   │   ├── auth.js
│   │   └── api.js
│   └── img/
│       └── logo.png
├── pages/
│   ├── auth/
│   │   ├── login.html
│   │   └── register.html
│   ├── client/
│   │   ├── dashboard.html
│   │   ├── mascotas.html
│   │   └── citas.html
│   ├── shop/
│   │   ├── catalogo.html
│   │   ├── carrito.html
│   │   └── checkout.html
│   ├── vet/
│   │   └── agenda.html
│   └── admin/
│       └── dashboard.html
└── README.md
```
---

## 🌐 Páginas del sistema

| Página | Ruta | Sprint |
|---|---|---|
| Landing page | `index.html` |
| Login | `pages/auth/login.html` | 
| Registro | `pages/auth/register.html` | 
| Dashboard cliente | `pages/client/dashboard.html` |
| Mis mascotas | `pages/client/mascotas.html` | 
| Mis citas | `pages/client/citas.html` |
| Catálogo | `pages/shop/catalogo.html` | 
| Carrito | `pages/shop/carrito.html` | 
| Agenda veterinario | `pages/vet/agenda.html` | 
| Panel admin | `pages/admin/dashboard.html` | 

---

## 🔗 Backend
API REST disponible en `http://localhost:8080/api`  
Repositorio: [petvission-backend](#)

---

## 📌 Convenciones de ramas y commits
Ver guía completa en el repo raíz.
