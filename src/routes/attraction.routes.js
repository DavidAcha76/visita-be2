import express from 'express';
import { crudFactory } from '../lib/crudFactory.js';
import Attraction from '../models/Attraction.js';
import validate from '../middleware/validator.js';
import { attractionSchema } from '../validators/attraction.validator.js';

const router = express.Router();
const crud = crudFactory(Attraction);

router.get('/', crud.list);
router.get('/:id', crud.getById);
router.post('/', validate(attractionSchema), crud.create);
router.put('/:id', validate(attractionSchema.partial()), crud.update);
router.delete('/:id', crud.remove);

export default router;
