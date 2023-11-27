import { Link } from "react-router-dom";


function indexJudges(){
    const judgeEmail = localStorage.getItem('email');

return(
    <div className="contentDiv">
        <h1>¡Hola {judgeEmail}!</h1>
        <div className="dashJudges">
        <p> Acá podrás realizar las acciones que solo los jueces pueden hacer.</p>
        <ul className="judges-option">
            <li><Link to="/judges/votar-juego">Votar</Link></li>
            <li><Link to="/judges/mis-votos">Ver mis votos</Link></li>
            <li><Link to="/judges/logout">Cerrar sesión</Link></li>
        </ul>
        </div>
        
    </div>
)

}

export default indexJudges;