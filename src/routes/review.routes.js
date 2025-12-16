import express from 'express';
import { crudFactory } from '../lib/crudFactory.js';
import Review from '../models/Review.js';
import validate from '../middleware/validator.js';
import { reviewSchema } from '../validators/review.validator.js';
import asyncHandler from '../lib/asyncHandler.js';
import { successResponse } from '../lib/responseFormatter.js';

const router = express.Router();
const crud = crudFactory(Review);

router.get('/', crud.list);
router.get('/:id', crud.getById);
router.post('/', validate(reviewSchema), crud.create);
router.put('/:id', validate(reviewSchema.partial()), crud.update);
router.delete('/:id', crud.remove);

// Obtener reviews de un recurso específico con promedio
router.get('/resource/:resourceId', asyncHandler(async (req, res) => {
  const { resourceId } = req.params;
  const { resource = 'Restaurant' } = req.query;

  const reviews = await Review.find({
    resourceId,
    resource,
    active: true
  }).sort({ createdAt: -1 });

  const avgRating = reviews.length > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  res.json(successResponse({
    reviews,
    summary: {
      total: reviews.length,
      averageRating: parseFloat(avgRating),
      distribution: {
        5: reviews.filter(r => r.rating === 5).length,
        4: reviews.filter(r => r.rating === 4).length,
        3: reviews.filter(r => r.rating === 3).length,
        2: reviews.filter(r => r.rating === 2).length,
        1: reviews.filter(r => r.rating === 1).length
      }
    }
  }));
}));

export default router;
