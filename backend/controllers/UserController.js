const User = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserController = {
    //[POST] api/v1/users/register
    register: async function(req, res, next){
        try{
            let user = await User.create(req.body);
            let token = jwt.sign({userId: user._id}, process.env.APP_SECRET);
            res.status(200).json({
                status: 'success',
                message: 'Account successfully created',
                data: {user, token}
            })
        }catch(err){
            next(err)
        }
    },
    //[POST] api/v1/users/login
    login: async function(req, res, next){
        try{
            let user = await User.findOne({
                email: req.body.email
            });
            if(!user){
                const err = new Error('Email does not exist');
                err.statusCode = 400;
                return next(err);
            }
            if(bcrypt.compareSync(req.body.password, user.password)){
                let token = jwt.sign({userId: user._id}, process.env.APP_SECRET);
                res.status(200).json({
                    status: 'success',
                    message: 'Logged in successfully',
                    data: {user, token}
                })
            }else{
                const err = new Error('Password is not correct');
                err.statusCode = 400;
                return next(err);
            }
        }catch(err){
            next(err);
        }
    },
    //[GET] api/v1/users
    getCurentUser: async function(req, res, next){
        try{
            const data = {user: null};
            if(req.user){
                const user = await User.findOne({_id: req.user.userId});
                data.user = {_id: user.id, username: user.username, email: user.email};
            }
            res.status(200).json({
                data: data
            })
        }catch(err){
            next(err);
        }
    }
}
module.exports = UserController;