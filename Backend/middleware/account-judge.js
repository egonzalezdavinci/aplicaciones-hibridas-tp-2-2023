/*import AccountJudgeSchema from '../schema/validAccountJudge.js';

function validateCreateAccountJudge(req, res, next){

    AccountJudgeSchema.validate(req.body, {
        stripUnknown: true,
        abortEarly: false
    }).then(async function(data){
            req.body = data
            next()
        }).catch(function(err){
            res.status(400).json(err)
        });
}

export default{
    validateCreateAccountJudge
}*/