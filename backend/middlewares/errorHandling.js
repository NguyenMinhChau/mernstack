function errorHandler(err, req, res, next) {
    err.statusCode = err.statusCode || 500;

    //Các lỗi xử lý trong catch()
    //Duplicated
    if(err.code === 11000){
        err.statusCode = 400;
        for(let p in err.keyValue){
            if(p === 'username'){
                err.message = 'Username already exists';
                break;
            }
            if(p === 'email'){
                err.message = 'Email already exists';
                break;
            }
        }
    }
    // ObjectId not found
    if(err.kind === 'ObjectId'){
        err.statusCode = 404;
        err.message = `Page URL ${req.originalUrl} not found.`;
    }

    //Các lỗi xử lý trong form
    //Validtion
    if(err.errors){
        err.statusCode = 400;
        err.message = [];
        for(let p in err.errors){
            err.message.push(err.errors[p].properties.message);
        }
    }

    //Các lỗi xử lý trong if...else
    res.status(err.statusCode).json({
        status: 'failed',
        message: err.message,
    });
}
module.exports = errorHandler;