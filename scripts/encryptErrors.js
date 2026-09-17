const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });

// Clave alfabética para Cifrado Vigenère
const VIGENERE_KEY = process.env.VIGENERE_KEY || 'CANCIONES';

const errorsContent = `# LISTADO DE 10 ERRORES DELIBERADOS EN EL BACKEND Y SUS EFECTOS

Este documento contiene la lista detallada de los 10 errores/bugs logicos y funcionales implementados en la aplicacion backend de Canciones Famosas.

---

### 1. Paginacion Off-by-One en Consulta de Canciones
- **Ubicacion:** \`src/controllers/songController.js\` (Funcion \`getSongs\`)
- **Descripcion:** El calculo del desplazar registros (\`skip\`) se calcula como \`const skip = page * limit;\` en lugar de \`((page - 1) * limit)\`.
- **Efecto:** Al solicitar la pagina 1 (\`page=1&limit=10\`), se omiten los primeros 10 registros de la base de datos, perdiendo siempre la primera pagina de resultados.

---

### 2. Falta de \`await\` en la Actualizacion de Canciones
- **Ubicacion:** \`src/controllers/songController.js\` (Funcion \`updateSong\`)
- **Descripcion:** Falta la palabra clave \`await\` antes de \`Song.findByIdAndUpdate()\`.
- **Efecto:** La funcion retorna inmediatamente un objeto Mongoose Query/Promise sin resolver con estado HTTP 200. La base de datos nunca actualiza los datos de la cancion y los cambios se pierden silenciosamente.

---

### 3. Vulnerabilidad y Foco de Crash en Regex de Busqueda
- **Ubicacion:** \`src/controllers/songController.js\` (Funcion \`searchSongs\`)
- **Descripcion:** El parametro de busqueda \`q\` se pasa directamente a \`$regex\` sin escapar caracteres especiales de Expresion Regular y sin la opcion \`i\` (case-insensitive).
- **Efecto:** Si un usuario busca terminos que incluyen corchetes, parentesis o signos como \`Queen (\` o \`*\`, el motor de MongoDB lanza un error de sintaxis en expresion regular, provocando un fallo 500 Unhandled Exception.

---

### 4. Validacion de Esquema Invertida para el Ano de Lanzamiento
- **Ubicacion:** \`src/models/Song.js\` (Propiedad \`releaseYear\`)
- **Descripcion:** El validador del campo \`releaseYear\` exige que el ano ingresado sea estrictamente mayor al ano actual (\`v > new Date().getFullYear()\`).
- **Efecto:** Rechaza la creacion o edicion de cualquier cancion lanzada en el pasado o presente (ej. 1975, 1982, 2024), haciendo imposible registrar o editar canciones famosas reales a traves del modelo de validacion de Mongoose.

---

### 5. Extraccion Erronea del Token JWT en Middleware de Autenticacion
- **Ubicacion:** \`src/middlewares/authMiddleware.js\` (Funcion \`protect\`)
- **Descripcion:** Al hacer \`authHeader.split(' ')\`, extrae \`parts[0]\` (que corresponde a la palabra \`"Bearer"\`) en lugar de \`parts[1]\` (el token JWT cifrado).
- **Efecto:** Todas las peticiones a rutas protegidas que envian un token Bearer valido reciben un error \`401 No autorizado / Token no valido\` porque intenta verificar la palabra "Bearer" como si fuera la firma JWT.

---

### 6. Operador MongoDB Incorrecto al Calificar Canciones
- **Ubicacion:** \`src/controllers/songController.js\` (Funcion \`rateSong\`)
- **Descripcion:** Al anadir una nueva calificacion a una cancion, se utiliza el operador \`$set\` en lugar de \`$push\` o \`$addToSet\`.
- **Efecto:** En lugar de acumular las calificaciones recibidas en el arreglo \`ratings\`, reemplaza todo el arreglo de calificaciones existentes por un solo elemento con la ultima calificacion.

---

### 7. Logica Invertida en Filtros Combinados ($or en lugar de $and)
- **Ubicacion:** \`src/controllers/songController.js\` (Funcion \`getSongs\`)
- **Descripcion:** Cuando el cliente filtra simultaneamente por artista y por genero (ej. \`GET /api/songs?artist=Queen&genre=Rock\`), la consulta construye la condicion usando \`$or\` en vez de \`$and\`.
- **Efecto:** En lugar de retornar unicamente las canciones de Queen que sean del genero Rock, retorna todas las canciones de Queen MAS todas las canciones de cualquier artista que sean de genero Rock.

---

### 8. Codigo de Estado HTTP Incoherente al Eliminar Registros
- **Ubicacion:** \`src/controllers/songController.js\` (Funcion \`deleteSong\`)
- **Descripcion:** Al eliminar exitosamente una cancion de la base de datos, el controlador responde con \`res.status(404).json(...)\`.
- **Efecto:** A pesar de que el registro fue borrado correctamente de MongoDB, el cliente recibe un codigo de error HTTP 404 (Not Found), lo que confunde a aplicaciones cliente y pruebas automatizadas de integracion.

---

### 9. Division por Cero / NaN en el Promedio de Calificaciones
- **Ubicacion:** \`src/controllers/songController.js\` (Funcion \`getSongStats\`)
- **Descripcion:** Para calcular el promedio de calificaciones de una cancion, divide la suma total entre \`song.ratings.length\`.
- **Efecto:** Si una cancion aun no posee calificaciones (\`length === 0\`), la operacion produce \`0 / 0 = NaN\`. Este valor \`NaN\` se guarda en la base de datos y corrompe las respuestas JSON emitidas al cliente.

---

### 10. Mutacion de Estado Global en Middleware de Consultas
- **Ubicacion:** \`src/middlewares/queryFilterMiddleware.js\` (Funcion \`defaultFilterMiddleware\`)
- **Descripcion:** Utiliza un objeto compartido \`globalQueryFilterState\` fuera de la peticion HTTP para almacenar y mutar los parametros de \`req.query\`.
- **Efecto:** Si un usuario realiza una consulta con filtros, ese estado persiste en memoria global del proceso Node.js. Las peticiones subsiguientes de otros usuarios sin parametros heredaran de forma no deseada los filtros aplicados por el usuario anterior.
`;

/**
 * Cifrado Vigenère (Algoritmo 2 - Clave Alfabética)
 */
function encryptVigenere(text, key) {
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  if (!cleanKey) throw new Error('La clave Vigenère debe contener letras alfabéticas');
  
  let keyIndex = 0;
  let result = '';

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const code = char.charCodeAt(0);

    // Mayúsculas A-Z (65-90)
    if (code >= 65 && code <= 90) {
      const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
      result += String.fromCharCode(((code - 65 + shift) % 26) + 65);
      keyIndex++;
    }
    // Minúsculas a-z (97-122)
    else if (code >= 97 && code <= 122) {
      const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 65;
      result += String.fromCharCode(((code - 97 + shift) % 26) + 97);
      keyIndex++;
    }
    // Espacios, símbolos, números y saltos de línea se preservan
    else {
      result += char;
    }
  }
  return result;
}

// Normalizar texto para eliminar tildes complejas y aplicar Cifrado Vigenère
const normalizedText = errorsContent.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
const encryptedData = encryptVigenere(normalizedText, VIGENERE_KEY);
const outputPath = path.join(__dirname, '../ERRORS.md.enc');

fs.writeFileSync(outputPath, encryptedData, 'utf8');
console.log(`✓ Archivo encriptado mediante CIFRADO VIGENÈRE (Clave: "${VIGENERE_KEY}") en: ${outputPath}`);
