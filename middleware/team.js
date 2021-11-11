const {User,Teams} =require('../models/users')
const Team =require('../models/team')

competitionTeam= async (req, res, next) => {
    const user = await User.findOne({email:req.email})
    const competition = user.competition
    competition.forEach(element => {
        if (element.competition.toString()==="615d0643de8d653575d6e3df"){
            req.team = element.team_name
            next()
            
        }
    })
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