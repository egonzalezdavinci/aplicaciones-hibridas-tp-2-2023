import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function viewAllGames(){
    const [gamesTable, setGames] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:2023/api/view/games')
        .then((response) => response.json())
        .then((data)=>setGames(data))
    },[])

    useEffect(()=>{
        console.log("cambiar")
    },[gamesTable])

    return(
        <div className="contentDiv">
        <h1>Todos los juegos</h1>
        <table>
            <thead>
            <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Puntaje</th>
                <th>Edición</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {gamesTable.map((gamesTable, index) => 
                <tr key={index}><td>{gamesTable.name}</td>
                <td>{gamesTable.genre}</td>
                <td>{gamesTable.puntaje}</td>
                <td>{gamesTable.edition}</td>
                <td><Link to={`/all-games/${gamesTable._id}`} className="linkTable">Ver Más</Link></td></tr>)}
            </tbody>
        </table>
        </div>
    )
}

export default viewAllGames;