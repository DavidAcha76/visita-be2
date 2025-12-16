import express from 'express';
import { crudFactory } from '../lib/crudFactory.js';
import Hotel from '../models/Hotel.js';
import validate from '../middleware/validator.js';
import { hotelSchema } from '../validators/hotel.validator.js';

const router = express.Router();
const crud = crudFactory(Hotel);

router.get('/', crud.list);
router.get('/:id', crud.getById);
router.post('/', validate(hotelSchema), crud.create);
router.put('/:id', validate(hotelSchema.partial()), crud.update);
router.delete('/:id', crud.remove);

export default router;
