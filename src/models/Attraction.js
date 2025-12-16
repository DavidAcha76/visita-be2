import mongoose from 'mongoose';
import { addCommonFields } from './common.schema.js';

const attractionSchema = new mongoose.Schema({
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category'
    // NO es required - acepta datos sin categoría
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      sparse: true // Permite null/undefined
    }
  },
  address: { type: String, trim: true },
  phone: { type: String, trim: true },
  website: { type: String, trim: true },
  email: { type: String, lowercase: true, trim: true },
  schedule: {
    monday: { open: String, close: String, closed: Boolean },
    tuesday: { open: String, close: String, closed: Boolean },
    wednesday: { open: String, close: String, closed: Boolean },
    thursday: { open: String, close: String, closed: Boolean },
    friday: { open: String, close: String, closed: Boolean },
    saturday: { open: String, close: String, closed: Boolean },
    sunday: { open: String, close: String, closed: Boolean }
  },
  admission: { price: { type: Number, default: 0 }, currency: { type: String, default: 'BOB' }, isFree: { type: Boolean, default: false } },
  amenities: [{ type: String }],
  averageRating: { type: Number, min: 0, max: 5, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, { 
  strict: false // Permite campos adicionales de Firestore
});

addCommonFields(attractionSchema);
attractionSchema.index({ location: '2dsphere' });
attractionSchema.index({ category: 1, active: 1 });

export default mongoose.model('Attraction', attractionSchema);
