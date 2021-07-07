 /**-------------------------------------------------------------- ->
 *  ┌──────────────────────────┐
 *  │ |> GAVEL - Express API   │
 *  └──────────────────────────┘
 * 
 *  @name:          'GAVEL - API Server'
 *  @description:   'Express API / Server in support of GAVEL'
 *  @implements:    'Custom RESTful API Capabilities'
 *  @returns:       'Data in JSON format  
 *  @author:        '@quiet-professionals-jsingletary'       
 *  @copyright:     'Quiet Professionals LLC'
 * 
*/   

// Imports
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');
const logger = require('./logs/logger');
const NodeRSA = require('node-rsa');
const { asyncMiddleware } = require('./api/middleware/async-middleware');

require('dotenv').config();

// TODO: Determine if `react-helmet` would be useful
/*/  
 *  ┌────────────────────────┐
 *  │ |> Init Express Server │
 *  └────────────────────────┘
/*/
const app = express();
const port = process.env.PORT || 8080;

// Middleware for parsing / renering data
// NOTE: Parsing middleware must run prior to `require()` routes 
// --> (All middleware will run in order as they appear in code)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Require Route
const api = require('./routes/routes');

// Add API version to URI
app.use(process.env.API_VERSION, api);

/*/
 *  ┌────────────────────────┐
 *  │ |> CORS Support        │
 *  └────────────────────────┘
/*/
// TODO: Dont forget to whitelist the Azure `dev` Web App URL
// const corsOptions = {
//   "origin": "//localhost:5000",
//   "optionsSuccessStatus": 200,
// }
// app.use(cors(corsOptions));
// logger.info('CORS Status: ', corsOptions);

/*/
 *  ┌─────────────────────────────┐
 *  │ |> Middleware / Utilities   │
 *  └─────────────────────────────┘
/*/
// Middleware logs incoming requests to the server's console
app.use((req, res, next) => {
  logger.debug(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});

const CURRENT_ENV = process.env.NODE_ENV;

// Middleware communicates to Express which files to serve up
if (CURRENT_ENV === 'production' || CURRENT_ENV === 'staging') {
  // app.use(express.static(path.join(__dirname, 'client/build')));
  // app.get('/', function (req, res) {
  //   // res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  //   return res.send(`CURRENT ENV: ` + process.env.NODE_ENV);
  // });
  logger.info(`Node Environment: ${CURRENT_ENV}`);
}

/*/
 *  ┌─────────────────────────────┐
 *  │ |> Catch Default Route      │
 *  └─────────────────────────────┘
/*/
app.get("/", (req, res) => {
  res.send(`GAVEL's Companion API ( ${CURRENT_ENV} ) \n- Powered by Quiet Professionals LLC`);
});

// TODO: Ad-Hoc `status` endpoint to relocate to the actual routes file.
app.get("/status", (req, res) => {
  return res.send({
    status: "GAVEL server is up and running...",
  });
});

// Mock Test
const gitHubMock = async (req, res, next) => {
  const url = "http://api.github.com/user";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });

  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }

  const jsonRes = await response.json();

  res.json(jsonRes);

};

/*/  
 *  ┌─────────────────────────────────────┐
 *  │ |> Api Endpoint - Security Token    │
 *  └─────────────────────────────────────┘
/*/

