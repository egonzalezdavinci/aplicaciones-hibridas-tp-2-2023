import { useState, useEffect } from 'react';
import imageGame from '../assets/game_image.png';

function tableScoreGame({}){
    const [gamesTable, setGames] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:2023/api/view/edition/games?edition=2023')
        .then((response) => response.json())
        .then((data)=>setGames(data))
    },[])

    useEffect(()=>{
        console.log("cambiar")
    },[gamesTable])

    return (
    <div>
      <div className='bg-logo'>
        <img src={imageGame} alt="imagen Game Jam" />
      </div>
    <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Categoría</th>
        <th>Puntaje</th>
      </tr>
    </thead>
    <tbody>
        {gamesTable.map((gamesTable, index) => <tr key={index}><td>{gamesTable.name}</td><td>{gamesTable.genre}</td><td>{gamesTable.puntaje}</td></tr>)}
    </tbody>
  </table>
    </div>
    )
}

export default tableScoreGame;