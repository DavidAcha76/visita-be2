import express from 'express';
import asyncHandler from '../lib/asyncHandler.js';
import { getWeather } from '../services/weather.service.js';
import { successResponse } from '../lib/responseFormatter.js';

const router = express.Router();

// GET /api/weather?lat=-17.39&lon=-66.16
router.get('/', asyncHandler(async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({
      ok: false,
      error: {
        message: 'Se requieren parámetros lat y lon',
        code: 'MISSING_COORDINATES'
      }
    });
  }

  const weather = await getWeather(parseFloat(lat), parseFloat(lon));
  res.json(successResponse(weather));
}));

export default router;
