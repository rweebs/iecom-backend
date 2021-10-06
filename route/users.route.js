
const controller = require('../controllers/users.controller')
const { authJwt } = require('../middleware')
const { uploadMediaUser } = require('../pkg/image-upload')

 module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post(
      "/api/users",
      [uploadMediaUser],
      controller.create
    );

    app.post(
        "/api/login",
        controller.login
      );

    app.get(
      "/api/users/activate",
      controller.activate
    );

      app.get(
        "/api/users",
        [
          authJwt.verifyToken
        ],
        controller.get
      );
  
  };

