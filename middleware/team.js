const {User,Teams} =require('../models/users')
const Team =require('../models/team')

competitionTeam= async (req, res, next) => {
    const user = await User.findOne({email:req.email})
    const competition = user.competition
    for (const element of competition) {
        if (element.competition.toString()==="615d0643de8d653575d6e3df"){
            let team = element.team_name
            try{
              let competition= await Team.findOne({name:team})
              if(competition.is_submitted){
                return res.status(401).send({
                  message: "Unauthorized!"
                });
              }
            }catch(err){
              return res.status(401).send({
                message: "Unauthorized!"
              });
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

  const GetTeamName = {
    competitionTeam
  };
  module.exports = GetTeamName;