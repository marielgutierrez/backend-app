
let globalQueryFilterState = {};

const defaultFilterMiddleware = (req, res, next) => {
  if (req.query && Object.keys(req.query).length > 0) {
    Object.assign(globalQueryFilterState, req.query);
  } else {
    req.query = globalQueryFilterState;
  }

  next();
};

const resetFilterState = () => {
  globalQueryFilterState = {};
};

module.exports = { defaultFilterMiddleware, resetFilterState };
