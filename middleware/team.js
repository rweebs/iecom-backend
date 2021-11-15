const {User,Teams} =require('../models/users')
const {Team} =require('../models/team')

competitionTeam= async (req, res, next) => {
    const user = await User.findOne({email:req.email})
    const competition = user.competition
    let team;
    let i=0
    for (const element of competition) {
        if (element.competition.toString()==="615d0643de8d653575d6e3df"){
            team = element.team_name
            try{
              let competition= await Team.findOne({name:team})
              if(competition.is_submited==true){
                return res.status(401).send({
                    message: "Unauthorized!"
                  });
              }
              const date= new Date()
              if(date.getTime()-competition.session_2.getTime()>1800000){
                return res.status(401).send({
                    message: "Unauthorized!"
                  });
              }
            }catch(err){
              // return res.status(401).send({
              //   message: "Unauthorized!"
              // });
            }
              req.team = team
              next()
              
            
        }
    }
    if(!req.team){
        return res.status(401).send({
            message: "Unauthorized!"
          });
    }
    
  };
competitionTeam1= async (req, res, next) => {
    const user = await User.findOne({email:req.email})
    const competition = user.competition
    let team;
    let i=0
    for (const element of competition) {
        if (element.competition.toString()==="615d0643de8d653575d6e3df"){
            team = element.team_name
            try{
              let competition= await Team.findOne({name:team})
              if(competition.session_2){
                return res.status(401).send({
                    message: "Unauthorized!"
                  });
              }
              if(date.getTime()-competition.session_1.getTime()>3600000){
                return res.status(401).send({
                    message: "Unauthorized!"
                  });
              }
            }catch(err){
              // return res.status(401).send({
              //   message: "Unauthorized!"
              // });
            }
              req.team = team
              next()
              
            
        }
    }
    if(!req.team){
        return res.status(401).send({
            message: "Unauthorized!"
          });
    }
    
  };
  competitionSimulation= async (req, res, next) => {
    const user = await User.findOne({email:req.email})
    let competition = user.competition
    for (const element of competition) {
        if (element.competition.toString()==="615d0643de8d653575d6e3df"){
            let team = element.team_name
            req.team = team
            next()  
            
        }
    }
    if(!req.team){
        return res.status(401).send({
            message: "Unauthorized!"
          });
    }
    
  };
  competitionSimulation2= async (req, res, next) => {
    let competition= await Team.findOne({name:req.team})
      if(competition.is_submited_2){
        return res.status(401).send({
          message: "Unauthorized!"
        });
      }
      req.sheet_id=competition.sheet_id
      req.current_year=competition.current_year
      next()
      
    
  };
  

  const GetTeamName = {
    competitionTeam,
    competitionTeam1,
    competitionSimulation,
    competitionSimulation2
  };
  module.exports = GetTeamName;