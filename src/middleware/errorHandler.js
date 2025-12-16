import { ZodError } from 'zod';
import mongoose from 'mongoose';

const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Error de validación Zod
  if (err instanceof ZodError) {
    return res.status(400).json({
      ok: false,
      error: {
        message: 'Error de validación',
        code: 'VALIDATION_ERROR',
        details: err.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message
        }))
      }
    });
  }

  // Error de validación Mongoose
  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({
      ok: false,
      error: {
        message: 'Error de validación',
        code: 'VALIDATION_ERROR',
        details: Object.values(err.errors).map(e => ({
          field: e.path,
          message: e.message
        }))
      }
    });
  }

  // Error de ID inválido de MongoDB
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({
      ok: false,
      error: {
        message: 'ID inválido',
        code: 'INVALID_ID'
      }
    });
  }

  // Error de duplicado
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(409).json({
      ok: false,
      error: {
        message: `El campo ${field} ya existe`,
        code: 'DUPLICATE_KEY'
      }
    });
  }

  // Error genérico
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    ok: false,
    error: {
      message: err.message || 'Error interno del servidor',
      code: err.code || 'INTERNAL_ERROR',
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

export default errorHandler;
