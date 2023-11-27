import { MongoClient, ObjectId } from "mongodb";
const client = new MongoClient("mongodb://127.0.0.1:27017");
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
//import { verifySession } from "../middleware/vote-check";
const db = client.db("GAMEJAM_BASE");

const JudgesCollection = db.collection('Judges');
const TokensCollection = db.collection('Tokens');

async function createAccount(account){
    await client.connect();

    const newAccount = {
        ...account
    }
    newAccount.password = await bcrypt.hash(account.password, await bcrypt.genSalt(10))
    await JudgesCollection.insertOne(newAccount)
}

async function verifyAccount(account){
    await client.connect();
    let accountExist = await JudgesCollection.findOne({email: account.email});
    if(!accountExist){
        throw new Error('El email no existe');
    }
    const passComparation = await bcrypt.compare(account.password, accountExist.password);

    if(!passComparation){
        throw new Error('Los datos de acceso no son correctos')
    }

    return { ...account, password: undefined, id_user: accountExist._id}
}

async function createToken(payload){
    const token = jwt.sign(payload, "CLAVE SECRETA");
    await TokensCollection.insertOne({token, email: payload.email});
    return token;
}

async function createSession(account){
    return {
            account: await verifyAccount(account), 
            token: await createToken({...account, password: undefined})
            }
}

async function verifyToken(token){
    await client.connect();
    const payload = jwt.verify(token, "CLAVE SECRETA");

    if(!await TokensCollection.findOne({token})){
        throw {msg: "El token no se encuenta en nuestra base"};
    }
    return payload;
}

async function deleteSession(token){
    await client.connect();
    return await TokensCollection.deleteOne({token});
}

export{
    createAccount,
    createSession,
    deleteSession,
    verifyToken
    
}

export default{
    createAccount,
    createSession,
    deleteSession,
    verifyToken
}