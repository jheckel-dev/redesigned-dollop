const router = require('express').Router();
const apiRoutes = require('./api');
const homepageRoutes = require('./homepage_routes');
const dashboardRoutes = require('./dashboard_routes');

const { route } = require('./homepage_routes');

router.use('/dashboard', dashboardRoutes);
router.use('/', homepageRoutes);
router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
});


module.exports = router;