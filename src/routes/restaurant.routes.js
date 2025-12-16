import express from 'express';
import { crudFactory } from '../lib/crudFactory.js';
import Restaurant from '../models/Restaurant.js';
import validate from '../middleware/validator.js';
import { restaurantSchema } from '../validators/restaurant.validator.js';

const router = express.Router();
const crud = crudFactory(Restaurant);

router.get('/', crud.list);
router.get('/:id', crud.getById);
router.post('/', validate(restaurantSchema), crud.create);
router.put('/:id', validate(restaurantSchema.partial()), crud.update);
router.delete('/:id', crud.remove);

export default router;
