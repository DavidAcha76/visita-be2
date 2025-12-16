// Construye filtros: texto, categorías, rango, geofiltro, etc.
export function buildListQuery(req) {
  const {
    q,              // texto
    category,       // id o slug
    minPrice, maxPrice,
    // Geo: lat, lon, maxDistance (metros)
    lat, lon, maxDistance,
    tags,           // array CSV
    has,            // "field1,field2" campos que deben existir (not null)
  } = req.query;

  const filter = {};

  // Texto (requiere índices de texto configurados en modelos)
  if (q) {
    filter.$text = { $search: q };
  }

  if (category) filter["category"] = category;
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  if (tags) {
    filter.tags = { $all: String(tags).split(",").map(s => s.trim()).filter(Boolean) };
  }

  if (has) {
    for (const f of String(has).split(",").map(x => x.trim())) {
      filter[f] = { $exists: true, $ne: null };
    }
  }

  if (lat && lon) {
    const d = Number(maxDistance || 3000);
    filter.location = {
      $near: {
        $geometry: { type: "Point", coordinates: [Number(lon), Number(lat)] },
        $maxDistance: d
      }
    };
  }

  return filter;
}

export function buildPaging(req, maxLimit = 100) {
  const page = Math.max(1, Number(req.query.page || 1));
  const limit = Math.min(maxLimit, Math.max(1, Number(req.query.limit || 20)));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
}
