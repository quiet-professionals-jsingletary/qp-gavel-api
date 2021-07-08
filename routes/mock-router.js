/*/
 *  ┌────────────────────────┐
 *  │ |>  Mock-Data Routes   │
 *  └────────────────────────┘
/*/
const express = require('express');
const router = express.Router();
const { 
  securityTokenMock,
  devicesMock,
  gitHubMock 
} = require('../api/mock-api');

// Mock-Api
router.get('/mock-token', securityTokenMock);
router.get('/mock-data', devicesMock);
router.get('/mock-data-test', gitHubMock);

module.exports = router;
