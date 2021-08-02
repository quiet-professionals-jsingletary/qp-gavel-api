 //#region [qp]
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
//#endregion

//#region [imports]
// TODO: Convert all `commonjs` requires to `ES6` import modules (>=v14.5.1)
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('./logs/logger');

// Require Routes
const api = require('./api');

require('dotenv').config();
//#endregion

// TODO: Determine if `react-helmet` would be useful

/*/  
 *  ┌───────────────────────────┐
 *  │ |> Init Express Server    │
 *  └───────────────────────────┘
/*/
const app = express();
const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost"
const environment = process.env.NODE_ENV;
const version = process.env.API_VERSION;

// Define `index.html` as application entrypoint
const options = { index: 'index.html' };

// Middleware for parsing / renering data
// NOTE: Parsing middleware must run prior to `require()` routes 
// --> (Middlewares will run in the order in which they are used)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*/
*  ┌────────────────────────────────┐
*  │ |> CORS - Hardened by Helmet   │
*  └────────────────────────────────┘
/*/
// ~~>  Helmet is comprised of many smaller middlewares
// ~~>   The following is a list of such middlewares
// ~~>    Docs: https://www.npmjs.com/package/helmet
//#region [details]
// -- Default Options 
// helmet.contentSecurityPolicy();
// helmet.dnsPrefetchControl();
// helmet.expectCt();
// helmet.frameguard();
// helmet.hidePoweredBy();
// helmet.hsts();
// helmet.ieNoOpen();
// helmet.noSniff();
// helmet.permittedCrossDomainPolicies();
// helmet.referrerPolicy();
// helmet.xssFilter();
// -- Non-Default Options 
// helmet.contentSecurityPolicy(options)
// helmet.crossOriginEmbedderPolicy()
// helmet.crossOriginResourcePolicy()
// helmet.crossOriginOpenerPolicy()
//#endregion

// Init Helmet
app.use(helmet()); // Instantiate `helmet` will offer all Default middlewares 
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.disable("x-powered-by");

// const allowedOrigins = ["http//localhost:5000", "https://qp-gavel-mvp.azurewebsites.net/"];
const corsOptions = {
  "origin": "*",
  "methods": "GET,HEAD,POST",
  "allowedHeaders": [
    "Content-Type", 
    "Authorization", 
    "Accept"
  ],
  "preflightContinue": true,
  "optionsSuccessStatus": 204
}
app.use(cors(corsOptions));
logger.info("CORS Options:", corsOptions);

// Add API version to URI
app.use(version, api);

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

// Middleware communicates to Express which files to serve up
if (environment === 'production' || 
      environment === 'staging' ||
        environment === 'development') {
          
          logger.info(`Node Environment: ${environment}`);
}

/*/
 *  ┌─────────────────────────────┐
 *  │ |> Catch Default Route      │
 *  └─────────────────────────────┘
/*/

// TODO: Ad-Hoc `status` endpoint to relocate to the actual routes file.
app.get("/status", (req, res) => {
  res.send({
    status: "GAVEL server is up and running...",
  });
});

app.get("/", (req, res) => {
  res.send(`<h3>GAVEL's Companion API ( ${environment} )</h3> </br> <i>Powered by Quiet Professionals LLC</i>`);
});

app.use('/', express.static('/home/site/wwwroot', options));
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
// NOTE: Hardcoding http port per Azure Docs
app.listen(port, () => {
  logger.info( `Express Server Running on port: ${port} - < /br> 
                Take a peek http://localhost:${port}` );
});
