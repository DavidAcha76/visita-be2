import express from 'express';
import { crudFactory } from '../lib/crudFactory.js';
import Category from '../models/Category.js';
import validate from '../middleware/validator.js';
import { categorySchema } from '../validators/category.validator.js';

const router = express.Router();
const crud = crudFactory(Category);

router.get('/', crud.list);
router.get('/:id', crud.getById);
router.post('/', validate(categorySchema), crud.create);
router.put('/:id', validate(categorySchema.partial()), crud.update);
router.delete('/:id', crud.remove);

export default router;
