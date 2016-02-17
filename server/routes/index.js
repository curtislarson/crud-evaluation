var userRoutes = require('./users');
module.exports = (app) => {
  app.use('/v1/users', userRoutes);
};
