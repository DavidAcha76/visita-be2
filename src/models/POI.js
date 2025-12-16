import mongoose from 'mongoose';
import { addCommonFields } from './common.schema.js';

const poiSchema = new mongoose.Schema({
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: (coords) => coords && coords.length === 2,
        message: 'Las coordenadas deben ser [longitud, latitud]'
      }
    }
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  type: { type: String, required: true, enum: ['museum', 'park', 'monument', 'viewpoint', 'historical', 'cultural', 'shopping', 'entertainment', 'other'] },
  address: { type: String, trim: true },
  icon: { type: String }
});

addCommonFields(poiSchema);
poiSchema.index({ location: '2dsphere' });
poiSchema.index({ type: 1 });
poiSchema.index({ category: 1 });

export default mongoose.model('POI', poiSchema);
