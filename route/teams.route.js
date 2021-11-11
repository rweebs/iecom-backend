const { authJwt, GetTeamName } = require("../middleware");
const {uploadMediaTeam} = require('../pkg/image-upload')
const controller = require("../controllers/teams.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/teams/create",
    [
      authJwt.verifyToken
    ],
    controller.create
  );
  app.get(
    "/api/teams/activate",
    controller.activate
  );
  app.get(
    "/api/teams/mcq/populate",
    controller.populate
  );
  app.get(
    "/api/teams/mcq/all",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam
    ],
    controller.getQuestion
  );

  app.post(
    "/api/teams/mcq",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam
    ],
    controller.answer
  );

  app.get(
    "/api/teams/mcq",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam
    ],
    controller.question
  );
  app.get(
    "/api/teams/tf/all",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam
    ],
    controller.getQuestion_tf
  );

  app.post(
    "/api/teams/tf",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam
    ],
    controller.answer_tf
  );

  app.get(
    "/api/teams/tf",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam
    ],
    controller.question_tf
  );
  app.get(
    "/api/teams/fitb/all",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam
    ],
    controller.getQuestion_fitb
  );

  app.post(
    "/api/teams/fitb",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam
    ],
    controller.answer_fitb
  );

  app.get(
    "/api/teams/fitb",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam
    ],
    controller.question_fitb
  );

  app.post(
    "/api/teams/start",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam
    ],
    controller.start
  );

};