//#region [infosec]
// ! TODO: Remove Private Keys from code and store them to Key Vault 
const keyData = new NodeRSA('-----BEGIN RSA PRIVATE KEY-----\n' +
  'MIIEpAIBAAKCAQEAzWJEgVPNXeMVOGNxNbiR1mTw3t1yDQRn7YQ5B3Svuii3A1+8\n' +
  '7CAl0tUIJfc3WaTg8l1Rwskg7p+rnmLIDnRLUak8BiJBobnm6cDSmhWFgNXikew/\n' +
  'YY/TlLXN3tCEz0GmyJ9jQHRLYBa/PEndUVqav4QfAPi1ChEaq2GtGuhX8qZEQfgg\n' +
  'sLQCvJ/lM3n/k0DbcyZ8Gkgg7eREoHO7NE3HDVS1OrnAMIAj6AsqYguN7gol822I\n' +
  '6aur2L7mF4AW2/ylWpsPtgX6fgzjo6FmGRSCrkfkevFZxbNd2yXUN8jnF4TW5H2i\n' +
  'Tc9YEHKjDEw2osrjGC3tpaHH4E02pCgC5kgNswIDAQABAoIBAAS0NHd10OVOlyTU\n' +
  'ejpNwOFVLIMeNUeBC1RQS/IUxRWRayejoLMTxWn/wREFiXn/IbvLUV0RuDRe6dJV\n' +
  '1tkl5re3FY3aaQBoPpap+OjYh1c9DtRiwczdO25Tf6STyAbrLQO5Ss+mGjfYLYcW\n' +
  '9f+wAI1UXFVsXNEfNSopsYpFOgZvp+x3MJHVHyxDD/xlIDNsccKsLaSp+CxoPFxd\n' +
  '9vwjJN+ZZNyhlC/rfbHgeo/HJFtB8PZzF+nF01s89kdi8QBdw6lvYMiOtq6IlZRr\n' +
  '7VpopTq21Xxh9rXCPYwwd/34Ap/CjXrxesbNfdXtbPZK008vusWm5hEdzhWwchhq\n' +
  'jbS1qOECgYEA7D7ZVgIAF5dVW+S9Awpe8Qz0zcOVTVou3bf6SMyydtpOCgjv8t7z\n' +
  'vXiGHOmDT6p3l8QzzGUIs8r5QYh9CclqXYtjgE/hojxOLyofFurcxI2uYDnXNkvC\n' +
  'IWD0AuA7NIZaEP9yaQZRxMsNp2sdTKPJzSsDZcWxPZTMtpgCPsGhbDECgYEA3o7I\n' +
  'qA5vhp/g6/rOn1GvDzf8EtI+tSeCGujCjdipS/qyrZPznlTYBVQH9mcECrBVoWPq\n' +
  'tWCxyPhmC4NgcqttRAX1LYM4xTKw3vD67bzM3iFFZl7fSDFLk7omMG+Z4FB/U4ol\n' +
  'Xbq9FSk1auDV9A6ElsyljCLRdxvTxErM4yOQsyMCgYEAkpZ40tZQ6lJ7o5Zt9aoE\n' +
  'uTuZ1udKCAIyXF8hDPT+s6LHk5ByGtheky1qwhve35rdtC0JGwWB/dWvDgu70kvJ\n' +
  'FRw9dEucrMcQmFFhkx3OOKPVFF4vfMBLR9zZ68Lo2bGXxz5J5oMGT77SzRQ4zOpA\n' +
  'eG79H7QoQxbGY3I0ym3pVLECgYEA09jYOdhb4qrnH9lCuza2y2bAJG5K0IeF+fVb\n' +
  '1EfLhw5g7Icr26fpZNEDL1IJ796/8/s3HGWpdaK1B/qLYTu6q4h8RFFnRZal8+Ex\n' +
  'CgGwhTToabSfF4oM5dbIqUxiDbqyKKQUQ28Qs0bhmRXhswnqvdyZLJasCpPLdUq6\n' +
  'Uu+0uj8CgYABmSfOhv7e50y3UBEh3de7IBqHPwsCKTDn5KPKGnKUB6fZfCForXPB\n' +
  'UULVxHkfspHj8WXSCrvbvGR6Z8iuILfvgU8EDbQekUmPdzoV1IpEZxyQWaaChnzj\n' +
  'lGbxzxaxp7mt+pq5b9xYnUpw7dnXvSZTYrLsDcDbVn67+rS5zXEwvQ==\n' +
  '-----END RSA PRIVATE KEY-----');
//#endregion

var decrypted = "0";
const apiKey = process.env.API_KEY;
const securityToken = async (req, res, next) => {

  const url = "https://staging-bs-api.venntel.com/v1.5/securityToken";

  logger.debug("Init Token`try/catch` ");

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": apiKey
    }
  });

  // if (!response.ok) {
  //   throw new Error(`HTTP error! status: ${response.status}`);
  // }

  let json = await response.json();

  // Decrypt Key
  const token = json.tempSecurityEncryptedToken;
  // TODO: Move the decryption logic into a Route Handler
  keyData.setOptions({ encryptionScheme: 'pkcs1' });
  decrypted = keyData.decrypt(token, 'utf8');

  res.json({ "TempSecurityToken": decrypted });

};

app.get('/mock-data-test', gitHubMock);
app.get('/security-token', securityToken);

/*/
 *  ┌────────────────────────┐
 *  │ |> Error Handling      │
 *  └────────────────────────┘
/*/

// Configure Error Handler
// create an error with .status. we
// can then use the property in our
// custom error handler (Connect repects this prop as well)
function error(status, msg) {
  var err = new Error(msg);
  err.status = status;
  return err;
}

/*/
 *  ┌───────────────────────────────────┐
 *  │ |> Start Server & Listen to Port  │
 *  └───────────────────────────────────┘
/*/
// console.log('module: ', module);
app.listen(port, () => {
  logger.info(`Express Server Running... | BACK_END_SERVICE_PORT: ${port}`);
});
