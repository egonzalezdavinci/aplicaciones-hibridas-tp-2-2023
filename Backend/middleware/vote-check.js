import * as services from '../services/gamejam-services.js';
import * as servicesAccount from '../services/account-service.js';
import { scoreSchema, accountJudgeSchema } from "../schema/validScoreJudge.js";

function validateCreateAccountJudge(req, res, next){

    accountJudgeSchema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false
    }).then(async function(data){
            req.body = data
            next()
        }).catch(function(err){
            res.status(400).json(err)
        });
}

function verifySession(req, res, next){

  const token = req.headers['auth-token']

  if (!token) {
    return res.status(401).json({ msg: "No se encuentra el token" })
  }

  servicesAccount.verifyToken(token)
    .then((payload) => {
      req.token = token
      req.session = payload
      next()
    })
    .catch((err) => {
      return res.status(401).json({ msg: "El Token no es valido",err })
    })
}


async function checkGame(req, res, next){
    const { idJudge } = req.params;
    const { idGame } = req.params;
    let existGame = false; 
    services.getGames(req.query)
    .then(function(items){
        for(const valGame in items){      
            let allGamesId = items[valGame]._id.toString();
            if(allGamesId === idGame){
                existGame = true;
                next();
            }
        }
        if(existGame == false){
        res.status(500).json({ msg: "El juego no existe" });
    }
    }).catch(
        function(){
        res.status(500).json({ msg: "Hubo un error con el juego" })
        });

}

async function checkJudge(req, res, next){
    const { idJudge } = req.params;
    const { idGame } = req.params;
    let existJudge = false; 

    services.getJudges(req.query)
    .then(function(items){
        for(const valJudge in items){      
            let allJuedgeId = items[valJudge]._id.toString();
            if(allJuedgeId === idJudge){
                existJudge = true;
                next();
            }
        }
        if(existJudge == false){
        res.status(500).json({ msg: "El Juez no existe" });
    }
    }).catch(
        function(){
        res.status(500).json({ msg: "Hubo un error con el juego" })
        });
}

async function checkVote(req, res, next){
    const { idJudge } = req.params;
    const { idGame } = req.params;
    const puntosCategorias = req.body;
    console.log(puntosCategorias);

    scoreSchema.validate(puntosCategorias).then(function(puntosCategorias){
        services.checkJudgeGameVote(idJudge, idGame)
        .then(function(items){
            if(items == false){
                res.status(500).json({ msg: "El jurado que quiere votar ya votó este juego" })
            }
            if(items == true){
                next();
            }
        }).catch(
            function(){
            res.status(500).json({ msg: "Hubo un error durante la ejecucion de la votacion" })
            });

    }).catch(function(err) {
        res.status(500).json({ err })
      });

}

export{
    checkGame,
    checkJudge,
    checkVote,
    verifySession,
    validateCreateAccountJudge
}