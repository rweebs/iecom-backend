const {User,Teams} =require('../models/users')
const Team =require('../models/team')

competitionTeam= async (req, res, next) => {
    const user = await User.findOne({email:req.email})
    const competition = user.competition
    competition.forEach(element => {
        if (element.competition.toString()==="615d0643de8d653575d6e3df"){
            let team = element.team_name
            if(element.isSubmitted){
              return res.status(401).send({
                message: "Unauthorized!"
              });
            }else{
              req.team = team
              next()
            }
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