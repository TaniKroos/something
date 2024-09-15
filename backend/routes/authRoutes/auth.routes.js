const express = require('express');
const { Signup,Signin,Update,getUsers} = require('./auth.controller');
const useMid = require('../../middlewares/auth');
const { use } = require('bcrypt/promises');
const authRouter = express.Router();

authRouter.post('/signup',Signup)
authRouter.post('/signin',Signin)
authRouter.put('/update',useMid,Update)
authRouter.get('/users',useMid,getUsers)

module.exports = {
    authRouter,
};