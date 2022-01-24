require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./configs/db')
const router = require('./routers')
const errorHandler = require('./middlewares/errorHandling')
const path = require('path');
const app = express()
const port = process.env.APP_PORT || 5000
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

app.listen(port, () => {
    console.log(`Twitter listening at http://localhost:${port}`)
})