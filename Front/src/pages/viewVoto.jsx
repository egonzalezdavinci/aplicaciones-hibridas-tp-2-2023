import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function viewVoto(){
    const [gamesVotes, setGamesVotes] = useState([]);

    const judgeId = localStorage.getItem('id');
    console.log(judgeId);

    useEffect(()=>{
        fetch(`http://localhost:2023/api/vote/${judgeId}/games/`,{
            method: 'GET',
            headers: { 'auth-token': localStorage.getItem('token')}
    })
        .then((response) =>{
            if(response.ok){
              return response.json()
            }
            else if(response.status == 401){
              navigate('/login', {replace: true})
              return {}
            }
          })
        .then((data)=>setGamesVotes(data))
    },[])

    useEffect(()=>{
    },[gamesVotes])

    return(
        <div className="contentDiv">

        <h1>Todos los juegos</h1>
        <table>
            <thead>
            <tr>
                <th>Jurado</th>
                <th>Juego</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
                {gamesVotes.map((gamesVotes, index) => 
                <tr key={index}><td>{gamesVotes.judge_name}</td>
                <td>{gamesVotes.game_name}</td>
                <td><Link to={`/judges/mis-votos/${gamesVotes._id}`} className="linkTable">Ver Calificación</Link></td></tr>)}
            </tbody>
        </table>

        </div>
    )
}

export default viewVoto;