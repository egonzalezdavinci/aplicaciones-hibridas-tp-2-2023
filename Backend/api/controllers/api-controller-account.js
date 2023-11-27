import * as accountService from '../../services/account-service.js';

function createAccountJudge(req, res){
    accountService.createAccount(req.body).then(
        function(){
            return res.status(201).json({msj: "Cuenta creada"});
        }
    ).catch(
        function(){
            res.status(500).json({ msg: "Algo salio mal" })
        }
    );
}

function login(req, res){
    accountService.createSession(req.body).then(
        function(session){
            return res.status(200).json(session);
        }
    ).catch(
        function(){
            res.status(500).json({ msg: "no pudo iniciar sesion" })
        }
    );
}

function logout(req, res){
    accountService.deleteSession(req.token).then(
        function(){
            res.status(200).json({});
        }
    ).catch(
        function(){
            res.status(500).json({ msg: "no pudo iniciar sesion" })
        }
    );
}

export{
    createAccountJudge,
    logout,
    login
}

export default{
    createAccountJudge,
    logout,
    login
}