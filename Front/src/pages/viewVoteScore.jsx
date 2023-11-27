import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ImagenGame from "../assets/img_default_game.jpg"


function viewVoteScore(){
    const [gameVoteJudge, setGame] = useState({});
    const {idGameView} = useParams();

    useEffect(()=>{
        fetch(`http://localhost:2023/api/vote/${idGameView}`,{
            method: 'GET',
            headers: { 'auth-token': localStorage.getItem('token')}
    })
    .then((response)=> response.json())
    .then((data)=>{
            setGame(data)
        }, [idGameView])
    })
    console.log(gameVoteJudge)
    return(
        <div className="contentDiv">
        <h1>{gameVoteJudge.name}</h1>
        <div className="contentGame">
        <div className="contentImg">
            <img src={ImagenGame} alt="Imagen del juego" />
        </div>
        <p><strong>Nombre del juego:</strong> {gameVoteJudge.game_name}</p>
        <p><strong>Jugabilidad:</strong> {gameVoteJudge.jugabilidad}</p>
        <p><strong>Arte:</strong> {gameVoteJudge.arte}</p>
        <p><strong>Sonido:</strong> {gameVoteJudge.sonido}</p>
        <p><strong>Afinidad a la tematica:</strong> {gameVoteJudge.afinidadaALaTematica}</p>
            <div className="align-button">
                <Link to="/judges/mis-votos">Volver</Link>
            </div>
        </div>
    </div>
    )
}

export default viewVoteScore;