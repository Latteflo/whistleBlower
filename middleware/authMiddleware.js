const passport = require('passport');

// This middleware ensures that the request has a valid JWT
const authMiddleware = passport.authenticate('jwt', { 
  session: false, 
  failureRedirect: '/login', // Redirect to login page on failure
});

// This middleware ensures that the request has a valid JWT and the user has the required role
const authMiddlewareWithRole = (requiredRole) => {
    return (req, res, next) => {
      passport.authenticate('jwt', { session: false }, (err, user, info) => {
        //console.log('Authenticated user:', user); // Log the authenticated user
        //console.log('Required role:', requiredRole); // Log the required role  

        if (err || !user || user.role !== requiredRole) {
          return res.status(403).json({ message: 'Access denied' });
        }
        req.user = user; 
        next();
      })(req, res, next);
    };
  };
  
  module.exports = {
    authMiddleware,
    authMiddlewareWithRole,
  };
  