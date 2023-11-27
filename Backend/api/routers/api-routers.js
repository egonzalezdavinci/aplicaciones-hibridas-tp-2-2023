import {Router} from 'express';
import * as controllers from '../controllers/api-controllers.js';
import * as controllersVotes from '../controllers/api-controllers-vote.js'; 
import {checkJudge, checkGame, checkVote, verifySession } from '../../middleware/vote-check.js';

const route = Router();
route.get('/view/judges', controllers.getViewJudges);
route.get('/view/games', controllers.getViewGames);
route.get('/view/games/:idItem', controllers.getViewGameId);//Traer juego por id, traer puntaje promedio de las categorias
route.get('/view/edition/games', controllers.getViewGameEdition);//A partir de la edicion traer juegos ordenados + filtro por genero
route.post('/view/games', controllers.createdGames);
route.delete('/view/games/:idItem', controllers.deleteGame);
route.patch('/view/games/:idItem', controllers.updateGameId);
route.get('/vote/:idVote', [verifySession], controllersVotes.getViewVoteId);
route.get('/votes/game/:idGame',[verifySession], controllersVotes.getViewVotesId);//ver por id del juego votos
route.get('/vote/:idJudge/games',[verifySession], controllersVotes.getVotes);//ver por id del jurado los votos
route.post('/vote/:idJudge/:idGame/game',[verifySession, checkJudge, checkGame, checkVote], controllersVotes.createdVotes);



export default route;