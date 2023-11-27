import * as services from '../../services/gamejam-services.js';

function getVotes(req, res){
    const { idJudge } = req.params;

    services.getVoteIdJudge(idJudge).then(function(items){
        res.status(200).json(items);
    }).catch(function() {
        res.status(500).json({ msg: "Algo salio mal" })
    })
}

function getViewVotesId(req, res){
    const idGame = req.params.idGame; 
      services.getVoteIdGame(idGame).then(function(vote) {
          return res.status(200).json(vote)
        }).catch(function() {
          res.status(500).json({ msg: "Algo salio mal" })
        }); 
}

function calcularPromedio(puntosCategorias){
    let promedio = 0;
    console.log("lo que entra", puntosCategorias)
    for(let puntos in puntosCategorias){
        promedio += parseInt(puntosCategorias[puntos]);
    }
    console.log("lo sumo: ",promedio);
    promedio = parseInt(promedio/4);
    promedio = promedio.toFixed(2)

    return promedio;
}

async function createdVotes(req, res){
        const { idJudge } = req.params;
        const { idGame } = req.params;
        const puntosCategorias = req.body;
        const totalPuntos = calcularPromedio(puntosCategorias);

        console.log("mando: ");
        console.log(idJudge);
        console.log(idGame);
        console.log(totalPuntos);

        return services.createVote(idJudge, idGame, totalPuntos, req.body).then(
                function(vote){
                    res.status(201).json(vote); 
                }
            ).catch(
                function() {
                res.status(500).json({ msg: "Algo salio mal" })
              })

}


async function getViewVoteId(req, res){
    const idGameVote = req.params.idVote;

    services.getVoteGameId(idGameVote).then(function(items){
        res.status(200).json(items);
    }).catch(function() {
        res.status(500).json({ msg: "Algo salio mal cuando traiamos el voto" })
    })
}


export{
    getVotes,
    getViewVotesId,
    getViewVoteId,
    createdVotes
}

export default {
    getVotes,
    getViewVotesId,
    getViewVoteId,
    createdVotes
}