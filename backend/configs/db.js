require('dotenv').config();
const mongoose = require('mongoose');

//connect db
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true 
        })
        console.log('MongoDB Connected...')
    }
    catch{
        console.log('MongoDB Connection Error...')
    }
}
module.exports = {connectDB};