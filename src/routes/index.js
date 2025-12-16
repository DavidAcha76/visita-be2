import express from 'express';
import healthRoutes from './health.routes.js';
import attractionRoutes from './attraction.routes.js';
import restaurantRoutes from './restaurant.routes.js';
import hotelRoutes from './hotel.routes.js';
import routeRoutes from './route.routes.js';
import poiRoutes from './poi.routes.js';
import reviewRoutes from './review.routes.js';
import weatherRoutes from './weather.routes.js';
import pushRoutes from './push.routes.js';
import categoryRoutes from './category.routes.js';
import announcementRoutes from './announcement.routes.js';
import foodRoutes from './food.routes.js';

const router = express.Router();

router.use('/health', healthRoutes);
router.use('/attractions', attractionRoutes);
router.use('/restaurants', restaurantRoutes);
router.use('/hotels', hotelRoutes);
router.use('/routes', routeRoutes);
router.use('/pois', poiRoutes);
router.use('/reviews', reviewRoutes);
router.use('/weather', weatherRoutes);
router.use('/push', pushRoutes);
router.use('/categories', categoryRoutes);
router.use('/announcements', announcementRoutes);
router.use('/foods', foodRoutes);

export default router;
