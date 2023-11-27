import { useState } from "react";
import { useNavigate } from "react-router-dom";

function loginJudge(){
    const [email, setEmail] = useState('');
    const [password, setPassUser] = useState('');
    const [errorAuth, setErrorAuth] = useState('');
    const navigate = useNavigate();

    const intoUserName = (event) =>{
        setEmail(event.target.value)
    } 

    const intoPassUser = (event) => {
        setPassUser(event.target.value)
    }

    const accessUser = (event) =>{
        event.preventDefault();
        fetch('http://localhost:2023/api/session',
        {
            method: 'POST',
            headers: {'Content-Type':'application/json' },
            body: JSON.stringify({email, password})
        }).then(
            async response => {
                if(!response.ok){
                    throw await response.json()
                }
                return response.json();
            }
        ).then((result) => {
            console.log(result)
            setErrorAuth('');
            localStorage.setItem("token", result.token);
            localStorage.setItem("email", result.account.email);
            localStorage.setItem("id", result.account.id_user);
            //sessionStorage.setItem("token", token);
            navigate('/judges', {replace: true});
        }).catch(
            error => {
                setErrorAuth(error.errorAuth.message)
            }
        );
    }


    return(
        <div className="contentDiv">
            <h1>Login</h1>
            <div className="content-form">
            <p>Ingresa tu usuario y contraseña para poder ver las acciones que solo los jueces puede hacer</p>
            <form onSubmit={accessUser}>
                        <div>
                        <label htmlFor="nameUser">Correo</label>
                        <input type="text" onChange={intoUserName} value={email} id="nameUser" name="nameUser" />
                        </div>
                        <div>
                        <label htmlFor="passUser">Contraseña</label>
                        <input type="password" onChange={intoPassUser} value={password} id="passUser" name="passUser"/>
                        </div>
                        <div className="align-button">
                        <button type="submit">Ingresar</button>
                        </div>
            </form>
            </div>
        </div>
    )
}

export default loginJudge