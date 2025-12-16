import mongoose from 'mongoose';

export const addCommonFields = (schema) => {
  schema.add({
    slug: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true, 
      index: true 
    },
    name: { 
      es: { type: String, required: true, trim: true }, 
      en: { type: String, trim: true } 
    },
    description: { 
      es: { type: String, required: true }, 
      en: { type: String } 
    },
    images: [{
      url: { type: String, required: true },
      alt: { type: String },
      isPrimary: { type: Boolean, default: false }
    }],
    tags: [{ type: String, lowercase: true, trim: true }],
    active: { type: Boolean, default: true },
    metadata: { 
      views: { type: Number, default: 0 }, 
      likes: { type: Number, default: 0 } 
    }
  });

  schema.set('timestamps', true);
  schema.index({ 
    'name.es': 'text', 
    'description.es': 'text',
    'name.en': 'text', 
    'description.en': 'text',
    tags: 'text'
  });
  
  return schema;
};

// SIN index dentro - solo estructura
export const locationSchema = {
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
};
