require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./configs/db')
const router = require('./routers')
const errorHandler = require('./middlewares/errorHandling')
const app = express()
const port = process.env.APP_PORT || 3000
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

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '../frontend/build'));
    app.get('*', (req,res) => {
        res.sendFile(__dirname + '../frontend/build/index.html');
    })
}

app.listen(port, () => {
    console.log(`Twitter listening at http://localhost:${port}`)
})