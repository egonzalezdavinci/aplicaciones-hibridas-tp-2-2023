import { useNavigate } from "react-router-dom";

function logoutUser(){
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    fetch('http://localhost:2023/api/session',
    {
        method: 'DELETE',
        headers: {'auth-token': token },
        body: JSON.stringify({token})
    }).then((result) => {
        console.log(result)
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
        navigate('/position', {replace: true});
    });
}

export default logoutUser;