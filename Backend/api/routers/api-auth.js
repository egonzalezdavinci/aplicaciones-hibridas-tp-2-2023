import {Router} from 'express';
import controllerAccount from '../controllers/api-controller-account.js';
import {validateCreateAccountJudge, verifySession} from '../../middleware/vote-check.js';
const route = Router();

route.post('/account', [validateCreateAccountJudge], controllerAccount.createAccountJudge);
route.post('/session', [validateCreateAccountJudge], controllerAccount.login);
route.delete('/session',[verifySession],controllerAccount.logout);
export default route;