const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const User = mongoose.Schema({
    username: {type: String, required: [true, "Username is required"], unique: true, trim: true},
    password: {type: String, required: [true, "Password is required"], minlength: [6,"Password minimum 6 characters"], maxlength: [20,"Password up to 20 characters"]},
    email: {type: String, required: [true, "Email is required"], unique: true, trim: true},
    image: {type: String, required:[true, "Image is required"]},
}, {
    timestamps: true
});

User.pre('save', function(next){
    bcrypt.hash(this.password, 10, (err, hash) => {
        if(err){
            return next(err);
        }else{
            this.password = hash;
            next();
        }
    })
});

module.exports = mongoose.model('User', User);