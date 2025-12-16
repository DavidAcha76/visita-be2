import mongoose from 'mongoose';
import { addCommonFields } from './common.schema.js';

const foodSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'BOB'
  },
  ingredients: [{ type: String }],
  isVegetarian: { type: Boolean, default: false },
  isVegan: { type: Boolean, default: false },
  spicyLevel: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  allergens: [{ type: String }],
  nutritionalInfo: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number
  },
  averageRating: { type: Number, min: 0, max: 5, default: 0 },
  reviewCount: { type: Number, default: 0 }
});

addCommonFields(foodSchema);

foodSchema.index({ category: 1 });
foodSchema.index({ price: 1 });
foodSchema.index({ tags: 1 });

export default mongoose.model('Food', foodSchema);
