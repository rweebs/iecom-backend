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
                return res.status(403).send({
                    message: "Unauthorized!"
                  });
              }
              const date= new Date()
              if(date.getTime()-competition.session_2.getTime()>1800000){
                competition.is_submited=true
                await competition.save();
                return res.status(403).send({
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
              if(competition.isStartedSession2){
                return res.status(401).send({
                    message: "Unauthorized!"
                  });
              }
              const date= new Date()
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
  competitionTeam2= async (req, res, next) => {
    const user = await User.findOne({email:req.email})
    const competition = user.competition
    let team;
    let i=0
    for (const element of competition) {
        if (element.competition.toString()==="615d0643de8d653575d6e3df"){
            team = element.team_name
            try{
              let competition= await Team.findOne({name:team})

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
      const date= new Date()
      if(!competition.session_3){
        competition.session_3 = new Date('2022-01-06T20:50:00Z');
        await competition.save();
      }else{
        if(date.getTime()-startTime.getTime()>150*60*1000){
          competition.is_submited_2=true
          await competition.save();
          return res.status(401).send({
              message: "Unauthorized!"
            });
        }
      }

      const duration = 20*60*1000;
      const rest = 10*60*1000;
      let session = Math.floor((date - competition.session_3)/duration) 
      if(session > 4){
        session = Math.floor((date - competition.session_3-rest)/duration)
      }
      let current_year;
      if(session+2022>2028){
        current_year=(2028).toString()  
      }else{
        current_year = (session+2022).toString()
      }
      

      competition.current_year = current_year
      await competition.save();
      
      req.sheet_id=competition.sheet_id
      req.current_year=competition.current_year
      req.session_3=competition.session_3
      req.server=competition.server
      next()
      
    
  };
  competitionSimulation3= async (req, res, next) => {
    let competition= await Team.findOne({name:req.team})
      req.sheet_id=competition.sheet_id
      req.server=competition.server
      req.current_year=competition.current_year
      req.session_3=competition.session_3
      req.is_submited_2=competition.is_submited_2
      next()
      
    
  };

  const GetTeamName = {
    competitionTeam,
    competitionTeam1,
    competitionTeam2,
    competitionSimulation,
    competitionSimulation2,
    competitionSimulation3
  };
  module.exports = GetTeamName;