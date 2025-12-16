import mongoose from 'mongoose';
import { addCommonFields } from './common.schema.js';

const restaurantSchema = new mongoose.Schema({
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Category'
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      sparse: true
    }
  },
  address: { type: String, trim: true },
  phone: { type: String, trim: true },
  website: { type: String, trim: true },
  email: { type: String, lowercase: true, trim: true },
  priceLevel: { type: Number, min: 1, max: 4 },
  cuisineTypes: [{ type: String }],
  schedule: {
    monday: { open: String, close: String, closed: Boolean },
    tuesday: { open: String, close: String, closed: Boolean },
    wednesday: { open: String, close: String, closed: Boolean },
    thursday: { open: String, close: String, closed: Boolean },
    friday: { open: String, close: String, closed: Boolean },
    saturday: { open: String, close: String, closed: Boolean },
    sunday: { open: String, close: String, closed: Boolean }
  },
  features: [{ type: String }],
  averageRating: { type: Number, min: 0, max: 5, default: 0 },
  reviewCount: { type: Number, default: 0 }
}, { 
  strict: false
});

addCommonFields(restaurantSchema);
restaurantSchema.index({ location: '2dsphere' });

export default mongoose.model('Restaurant', restaurantSchema);
