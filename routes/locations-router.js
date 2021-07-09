/*/
 *  ┌────────────────────────────┐
 *  │ |>  Query Data Routes      │
 *  └────────────────────────────┘
/*/
const express = require('express');
const router = express.Router();
const locations = require('../api/locations-api');

router.post('/area', locations.area);

module.exports = router;
