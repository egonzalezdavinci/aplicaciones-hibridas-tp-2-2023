import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ImagenGame from "../assets/img_default_game.jpg"

function ViewGameId({}){

const [game, setGame] = useState({});
const {idItem} = useParams();

useEffect(()=>{
    fetch(`http://localhost:2023/api/view/games/${idItem}`)
    .then((response)=> response.json())
    .then((data)=>{
        setGame(data)
    }, [idItem])
})
    return(
    <div className="contentDiv">
        <h1>{game.name}</h1>
        <div className="contentGame">
        <div className="contentImg">
            <img src={ImagenGame} alt="Imagen del juego" />
        </div>
        <p><strong>Nombre:</strong> {game.name}</p>
        <p><strong>Genero:</strong> {game.genre}</p>
        <p><strong>Miembros:</strong> {game.members}</p>
        <p><strong>Edición:</strong> {game.edition}</p>
            <div className="align-button">
                <Link to="/all-games">Volver</Link>
            </div>
        </div>
    </div>
    )

}

export default ViewGameId;