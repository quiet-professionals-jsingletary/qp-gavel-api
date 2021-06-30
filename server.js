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
// const bodyParser = require('body-parser');
const cors = require('cors');
// const fetch = require('node-fetch');
const path = require('path');

require('dotenv').config();

// TODO: Determine if `react-helmet` would be useful
/*/  
 *  ┌────────────────────────┐
 *  │ |> Init Express Server │
 *  └────────────────────────┘
/*/
const app = express();
const port = process.env.REACT_APP_PORT || 5000;

// Middleware for parsing / renering data
// NOTE: Parsing middleware must run prior to `require()` routes 
// --> (All middleware will run in order as they appear in code)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Require Route
const api = require('./routes/routes');

// Add API version to URI
app.use(process.env.REACT_APP_API_VERSION, api);

/*/
 *  ┌────────────────────────┐
 *  │ |> CORS Support        │
 *  └────────────────────────┘
/*/
// TODO: Dont forget to whitelist the Azure `dev` Web App URL
const corsOptions = {
  "origin": "http://localhost:3000",
  "optionsSuccessStatus": 200,
}
app.use(cors(corsOptions));
console.log('CORS Status: ', cors);

/*/
 *  ┌─────────────────────────────┐
 *  │ |> Middleware / Utilities   │
 *  └─────────────────────────────┘
/*/
// Middleware logs incoming requests to the server's console
app.use((req, res, next) => {
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});

// Middleware communicates to Express which files to serve up
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  // app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('/', function (req, res) {
    // res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    return res.send(`CURRENT ENV: ` + process.env.NODE_ENV);
  });
  console.log('Node Environment: ', process.env.NODE_ENV); 
}

/*/
 *  ┌─────────────────────────────┐
 *  │ |> Catch Default Route      │
 *  └─────────────────────────────┘
/*/
const CURRENT_ENV = process.env.NODE_ENV;
app.get("/", (req, res) => {
  res.status(200).send(`GAVEL's Companion API ( ${CURRENT_ENV} ) \n- Powered by Quiet Professionals LLC`);
});

// TODO: Ad-Hoc `status` endpoint to relocate to the actual routes file.
app.get("/status", (req, res) => {
  return res.send({
    status: "GAVEL server is up and running...",
  });
});

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

// error handling middleware. When you next(err)
// it will be passed through the defined middleware
// in order, but ONLY those with an arity of 4, ignoring
// regular middleware.
// app.use(function (err, req, res, next) {
//   // whatever you want here, feel free to populate
//   // properties on `err` to treat it differently in here.
//   res.status(err.status || 500);
//   res.send({ error: err.message });
// });

// Custom JSON 404 middleware. Since it's placed last
// it will be the last middleware called, if all others
// invoke next() and do not respond.
// app.use(function (req, res) {
//   res.status(404);
//   res.send({ error: "Sorry, can't find that" });
// });

// later, if you want to clean up
// require('console-group').teardown();

/*/
 *  ┌────────────────────────┐
 *  │ |> Api Endpoints       │
 *  └────────────────────────┘
 *   All endpoints live in the `./api` directory 
/*/

/*/
 *  ┌──────────────────────────────┐
 *  │ |> Mock-Data Endpoints       │
 *  └──────────────────────────────┘
 *   Use mock data when Venntel API is not accessible (whitelisting)
 *   Also live in the `./api` directory
/*/

/*/
 *  ┌───────────────────────────────────┐
 *  │ |> Start Server & Listen to Port  │
 *  └───────────────────────────────────┘
/*/
// console.log('module: ', module);
app.listen(port, () => {
  console.log(`Express Server Running... | BACK_END_SERVICE_PORT: ${port}`);
});
