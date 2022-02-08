require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path');
const db = require('./configs/db')
const router = require('./routers')
const errorHandler = require('./middlewares/errorHandling')
const port = process.env.APP_PORT || 5000;
const app = express()
//cho phép frontend kết nối backend
app.use(cors());

//xử lý dữ liệu form
app.use(express.urlencoded({ extended: true }))
//bodyParser
app.use(express.json())

//connection db
db.connectDB();
router(app);

//Unhandled Route
app.all('*', function(req, res, next) {
    const err = new Error('URL Not Found');
    err.statusCode = 404;
    next(err);
})
//use errorHandler
app.use(errorHandler)

//path.join
app.use(express.static('./uploads/'));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, './build/')));
    app.use('*', (req, res) => {
        res.sendFile(path.join(__dirname, './build/uploads/'));
    })
} 

var port_number = app.listen(process.env.PORT || 5000);
app.listen(port_number, () => {
    console.log(`Twitter listening at http://localhost:${port} in ${app.settings.env} mode`);
})