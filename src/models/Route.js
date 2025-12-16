import mongoose from 'mongoose';
import { addCommonFields } from './common.schema.js';

const routeSchema = new mongoose.Schema({
  geometry: {
    type: {
      type: String,
      enum: ['LineString'],
      required: true,
      default: 'LineString'
    },
    coordinates: {
      type: [[Number]], // Array de [longitude, latitude]
      required: true,
      validate: {
        validator: (coords) => coords.length >= 2,
        message: 'Una ruta debe tener al menos 2 puntos'
      }
    }
  },
  distanceKm: {
    type: Number,
    required: true,
    min: 0
  },
  durationMin: {
    type: Number,
    required: true,
    min: 0
  },
  difficulty: {
    type: String,
    enum: ['easy', 'moderate', 'hard'],
    default: 'moderate'
  },
  transportMode: {
    type: String,
    enum: ['walking', 'cycling', 'driving', 'public_transport'],
    default: 'walking'
  },
  waypoints: [{
    name: { type: String, required: true },
    description: { type: String },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: [Number] // [longitude, latitude]
    },
    order: { type: Number, required: true }
  }],
  elevationGain: { type: Number }, // metros
  isCircular: { type: Boolean, default: false }
});

addCommonFields(routeSchema);

routeSchema.index({ geometry: '2dsphere' });
routeSchema.index({ difficulty: 1 });
routeSchema.index({ transportMode: 1 });

export default mongoose.model('Route', routeSchema);
