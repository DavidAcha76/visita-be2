import mongoose from 'mongoose';
import { addCommonFields } from './common.schema.js';

const hotelSchema = new mongoose.Schema({
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
  address: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, lowercase: true, trim: true },
  website: { type: String, trim: true },
  stars: { type: Number, min: 1, max: 5, required: true },
  priceRange: { min: { type: Number, required: true }, max: { type: Number, required: true }, currency: { type: String, default: 'BOB' } },
  roomCount: { type: Number },
  amenities: [{ type: String }],
  checkIn: { type: String, default: '14:00' },
  checkOut: { type: String, default: '12:00' },
  averageRating: { type: Number, min: 0, max: 5, default: 0 },
  reviewCount: { type: Number, default: 0 }
});

addCommonFields(hotelSchema);
hotelSchema.index({ location: '2dsphere' });
hotelSchema.index({ stars: -1 });
hotelSchema.index({ 'priceRange.min': 1, 'priceRange.max': 1 });

export default mongoose.model('Hotel', hotelSchema);
