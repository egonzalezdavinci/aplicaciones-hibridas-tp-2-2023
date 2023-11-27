import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function creatVoto(){

    const {idGame} = useParams();
    const judgeId = localStorage.getItem('id');
    console.log("parametro: ",idGame);
    console.log("jurado: ", judgeId);

    const [jugabilidad, setJugabilidadScore] = useState('');
    const [arte, setArteScore] = useState('');
    const [sonido, setSonidoScore] = useState('');
    const [afinidadaALaTematica, setAfinidadScore] = useState('');

    const [errorAuth, setErrorAuth] = useState('');
    const navigate = useNavigate();

    const intoJuga = (event) =>{
        setJugabilidadScore(event.target.value)
    }

    const intoArte = (event) =>{
        setArteScore(event.target.value)
    }

    const intoSonido = (event) =>{
        setSonidoScore(event.target.value)
    }

    const intoAfin = (event) =>{
        setAfinidadScore(event.target.value)
    }

    const createVoteJudge = (event) =>{
        event.preventDefault();
        fetch(`http://localhost:2023/api/vote/${judgeId}/${idGame}/game`,
        {
            method: 'POST',
            headers: {'Content-Type':'application/json','auth-token': localStorage.getItem('token')},
            body: JSON.stringify({jugabilidad, arte, sonido, afinidadaALaTematica})
        }).then(
            async response => {
                if(!response.ok){
                    throw await response.json()
                }
                setErrorAuth('');
                navigate('/judges/mis-votos', {replace: true});
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
            <h1>Votar juego</h1>
            <div className="content-form">
            <p>Agregá la calificacion del juego que estas votando.</p>
            <p>{errorAuth}</p>
            <form onSubmit={createVoteJudge}>
                        <div>
                        <label htmlFor="jugabilidad">Jugabilidad:</label>
                        <input type="number" min="0" max="10" onChange={intoJuga} value={jugabilidad} id="jugabilidad" name="jugabilidad" />
                        </div>
                        <div>
                        <label htmlFor="arte">Arte:</label>
                        <input type="number" min="0" max="10" onChange={intoArte} value={arte} id="arte" name="arte" />
                        </div>
                        <div>
                        <label htmlFor="sonido">Musica:</label>
                        <input type="number" min="0" max="10" onChange={intoSonido} value={sonido} id="sonido" name="sonido" />
                        </div>
                        <div>
                        <label htmlFor="afinidad">Afinidad a la tematica:</label>
                        <input type="number" min="0" max="10" onChange={intoAfin} value={afinidadaALaTematica} id="afinidad" name="afinidad" />
                        </div>
                        <div className="align-button">
                        <button type="submit">Votar</button>
                        <Link to={'/judges/mis-votos'}>Cancelar</Link>
                        </div>
            </form>
            </div>
        </div>
    )
}

export default creatVoto;