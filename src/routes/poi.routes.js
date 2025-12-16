import express from 'express';
import { crudFactory } from '../lib/crudFactory.js';
import POI from '../models/POI.js';
import validate from '../middleware/validator.js';
import { poiSchema } from '../validators/poi.validator.js';

const router = express.Router();
const crud = crudFactory(POI);

router.get('/', crud.list);
router.get('/:id', crud.getById);
router.post('/', validate(poiSchema), crud.create);
router.put('/:id', validate(poiSchema.partial()), crud.update);
router.delete('/:id', crud.remove);

export default router;
