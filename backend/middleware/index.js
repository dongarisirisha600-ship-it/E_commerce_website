export function requestLogger(req, res, next) {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.statusCode || 500).json({ message: err.message || 'Internal Server Error' });
}
