const { authJwt } = require("../middleware");
const {uploadMediaEvent} = require('../pkg/image-upload')
const controller = require("../controllers/event-regist.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/event/regist/paid",
    [
      authJwt.verifyToken,uploadMediaEvent
    ],
    controller.create_paid
  );
  app.post(
    "/api/event/regist/unpaid",
    [
      authJwt.verifyToken
    ],
    controller.create_unpaid
  );
  app.get(
    "/api/event/regist/activate",
    controller.activate
  );

};
