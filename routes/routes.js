const express = require('express');
const { devices } = require('../api/devices');
const { securityTokenMock, devicesMock, gitHubMock } = require('../api/mock-api');
const { securityToken } = require('../api/security-token');
const router = express.Router();

// Prod-Api
router.get('/security-token', securityToken);
router.post('/location-data/area-query', devices);
// Mock-Api
router.get('/mock-token', securityTokenMock);
router.get('/mock-data', devicesMock);
router.get('/mock-data-test', gitHubMock);

module.exports = router;
