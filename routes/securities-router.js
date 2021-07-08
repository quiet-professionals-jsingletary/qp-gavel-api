/*/
 *  ┌────────────────────────────┐
 *  │ |>  Security Token Routes  │
 *  └────────────────────────────┘
/*/
const express = require('express');
const router = express.Router();
const securities = require('../api/securities');

router.use('/securities', securities);

router.get('/token', securities.decryptedToken);

module.exports = router;