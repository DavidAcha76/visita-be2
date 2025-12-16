import express from 'express';
import { crudFactory } from '../lib/crudFactory.js';
import Food from '../models/Food.js';
import validate from '../middleware/validator.js';
import { foodSchema } from '../validators/food.validator.js';

const router = express.Router();
const crud = crudFactory(Food);

router.get('/', crud.list);
router.get('/:id', crud.getById);
router.post('/', validate(foodSchema), crud.create);
router.put('/:id', validate(foodSchema.partial()), crud.update);
router.delete('/:id', crud.remove);

export default router;
