/*/
 *  ┌────────────────────────────┐
 *  │ |>  Security Token Routes  │
 *  └────────────────────────────┘
/*/
const express = require('express');
const router = express.Router();
const securities = require('../api/securities-api');

router.get('/token', securities.securityToken);

module.exports = router;