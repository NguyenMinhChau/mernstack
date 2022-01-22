const jwt = require('jsonwebtoken');
function verifyToken (req, res, next) {
    let authorization = req.header('authorization');
    if(!authorization){
        const err = new Error('Unauthenticated');
        err.statusCode = 401;
        return next(err);
    }
    let token = authorization.replace('Bearer ', '');
    let {userId} = jwt.verify(token, process.env.APP_SECRET);

    req.user = {userId};
    next();
}
module.exports = verifyToken;