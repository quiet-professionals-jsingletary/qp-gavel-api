const axios = require('axios');
const fetch = require('node-fetch');
const logger = require('../logs/logger');
const { asyncMiddleware } = require('./middleware/async-middleware');
const { decryptedToken } = require('./security-token');

/*/  
 *  ┌───────────────────────────┐
 *  │ |> Mock Api Endpoints     │
 *  └───────────────────────────┘
/*/

const securityTokenMock = asyncMiddleware(async (req, res, next) => {

  const url2 = "https://my-json-server.typicode.com/Quiet-Professionals-LLC/demo/tempSecurityToken";

  const fetch_res2 = await fetch(url2, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });

  const json2 = await fetch_res2.json();
  res.json(json2);

});

const devicesMock = asyncMiddleware(async (req, res, next) => {
  
  const url3 = "https://my-json-server.typicode.com/Quiet-Professionals-LLC/demo/locationData";
  // let headers = {
  //   "Content-Type": "application/json",
  //   "Accept": "application/json",
  //   "Authorization": apiKey,
  //   "TempSecurityToken": decrypted
  // };
  const fetch_res3 = await fetch(url3, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "12345",
      "TempSecurityToken": decryptedToken
    }
  });

  const json3 = await fetch_res3.json();
  res.json(json3);
});

const gitHubMock = asyncMiddleware(async (req, res, next) => {
  const url = "https://api.github.com/user";

  let headers = {
    "Accept": "application/json",
    "Content-Type": "application/json",
    // "Content-Security-Policy": "default-src *://*.azurewebsites.net",
    // "Authorization": apiKey
  };

  logger.debug("GitHub `try/catch` ")
  const response = await fetch(url, {
    "method": "GET",
    "headers": {
      "Accept": "application/json",
      "Content-Type": "application/json",
      // "Content-Security-Policy": "default-src *://*.azurewebsites.net",
      // "Authorization": apiKey
    }
  });

  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }

  let jsonRes = await response.json();

  res.json(jsonRes);
  
  // try {

  // } catch (error) {
  //   logger.error("GitHub Error: ", error);
  // }

});

exports.securityTokenMock = securityTokenMock;
exports.devicesMock = devicesMock;
exports.gitHubMock = gitHubMock;