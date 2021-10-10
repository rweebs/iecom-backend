const { authJwt } = require("../middleware");
const {uploadMediaTeam} = require('../pkg/image-upload')
const controller = require("../controllers/essay.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/essays/create",
    [
      authJwt.verifyToken
    ],
    controller.create
  );
  app.get(
    "/api/essays/activate",
    controller.activate
  );

};
