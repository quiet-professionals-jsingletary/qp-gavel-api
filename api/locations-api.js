const fetch = require('node-fetch');
const logger = require('../logs/logger');
const { asyncMiddleware } = require('./middleware/async-middleware');
const { decryptedToken, securityToken } = require('./securities-api');

require('dotenv').config();

const apiKey = process.env.API_KEY;

/*/  
 *  ┌────────────────────────────────────┐
 *  │ |> Api Endpoint - Location Data    │
 *  └────────────────────────────────────┘
 *  -- Rename this file to `location-data.js` when possible
/*/
const areas = asyncMiddleware(async (req, res, next) => {
  try {
    const searchUrl = "https://staging-bs-api.venntel.com/v1.5/locationData/search";

    // Headers
    const reqHeaders = new fetch.Headers();
    reqHeaders.append("Accept", "application/json");
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("TempSecurityToken", req.headers['tempsecuritytoken']);
    reqHeaders.append("Authorization", req.headers['authorization']);
    // myHeaders.append("User-Agent", "Quiet Professionals");

    logger.debug(`REQ PAYLOAD (server-side): ${JSON.stringify(req.body)}`);

    // NOTE: Error is meant for testing
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // Options
    let requestOptions = {
      method: 'POST',
      headers: reqHeaders,
      body: JSON.stringify(req.body),
      redirect: 'follow'
    };

    // Fetch
    const response = await fetch(searchUrl, requestOptions);

    const resJson = await response.json();
    logger.debug(`Serialized Data: ${resJson}`);
    res.json(resJson);

  } catch (error) {
    next(error);
    
  }

});


const pattern = asyncMiddleware(async (req, res, next) => {
  try {
    const searchUrl = "https://staging-bs-api.venntel.com/v1.5/locationData/search";

    logger.info('Decrypted Token: ', decryptedToken);
    logger.info('Request: ', req.body);

    // Headers
    const reqHeaders = new fetch.Headers();
    reqHeaders.append("Accept", "application/json");
    reqHeaders.append("Content-Type", "application/json");
    reqHeaders.append("TempSecurityToken", req.headers['tempsecuritytoken']);
    reqHeaders.append("Authorization", req.headers['authorization']);
    // myHeaders.append("User-Agent", "Quiet Professionals");

    logger.debug(`REQ PAYLOAD (server-side): ${JSON.stringify(req.body)}`);

    // Options
    let requestOptions = {
      method: 'POST',
      headers: reqHeaders,
      body: JSON.stringify(req.body),
      redirect: 'follow'
    };

    // Fetch
    const response = await fetch(searchUrl, requestOptions);

    const resJson = await response.json();
    logger.debug(`Serialized Data: ${resJson}`);
    res.json(resJson);

  } catch (error) {
    next(error);

  }

});

exports.area = areas;