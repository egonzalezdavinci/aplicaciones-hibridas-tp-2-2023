import * as services from '../../services/gamejam-services.js';

function getViewJudges(req, res){
    services.getJudges(req.query).then(function(items){
        res.status(200).json(items);
    }).catch(function() {
        res.status(500).json({ msg: "Algo salio mal" })
      });
}

function getViewGames(req, res){
    services.getGames(req.query).then(function(items){
        res.status(200).json(items);
    }).catch(function() {
        res.status(500).json({ msg: "Algo salio mal" })
      });
}

function getViewGameEdition(req, res){
    services.getGamesEdition(req.query).then(function(items){
        res.status(200).json(items);
    }).catch(function() {
        res.status(500).json({ msg: "Algo salio mal" })
      });
}

async function getViewVotes(req, res){
    services.getVotes(req.query).then(function(items){
        res.status(200).json(items);
    }).catch(function() {
        console.log(items)
        res.status(500).json({ msg: "Algo salio mal" })
      })
}

function getViewGameId(req, res){
    const id = req.params.idItem; 
    services.getGameId(id).then(function (game) {
        return res.status(200).json(game)
      }).catch(function() {
        res.status(500).json({ msg: "Algo salio mal" })
      });
}


async function createdGames(req, res){
    return services.createGame(req.body).then(
        function(game){
            res.status(201).json(game);
        }
    ).catch(function() {
        res.status(500).json({ msg: "Algo salio mal no pudimos dar de alta el juego" })
      });
}

function deleteGame(req, res){
    const id = req.params.idItem;
    services.deleteGame(id).then(function(game){
        if(game){
            res.status(200).json(game);
        }else{
            res.status(404).json({error:{message:'El producto no se se pudo borrar'}});
        }
    });
}

function updateGameId(req, res){
    const idGame = req.params.idItem;
    services.updateGameId(idGame, req.body).then(
        function(updateGame){
            res.status(201).json(updateGame);
        }
    ).catch(function() {
        res.status(500).json({ msg: "Algo salio mal no pudimos actualizar el dato" })
      });
}


export{
    getViewJudges,
    getViewGames,
    getViewGameId,
    createdGames,
    deleteGame,
    updateGameId,
    getViewGameEdition,
    getViewVotes
}

export default {
    getViewJudges,
    getViewGames,
    getViewGameId,
    createdGames,
    deleteGame,
    updateGameId,
    getViewGameEdition,
    getViewVotes
}