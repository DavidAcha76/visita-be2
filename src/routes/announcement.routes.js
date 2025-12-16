import express from 'express';
import { crudFactory } from '../lib/crudFactory.js';
import Announcement from '../models/Announcement.js';
import validate from '../middleware/validator.js';
import { announcementSchema } from '../validators/announcement.validator.js';
import asyncHandler from '../lib/asyncHandler.js';
import { successResponse } from '../lib/responseFormatter.js';

const router = express.Router();
const crud = crudFactory(Announcement);

router.get('/', crud.list);
router.get('/:id', crud.getById);
router.post('/', validate(announcementSchema), crud.create);
router.put('/:id', validate(announcementSchema.partial()), crud.update);
router.delete('/:id', crud.remove);

// Endpoint adicional para anuncios activos y no expirados
router.get('/active', asyncHandler(async (req, res) => {
  const now = new Date();
  const announcements = await Announcement.find({
    active: true,
    publishAt: { $lte: now },
    expiresAt: { $gte: now }
  }).sort({ pinned: -1, publishAt: -1 });

  res.json(successResponse(announcements));
}));

export default router;
