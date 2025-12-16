import asyncHandler from './asyncHandler.js';
import { buildListQuery, buildPaging } from './queryBuilder.js';
import { successResponse } from './responseFormatter.js';

export const crudFactory = (Model) => {
  return {
    // GET /api/resource?q=search&category=id&lat=-17.39&lon=-66.16&maxDistance=2000&page=1&limit=20
    list: asyncHandler(async (req, res) => {
      const { query, options } = buildListQuery(req.query, Model);
      
      const [data, total] = await Promise.all([
        Model.find(query)
          .limit(options.limit)
          .skip((options.page - 1) * options.limit)
          .sort(options.sort)
          .populate(options.populate || '')
          .lean(),
        Model.countDocuments(query)
      ]);

      res.json(successResponse(data, {
        page: options.page,
        limit: options.limit,
        total,
        pages: Math.ceil(total / options.limit)
      }));
    }),

    // GET /api/resource/:id
    getById: asyncHandler(async (req, res) => {
      const doc = await Model.findById(req.params.id)
        .populate(req.query.populate || '')
        .lean();
      
      if (!doc) {
        return res.status(404).json({
          ok: false,
          message: `${Model.modelName} no encontrado`
        });
      }

      // Incrementar vistas
      if (doc.metadata) {
        await Model.findByIdAndUpdate(req.params.id, {
          $inc: { 'metadata.views': 1 }
        });
      }

      res.json(successResponse(doc));
    }),

    // POST /api/resource
    create: asyncHandler(async (req, res) => {
      const doc = await Model.create(req.body);
      res.status(201).json(successResponse(doc));
    }),

    // PUT /api/resource/:id
    update: asyncHandler(async (req, res) => {
      const doc = await Model.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!doc) {
        return res.status(404).json({
          ok: false,
          message: `${Model.modelName} no encontrado`
        });
      }

      res.json(successResponse(doc));
    }),

    // DELETE /api/resource/:id
    remove: asyncHandler(async (req, res) => {
      const doc = await Model.findByIdAndDelete(req.params.id);

      if (!doc) {
        return res.status(404).json({
          ok: false,
          message: `${Model.modelName} no encontrado`
        });
      }

      res.json(successResponse({ deleted: true, id: req.params.id }));
    })
  };
};
