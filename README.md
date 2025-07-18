# backend-app

Base de backend minimalista y modular para cualquier proyecto web, utilizando [NestJS](https://nestjs.com) y [Prisma ORM](https://www.prisma.io/).

## 🚀 Características principales

- ✅ Arquitectura modular con NestJS
- 🗃️ ORM Prisma con soporte para **PostgreSQL**, **MySQL** y **SQLite**
- 🔐 Autenticación con JWT
- 📬 Envío de correos con plantillas Handlebars
- 🧪 Documentación automática con Swagger
- 📝 Logging con Winston
- 🌱 Configuración por variables de entorno (`.env`)

---

## 📦 Instalación

```bash
npm install
```

---

## ⚙️ Configuración del entorno

Crea tu archivo `.env` a partir del ejemplo:

```bash
cp .env.example .env
```

Editá el archivo `.env` y elegí tu base de datos preferida.

---

## 🧪 Comandos útiles

| Acción                | Comando                      |
|------------------------|-------------------------------|
| Ejecutar en desarrollo | `npm run start:dev`           |
| Compilar el proyecto   | `npm run build`               |
| Crear migración DB     | `npx prisma migrate dev`      |
| Generar cliente Prisma | `npx prisma generate`         |
| Ver documentación API  | `http://localhost:3000/api-docs` |

---

## 🧠 Variables de entorno (`.env`)

```env
# Tipo de base de datos: postgresql, mysql o sqlite
DB_PROVIDER="sqlite"

# Conexión a PostgreSQL
# DATABASE_URL="postgresql://usuario:password@localhost:5432/tu_db"

# Conexión a MySQL
# DATABASE_URL="mysql://usuario:password@localhost:3306/tu_db"

# Conexión a SQLite (modo archivo local para pruebas)
DATABASE_URL="file:./dev.db"

# Clave secreta para JWT
JWT_SECRET=supersecreto123

# Configuración del correo
EMAIL_USER=tu_email@dominio.com
EMAIL_PASS=tu_password

# Puerto del servidor
PORT=3000
```

---

## 📂 Estructura del proyecto

```
src/
├── auth/           # Autenticación y JWT
├── mailer/         # Servicio para envío de correos
├── prisma/         # Servicio de Prisma y conexión a DB
├── common/         # Middlewares, filtros, helpers globales
├── main.ts         # Entrada principal
└── app.module.ts   # Módulo raíz
```

---

## 📌 Base de datos compatible con:

- ✅ PostgreSQL
- ✅ MySQL
- ✅ SQLite (modo archivo, ideal para desarrollo)

---

## 🧑‍💻 Autor

Hecho con 💻 por [@marcheloalbis](https://github.com/marcheloalbis)

---

## ⭐ Cómo usar este proyecto

Clonalo y construí tu API sobre esta base modular, limpia y profesional. ¡Listo para producción o pruebas!
