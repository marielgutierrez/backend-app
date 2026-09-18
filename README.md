# Backend REST API - Canciones Famosas (Node.js + Express + MongoDB)

Esta es una aplicación backend RESTful desarrollada en **Node.js**, **Express** y **MongoDB** (Mongoose) centrada en el catálogo de **Canciones Famosas** de la historia musical (Queen, Michael Jackson, Beatles, Nirvana, Guns N' Roses, Ed Sheeran, etc.).

> **NOTA IMPORTANTE:** Esta aplicación incluye **10 errores/bugs deliberados no documentados en el código de producción**, diseñados para ser descubiertos mediante pruebas de integración, auditoría de código o análisis de comportamiento.

---

## 📋 Requisitos Previos

- **Node.js**: v18.0.0 o superior
- **npm**: v9.0.0 o superior
- **MongoDB**: Instancia local corriendo en `mongodb://localhost:27017` o MongoDB Atlas URI.

---

## 🚀 Instalación y Configuración

1. **Clonar / Ubicar el proyecto** en tu entorno local.
2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```
   Asegúrate de que las variables concuerden con tu entorno:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/famous_songs_db
   JWT_SECRET=super_secret_famous_songs_key_2026
   ERRORS_ENCRYPTION_KEY=backend-secret-key-2026
   ```

---

## 💾 Poblado de la Base de Datos (Seed Script)

Para cargar la base de datos con las 15 canciones famosas iniciales y artistas icónicos, ejecuta el script de seed:

```bash
npm run seed
```

*Respuesta esperada:*
```text
Conectando a MongoDB para poblar datos: mongodb://localhost:27017/famous_songs_db
Colecciones anteriores eliminadas.
✓ 5 Artistas insertados exitosamente.
✓ 15 Canciones Famosas insertadas exitosamente.
¡Base de datos poblada con éxito con canciones famosas!
```

---

## ⚡ Ejecución del Servidor

- **Modo Desarrollo** (con recarga automática):
  ```bash
  npm run dev
  ```

- **Modo Producción**:
  ```bash
  npm start
  ```

El servidor estará escuchando en `http://localhost:5000`.

---

## 🔐 Listado de Errores Encriptado

El proyecto incluye el archivo `ERRORS.md.enc` con el listado cifrado mediante el **Cifrado Vigenère** (Algoritmo 2 - Clave alfabética: `CANCIONES`) de los 10 errores deliberados y sus efectos esperados.

Para desencriptar este archivo, utiliza una herramienta externa de desencriptación seleccionando **Cifrado Vigenère** e ingresando la clave `CANCIONES`.

---

## 📡 Documentación de la API REST

Todas las respuestas de la API utilizan el formato **JSON**.

### 1. Canciones (`/api/songs`)

| Método | Endpoint | Descripción | Parámetros Query / Body |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/songs` | Listar canciones (soporta paginación y filtros por artista/género) | `page`, `limit`, `artist`, `genre` |
| `GET` | `/api/songs/search` | Buscar canciones por título | `q=bohemian` |
| `GET` | `/api/songs/:id` | Obtener detalle de una canción por su ID | - |
| `GET` | `/api/songs/:id/stats` | Obtener estadísticas y promedio de calificación | - |
| `POST` | `/api/songs` | Registrar una nueva canción *(Ruta protegida)* | Body JSON (title, artist, album, genre, releaseYear, durationSeconds) |
| `PUT` | `/api/songs/:id` | Actualizar datos de una canción | Body JSON con campos a modificar |
| `DELETE` | `/api/songs/:id` | Eliminar una canción por ID | - |
| `POST` | `/api/songs/:id/rate` | Agregar calificación (score: 1 a 5) | Body JSON `{ "score": 5, "user": "Carlos" }` |

### 2. Artistas (`/api/artists`)

| Método | Endpoint | Descripción | Parámetros |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/artists` | Listar todos los artistas | - |
| `GET` | `/api/artists/:id` | Obtener artista por ID | - |
| `POST` | `/api/artists` | Registrar un nuevo artista | Body JSON (`name`, `country`, `formedYear`, `genre`, `bio`) |

---

## 🛠️ Estructura del Proyecto

```text
backend/
├── .env.example
├── .gitignore
├── package.json
├── README.md
├── ARCHITECTURE.md
├── doc_errores1.txt
├── scripts/
│   ├── encryptErrors.js
│   └── decryptErrors.js
└── src/
    ├── index.js
    ├── config/
    │   └── db.js
    ├── seed/
    │   ├── songsSeedData.js
    │   └── seed.js
    ├── models/
    │   ├── Song.js
    │   └── Artist.js
    ├── controllers/
    │   ├── songController.js
    │   └── artistController.js
    ├── middlewares/
    │   ├── authMiddleware.js
    │   ├── queryFilterMiddleware.js
    │   └── errorHandler.js
    └── routes/
        ├── songRoutes.js
        └── artistRoutes.js
```
# backend-app
