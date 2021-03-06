const { authJwt, GetTeamName } = require("../middleware");
const {uploadMediaTeam} = require('../pkg/image-upload')
const controller = require("../controllers/teams.controller");
const simulation = require("../controllers/simulation.controller");


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
  app.post(
    "/api/teams/create2",
    controller.create2
  );
  app.get(
    "/api/teams/activate",
    controller.activate
  );
  app.post(
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
      GetTeamName.competitionTeam1
    ],
    controller.answer
  );

  app.get(
    "/api/teams/mcq",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam1
    ],
    controller.question
  );
  app.get(
    "/api/teams/tf/all",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam1
    ],
    controller.getQuestion_tf
  );

  app.post(
    "/api/teams/tf",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam1
    ],
    controller.answer_tf
  );

  app.get(
    "/api/teams/tf",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam1
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

  app.post(
    "/api/teams/submit",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam
    ],
    controller.submit
  );

  app.get(
    "/api/teams/session_1",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam
    ],
    controller.get_status_session_1
  );

  app.get(
    "/api/teams/session_2",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam
    ],
    controller.get_status_session_2
  );

  app.post(
    "/api/teams/submit",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam
    ],
    controller.submit
  );

  app.post(
    "/api/teams/start",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam
    ],
    controller.start
  );
  app.get(
    "/api/teams/status",
    [
      authJwt.verifyToken,
      GetTeamName.competitionTeam2
    ],
    controller.status
  );
  app.get(
    "/api/teams/scoreboard",
    [
      authJwt.verifyToken,
    ],
    controller.scoreboard_prelim
  );
  app.get(
    "/api/simulation/scoreboard",
    [
      authJwt.verifyToken,
    ],
    controller.scoreboard_simulation
  );
  app.post(
    "/api/simulation/edit",
    [
      authJwt.verifyToken,
      GetTeamName.competitionSimulation,
      GetTeamName.competitionSimulation2
    ],
    simulation.edit
  );

  app.get(
    "/api/simulation/current_condition",
    [
      authJwt.verifyToken,
      GetTeamName.competitionSimulation,
      GetTeamName.competitionSimulation2
    ],
    simulation.current_condition
  );

  app.get(
    "/api/simulation/current_data",
    [
      authJwt.verifyToken,
      GetTeamName.competitionSimulation,
      GetTeamName.competitionSimulation2
    ],
    simulation.current_data
  );

  app.post(
    "/api/simulation/submit_current_year",
    [
      authJwt.verifyToken,
      GetTeamName.competitionSimulation,
      GetTeamName.competitionSimulation2
    ],
    simulation.submit_current_year
  );

  app.post(
    "/api/simulation/submit_final",
    [
      authJwt.verifyToken,
      GetTeamName.competitionSimulation,
      GetTeamName.competitionSimulation2
    ],
    simulation.submit_final
  );

  app.post(
    "/api/sheet",
    controller.add_sheet_id
  );

  app.get(
    "/api/simulation/status",
    [
      authJwt.verifyToken,
      GetTeamName.competitionSimulation,
      GetTeamName.competitionSimulation3
    ],
    simulation.status
  );
  app.get(
    "/api/simulation/status_final",
    [
      authJwt.verifyToken,
      GetTeamName.competitionSimulation,
      GetTeamName.competitionSimulation3
    ],
    simulation.status_final
  );
  app.get(
    "/api/simulation/reset",
    simulation.reset
  );

};
