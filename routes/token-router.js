/*/
 *  ┌────────────────────────────┐
 *  │ |>  Security Token Routes  │
 *  └────────────────────────────┘
/*/
const express = require('express');
const router = express.Router();
const { securityToken } = require('../api/security-token');

router.get('/security-token', securityToken);

module.exports = router;