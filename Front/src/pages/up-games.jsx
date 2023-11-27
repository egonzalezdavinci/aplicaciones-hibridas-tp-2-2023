import { useState } from "react";
import { useNavigate } from "react-router-dom";

function createGames(){
    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [members, setMembers] = useState('');
    const [edition, setedition] = useState('');

    const [errorAuth, setErrorAuth] = useState('');
    const navigate = useNavigate();

    const intoName = (event) =>{
        setName(event.target.value)
    } 

    const intoGenre = (event) => {
        setGenre(event.target.value)
    }

    const intoMembers = (event) => {
        setMembers(event.target.value)
    }

    const intoEdition = (event) => {
        setedition(event.target.value)
    }

    const createGame = (event) =>{
        event.preventDefault();
        fetch('http://localhost:2023/api/view/games',
        {
            method: 'POST',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify({name, genre, members, edition})
        }).then(
            async response => {
                if(!response.ok){
                    throw await response.json()
                }
                setErrorAuth('');
                navigate('/all-games', {replace: true});
                return response.json();
            }
        ).catch(
            error => {
                setErrorAuth(error.errorAuth.message)
            }
        );
    }

    return(
        <div className="contentDiv">
            <h1>Sumá tu juego</h1>
            <div className="content-form">
            <p>Completá el siguiente formulario y registrate para participar.</p>
            <p>{errorAuth}</p>
            <form onSubmit={createGame}>
                        <div>
                        <label htmlFor="name">Nombre del Juego:</label>
                        <input type="text" onChange={intoName} value={name} id="name" name="name" />
                        </div>
                        <div>
                        <label htmlFor="genre">Genero:</label>
                        <input type="text" onChange={intoGenre} value={genre} id="genre" name="genre" />
                        </div>
                        <div>
                        <label htmlFor="members">Miembros del equipo:</label>
                        <input type="text" onChange={intoMembers} value={members} id="members" name="members" />
                        </div>
                        <div>
                        <label htmlFor="edition">Año:</label>
                        <input type="text" onChange={intoEdition} value={edition} id="edition" name="edition" />
                        </div>
                        <div className="align-button">
                        <button type="submit">Cargar juego</button>
                        <a href="/">Cancelar</a>
                        </div>
            </form>
            </div>
        </div>
    )
}

export default createGames;