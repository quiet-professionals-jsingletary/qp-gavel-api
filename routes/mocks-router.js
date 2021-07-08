/*/
 *  ┌────────────────────────┐
 *  │ |>  Mock-Data Routes   │
 *  └────────────────────────┘
/*/
const express = require('express');
const router = express.Router();
const mocks = require('../api/mocks-api');

router.use('/mocks', mocks);

// Mock-Api
router.get('/security-token', mocks.securityTokenMock);
router.get('/locations', mocks.locations);
router.get('/gitHub', mocks.gitHub);

module.exports = router;
