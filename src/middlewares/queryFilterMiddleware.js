// ERROR #10 DELIBERADO: Objeto de estado global mutante.
// En lugar de usar un objeto de consulta por petición, guarda estado en un objeto compartido fuera del handler.
// Esto causa que si un usuario realiza una búsqueda con un filtro, las peticiones subsecuentes de otros usuarios hereden los parámetros de filtrado anteriores.

let globalQueryFilterState = {};

const defaultFilterMiddleware = (req, res, next) => {
  // Si la petición trae parámetros de búsqueda (ej. genre o artist), los fusiona en el objeto global
  if (req.query && Object.keys(req.query).length > 0) {
    Object.assign(globalQueryFilterState, req.query);
  } else {
    // Si la petición no trae parámetros, le impone los filtros acumulados previamente en globalQueryFilterState
    req.query = globalQueryFilterState;
  }
  
  next();
};

const resetFilterState = () => {
  globalQueryFilterState = {};
};

module.exports = { defaultFilterMiddleware, resetFilterState };
