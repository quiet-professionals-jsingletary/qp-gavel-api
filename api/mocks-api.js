const axios = require('axios');
const fetch = require('node-fetch');
const logger = require('../logs/logger');
const { asyncMiddleware } = require('./middleware/async-middleware');
const { decryptedToken } = require('./securities-api');

/*/  
 *  ┌───────────────────────────┐
 *  │ |> Mock Api Endpoints     │
 *  └───────────────────────────┘
/*/
const apiKey = process.env.API_KEY;
const securityTokenMock = asyncMiddleware(async (req, res, next) => {
  try {
    const searchUrl = "https://my-json-server.typicode.com/Quiet-Professionals-LLC/demo/tempSecurityToken";

    const response = await fetch(searchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": apiKey
      }
      
    });

    const resJson = await response.json();
    res.json(resJson);

  } catch (error) {
    next(error);

  }

});

const locationsMock = asyncMiddleware(async (req, res, next) => {
  try {
    const searchUrl = "https://my-json-server.typicode.com/Quiet-Professionals-LLC/demo/locationData";

    const response = await fetch(searchUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": "12345",
        "TempSecurityToken": decryptedToken
      }

    });

    const resJson = await response.json();
    res.json(resJson);

  } catch (error) {
    next(error);
  }

});

const gitHubMock = asyncMiddleware(async (req, res, next) => {
  try {
    const searchUrl = "https://api.github.com/user";

    const response = await fetch(searchUrl, {
      "method": "GET",
      "headers": {
        "Accept": "application/json",
        "Content-Type": "application/json",
        // "Content-Security-Policy": "default-src *://*.azurewebsites.net",
        // "Authorization": apiKey
      }
    });


    const jsonRes = await response.json();
    res.json(jsonRes);

  } catch (error) {
    next(error);

  }

});

exports.securityToken = securityTokenMock;
exports.locations = locationsMock;
exports.gitHub = gitHubMock;