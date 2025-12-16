import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    es: { type: String, required: true, unique: true, trim: true },
    en: { type: String, trim: true }
  },
  description: {
    es: { type: String },
    en: { type: String }
  },
  type: {
    type: String,
    required: true,
    enum: ['attraction', 'restaurant', 'food', 'hotel', 'poi', 'route'],
    index: true
  },
  icon: { type: String },
  color: { type: String },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  order: { type: Number, default: 0 },
  active: { type: Boolean, default: true }
}, {
  timestamps: true
});

export default mongoose.model('Category', categorySchema);
