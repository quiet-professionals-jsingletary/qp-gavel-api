/*/
 *  ┌────────────────────────────┐
 *  │ |>  Query Data Routes      │
 *  └────────────────────────────┘
/*/
const express = require('express');
const router = express.Router();
const { devices } = require('../api/devices');

router.post('/area-query', devices);

module.exports = router;
