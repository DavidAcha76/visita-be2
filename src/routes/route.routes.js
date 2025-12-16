import express from 'express';
import { crudFactory } from '../lib/crudFactory.js';
import Route from '../models/Route.js';
import validate from '../middleware/validator.js';
import { routeSchema } from '../validators/route.validator.js';

const router = express.Router();
const crud = crudFactory(Route);

router.get('/', crud.list);
router.get('/:id', crud.getById);
router.post('/', validate(routeSchema), crud.create);
router.put('/:id', validate(routeSchema.partial()), crud.update);
router.delete('/:id', crud.remove);

export default router;
