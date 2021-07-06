/*/  
 *  ┌───────────────────────────────────────────────────┐
 *  │ |> Utility function to handle rejected promises.  │
 *  └───────────────────────────────────────────────────┘
 *  If there is an error thrown in getUserFromDb,`asyncMiddleware`
 *  will pass it to next() and `express` will handle the error
 * 
/*/
const asyncMiddleware = (fn) =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };

exports.asyncMiddleware = asyncMiddleware;
