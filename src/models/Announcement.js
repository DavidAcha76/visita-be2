import mongoose from 'mongoose';
import { addCommonFields } from './common.schema.js';

const announcementSchema = new mongoose.Schema({
  content: {
    es: { type: String, required: true },
    en: { type: String }
  },
  category: {
    type: String,
    required: true,
    enum: ['event', 'news', 'alert', 'promotion'],
    default: 'news'
  },
  publishAt: {
    type: Date,
    required: true,
    default: () => new Date()
  },
  expiresAt: {
    type: Date,
    required: true
  },
  pinned: { type: Boolean, default: false },
  priority: {
    type: Number,
    min: 1,
    max: 10,
    default: 5
  },
  targetAudience: [{ type: String }], // e.g., ['tourists', 'locals', 'families']
  link: { type: String },
  active: { type: Boolean, default: true }
});

addCommonFields(announcementSchema);

announcementSchema.index({ expiresAt: 1 });
announcementSchema.index({ pinned: -1, publishAt: -1 });
announcementSchema.index({ category: 1 });

export default mongoose.model('Announcement', announcementSchema);
