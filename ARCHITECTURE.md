# Documentación de Arquitectura de Software - Famous Songs Backend

## 🏗️ Visión General de la Arquitectura

La aplicación adopta una arquitectura en capas (**Layered Architecture / MVC adaptado a REST API**) desacoplada, escrita en **Node.js** con **Express.js** y persistencia en **MongoDB** mediante **Mongoose ORM**.

```text
┌─────────────────────────────────────────────────────────┐
│                     Cliente (HTTP/JSON)                 │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                     Capa de Rutas                       │
│           (src/routes/songRoutes.js, etc.)              │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                   Capa de Middlewares                   │
│   (authMiddleware.js, queryFilterMiddleware.js, etc.)   │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                  Capa de Controladores                  │
│       (songController.js, artistController.js)          │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│              Capa de Modelos y Validación               │
│               (src/models/Song.js, etc.)                │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                Base de Datos (MongoDB)                  │
└─────────────────────────────────────────────────────────┘
```

---

## 🧩 Capas del Sistema

### 1. Capa de Servidor y Configuración (`src/index.js`, `src/config/db.js`)
- Inicializa el servidor Express, configura los middlewares globales (`cors`, `express.json`) y establece la conexión con MongoDB mediante Mongoose.

### 2. Capa de Rutas (`src/routes/`)
- Mapea las peticiones HTTP (`GET`, `POST`, `PUT`, `DELETE`) hacia sus respectivos controladores.
- Aplica middlewares específicos de ruta como autenticación o procesamiento de consultas.

### 3. Capa de Middlewares (`src/middlewares/`)
- **`authMiddleware.js`**: Verifica la presencia y validez del token JWT en el encabezado `Authorization`.
- **`queryFilterMiddleware.js`**: Pre-procesa los parámetros de búsqueda enviados en la URL.
- **`errorHandler.js`**: Captura las excepciones no manejadas y retorna respuestas estructuradas en JSON con el código de estado adecuado.

### 4. Capa de Controladores (`src/controllers/`)
- Contiene la lógica de negocio de la aplicación.
- Procesa la entrada del usuario (`req.body`, `req.params`, `req.query`), interactúa con los modelos Mongoose y construye las respuestas en formato JSON.

### 5. Capa de Modelos (`src/models/`)
- Define las estructuras de los documentos en MongoDB, tipos de datos, valores por defecto y reglas de validación del esquema (Mongoose Schemas).

---

## 📊 Modelo de Datos

### 1. Colección `Song` (Canciones Famosas)
- `title` (String, Requerido): Título de la obra (ej. "Bohemian Rhapsody").
- `artist` (String, Requerido): Nombre del artista o grupo.
- `album` (String): Álbum al que pertenece.
- `genre` (String, Requerido): Género musical.
- `releaseYear` (Number, Requerido): Año de lanzamiento de la canción.
- `durationSeconds` (Number, Requerido): Duración en segundos.
- `viewsCount` (Number): Reproducciones globales estimadas.
- `ratings` (Array de Objetos): Historial de calificaciones recibidas `{ score, user, date }`.
- `averageRating` (Number): Promedio de puntuación.
- `isFamousClassic` (Boolean): Flag de clasificación como clásico famoso.

### 2. Colección `Artist` (Artistas)
- `name` (String, Requerido): Nombre del solista o banda.
- `country` (String): País de origen.
- `formedYear` (Number): Año de formación o debut.
- `genre` (String): Género principal.
- `bio` (String): Breve reseña biográfica.

---

## 🔒 Mecanismo de Encriptado de Errores

Para preservar el propósito del laboratorio de pruebas sin exponer directamente los errores en el código documentado de la API:
- Se utiliza el **Cifrado Vigenère** (Algoritmo 2 - Cifrado clásico por clave alfabética).
- El archivo `ERRORS.md.enc` contiene el texto cifrado mediante el desplazamiento alfabético modular utilizando la clave `CANCIONES`.
- La clave alfabética proviene de la variable de entorno `VIGENERE_KEY`.
- El archivo está listo para ser desencriptado por cualquier aplicación o herramienta externa compatible con el Cifrado Vigenère usando la clave `CANCIONES`.
