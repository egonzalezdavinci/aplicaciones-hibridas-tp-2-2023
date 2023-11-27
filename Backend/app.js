import express from 'express';
import routerApiGameJam from './api/routers/api-routers.js';
import routerAccountJudge from './api/routers/api-auth.js'
import cors from 'cors';
const app = express();
app.use(cors());
app.use('/api', express.json());
app.use('/api', routerApiGameJam);
app.use('/api', routerAccountJudge);

app.listen(2023, function(){
    console.log('Server ok http://localhost:2023')
})
