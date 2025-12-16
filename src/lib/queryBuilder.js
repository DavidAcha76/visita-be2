export const buildListQuery = (queryParams, Model) => {
  const {
    q,
    category,
    tags,
    lat,
    lon,
    maxDistance = 5000,
    minPrice,
    maxPrice,
    priceLevel,
    stars,
    difficulty,
    active = 'all',  // Cambiar a 'all' por defecto
    page = 1,
    limit = 20,
    sort = '-createdAt',
    populate = ''
  } = queryParams;

  const query = {};
  
  // NO filtrar por active si es 'all'
  if (active !== 'all') {
    query.active = active === 'true';
  }

  if (q) {
    query.$text = { $search: q };
  }

  if (category) {
    query.category = category;
  }

  if (tags) {
    const tagsArray = tags.split(',').map(t => t.trim().toLowerCase());
    query.tags = { $all: tagsArray };
  }

  if (lat && lon) {
    query.location = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [parseFloat(lon), parseFloat(lat)]
        },
        $maxDistance: parseInt(maxDistance)
      }
    };
  }

  if (minPrice || maxPrice) {
    const priceQuery = {};
    if (minPrice) priceQuery.$gte = parseFloat(minPrice);
    if (maxPrice) priceQuery.$lte = parseFloat(maxPrice);
    query['priceRange.min'] = priceQuery;
  }

  if (priceLevel) {
    query.priceLevel = parseInt(priceLevel);
  }

  if (stars) {
    query.stars = parseInt(stars);
  }

  if (difficulty) {
    query.difficulty = difficulty;
  }

  const options = buildPaging(parseInt(page), parseInt(limit));
  options.sort = sort;
  options.populate = populate;

  return { query, options };
};

export const buildPaging = (page = 1, limit = 20) => {
  const maxLimit = 100;
  const validPage = Math.max(1, page);
  const validLimit = Math.min(Math.max(1, limit), maxLimit);

  return {
    page: validPage,
    limit: validLimit
  };
};
