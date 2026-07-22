export const sendError = (res, message, statusCode = 500, details = null) => {
  const payload = { message };

  if (details) {
    payload.errors = details;
  }

  return res.status(statusCode).json(payload);
};
