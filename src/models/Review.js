import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  resource: {
    type: String,
    required: true,
    enum: ['Attraction', 'Restaurant', 'Hotel', 'Route', 'POI']
  },
  resourceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'resource'
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  title: {
    type: String,
    trim: true,
    maxlength: 100
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  user: {
    name: { type: String, required: true, trim: true },
    email: { type: String, lowercase: true, trim: true },
    avatar: { type: String }
  },
  helpful: { type: Number, default: 0 },
  verified: { type: Boolean, default: false },
  active: { type: Boolean, default: true }
}, {
  timestamps: true
});

reviewSchema.index({ resource: 1, resourceId: 1 });
reviewSchema.index({ rating: -1 });
reviewSchema.index({ createdAt: -1 });
reviewSchema.index({ resourceId: 1, active: 1 });

// Compound index para evitar duplicados
reviewSchema.index({ resourceId: 1, 'user.email': 1 }, { unique: true, sparse: true });

export default mongoose.model('Review', reviewSchema);
