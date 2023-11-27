import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017");
const db = client.db("GAMEJAM_BASE");

client.connect().then(function(){
    console.log("Dase conectada");
}).catch(function(){
    console.log("No se pudo conectar");
});

const JudgesCollection = db.collection('Judges');
const GamesCollection = db.collection('Games');
const VotesCollection = db.collection('Votes');

function filterQuieryMongo(filter){
    const filterMongo = {}

    if(filter.edition){
        filterMongo.edition = parseInt(filter.edition);
    }

    if(filter.genre){
        filterMongo.genre = filter.genre;
    }

    if(filter.judge_name){
        filterMongo.judge_name = filter.judge_name;
    }

    if(filter._id){
        filterMongo._id = filter._id;
    }

    return filterMongo;
}

function filterQuieryMongoEdition(filter){
    const filterMongo = {}

    if(filter.edition){
        filterMongo.edition = parseInt(filter.edition);
    }

    if(filter.genre){
        filterMongo.genre = filter.genre;
    }
    return filterMongo;
}

async function getJudges(filter = {}){
    await client.connect();
    const fillterMongo = filterQuieryMongo(filter);
    return JudgesCollection.find(fillterMongo).toArray();
}

async function getJudgesId(id){
    await client.connect();
    return JudgesCollection.find({ _id: new ObjectId(id)})
}

async function getGames(filter = {}){
    await client.connect();
    const fillterMongo = filterQuieryMongo(filter);
    return GamesCollection.find(fillterMongo).toArray();
}

async function getGameId(idItem){
    await client.connect();
    return GamesCollection.findOne({ _id: new ObjectId(idItem)})
}

async function getGamesEdition(filter = {}){
    await client.connect();
    const fillterMongo = filterQuieryMongoEdition(filter);
    return await GamesCollection.find(fillterMongo).sort( { "puntaje": -1 } ).toArray();
}

async function createGame(item){
    await client.connect();
    const parseGame = {
        name: item.name,
        genre: item.genre,
        members: item.members,
        edition: parseInt(item.edition)
    }
    const newGame = { 
        ...parseGame,
        puntaje: 0
    }
    await GamesCollection.insertOne(newGame);
    return newGame;
}

async function deleteGame(idItem){
    await client.connect();
    await GamesCollection.deleteOne({ _id: new ObjectId(idItem)});
    return {
        id: idItem
    }
}

async function updateGameId(idItem, game){
    await client.connect();
    const newUpdateGame = {
        ...game
    }
    console.log(newUpdateGame);

    await GamesCollection.updateOne({ _id: new ObjectId(idItem)},{
        $set:{
            ...game
        }
    });
    return newUpdateGame;

}

async function getVotes(filter = {}){
    await client.connect();
    const fillterMongoVotes = filterQuieryMongo(filter);
    return await VotesCollection.find(fillterMongoVotes).toArray();
    //no me funciona
}

async function getVoteIdGame(idGame){
    await client.connect();
    return VotesCollection.find({ game_id: new ObjectId(idGame)}).toArray();
}

async function getVoteIdJudge(idItem){
    await client.connect();
    return VotesCollection.find({ judge_id: new ObjectId(idItem)}).toArray();
}

async function getVoteGameId(idVoteGame){
    await client.connect();
    return VotesCollection.findOne({ _id: new ObjectId(idVoteGame)});
}

async function createVote(idJudge, idGame, totalPuntos, vote){
    await client.connect();

    const nameGame = await GamesCollection.findOne({ _id: new ObjectId(idGame)});
    const nameJuge = await JudgesCollection.findOne({ _id: new ObjectId(idJudge)});
    let puntajeActual = 0;
        puntajeActual = nameGame.puntaje;

        if(puntajeActual == 0){
            puntajeActual = totalPuntos;
        }else{
        puntajeActual = (totalPuntos+puntajeActual)/2;
        }

    const newVote = {
        judge_id: new ObjectId(idJudge),
        judge_name: nameJuge.name,
        game_id: new ObjectId(idGame),
        game_name: nameGame.name,
        ...vote
    }

    const newPuntaje = {
        puntaje: puntajeActual
    }

    await GamesCollection.updateOne({ _id: new ObjectId(idGame)},{
        $set:{
            ...newPuntaje
        }
    });
    await VotesCollection.insertOne(newVote);
    return newVote;
}


async function checkGameVote(idGame){
    await client.connect();
    return GamesCollection.find({ _id: new ObjectId(idGame)})

}

async function checkJudgeGameVote(idJudge, idGame){
    await client.connect();
    const puntosCategorias = await VotesCollection.findOne({judge_id: new ObjectId(idJudge), game_id: new ObjectId(idGame)});
    if(puntosCategorias){
        return false;
    }else{
        return true;
    }
}


export{
    getJudges,
    getJudgesId,
    getGames,
    getGameId,
    createGame,
    deleteGame,
    updateGameId,
    getVotes,
    getVoteIdGame,
    getVoteIdJudge,
    getGamesEdition,
    checkGameVote,
    checkJudgeGameVote,
    getVoteGameId,
    createVote
}

export default{
    getJudges,
    getJudgesId,
    getGames,
    getGameId,
    createGame,
    deleteGame,
    updateGameId,
    getVotes,
    getVoteIdGame,
    getVoteIdJudge,
    getGamesEdition,
    checkGameVote,
    checkJudgeGameVote,
    getVoteGameId,
    createVote
}