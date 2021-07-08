const fetch = require('node-fetch');
const logger = require('../logs/logger');
const { asyncMiddleware } = require('./middleware/async-middleware');
const { decryptedToken, securityToken } = require('./securities');

require('dotenv').config();

const apiKey = process.env.API_KEY;

/*/  
 *  ┌────────────────────────────────────┐
 *  │ |> Api Endpoint - Location Data    │
 *  └────────────────────────────────────┘
 *  -- Rename this file to `location-data.js` when possible
/*/
const areas = asyncMiddleware(async (req, res, next) => {

  // const { this: { locationData } = {} } = res;

  const searchUrl = "https://staging-bs-api.venntel.com/v1.5/locationData/search";

  let reqHeaders = new fetch.Headers();
  reqHeaders.append("Accept", "application/json");
  reqHeaders.append("Content-Type", "application/json");
  // reqHeaders.append("Content-Length", Buffer.byteLength(req));
  reqHeaders.append("TempSecurityToken", req.headers['tempsecuritytoken']);
  reqHeaders.append("Authorization", req.headers['authorization']);
  // myHeaders.append("User-Agent", "Quiet Professionals");

  // var raw = JSON.stringify({ "startDate": "2020-12-01T14:00:00Z", "endDate": "2020-12-01T17:00:00Z", "areas": [{ "longitude": -83.278488, "latitude": 30.832703, "radius": 50 }] });

  // console.log('Req Payload', req.body);
  logger.debug('REQ PAYLOAD (server-side): ', req.body);
  

  let requestOptions = {
    method: 'POST',
    headers: reqHeaders,
    body: JSON.stringify(req.body),
    redirect: 'follow'
  };

  // console.log('Req Options', requestOptions);

  let areaQueryFetch = await fetch(searchUrl, requestOptions);
  const fetchedJson = await areaQueryFetch.json();
  logger.debug('Serialized Data: ', fetchedJson);

  // Check SecurityToken
  if (res.status === 401) {
    // TODO: Log user out and notify them to log back in 
    // _Import the Calcite toaster module for niotifications
  }
  
  res.json(fetchedJson);
});


const pattern = asyncMiddleware(async (req, res, next) => {

  const searchUrl = "https://staging-bs-api.venntel.com/v1.5/locationData/search";
  // const searchUrl = "https://decryptvennteltemptoken.azurewebsites.us/api/FuncDecryptVenntelTT";

  logger.info('Token: ', decryptedToken);
  logger.info('Token: ', securityToken);
  logger.info('Request: ', req.body);

  let headers1 = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    // "Content-Security-Policy": "default-src *://*.azurewebsites.net",
    "Authorization": apiKey,
    "TempSecurityToken": decryptedToken,
  };

  // const payload1 = {
  //   "startDate": req.params.startDate,
  //   "endDate": req.params.endDate,
  //   "areas": [{
  //     "longitude": req.params.areas.longitude,
  //     "latitude": req.params.areas.latitude,
  //     "radius": req.params.areas.radius
  //   }]
  // };

  logger.group('Payload: ');
  logger.info("Headers: ", headers1);
  logger.info("Body: ", req.body);
  logger.groupEnd();

  // res.send(headers1);

  const fetch_res1 = await fetch(searchUrl, {
    "method": "POST",
    "headers": headers1,
    "body": req.body
  });

  const json1 = await fetch_res1.json();
  logger.info('Request Data: ', req.body);

  //let regids = json1.registrationIDs;
  // res.json({ "resJsonData": json(json1) });
  res.json(json1);

});

exports.area = areas;