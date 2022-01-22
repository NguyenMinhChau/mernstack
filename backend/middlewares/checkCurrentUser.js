const jwt = require('jsonwebtoken');
function checkCurrentUser(req, res, next) {
    const authorization = req.header('authorization');
    if (!authorization) {
        req.user = null;
        next();
    }else{
        const token = authorization.replace('Bearer ', '');
        try{
            const {userId} = jwt.verify(token, process.env.APP_SECRET);
            req.user = {userId};
            next();
        }catch(err){
            req.user = null;
            next(err);
        }
    }
}
module.exports = checkCurrentUser;