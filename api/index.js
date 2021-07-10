/*/
*  ┌────────────────────────────────┐
*  │ |>  ReExport / Funnel Routes   │
*  └────────────────────────────────┘
/*/
const express = require('express'); 

// Routers
const locations = require('../routes/locations-router');
const securities = require('../routes/securities-router');
const mocks = require('../routes/mocks-router');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    "message": "Gavel Routes:",
  });
});

router.use('/locations', locations);
router.use('/securities', securities);
router.use('/mocks', mocks);

module.exports = router;
