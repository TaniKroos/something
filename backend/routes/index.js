const express  =  require('express');
const { authRouter } = require('./authRoutes/auth.routes');
const {accountRouter} = require('./account/account.route')
const router = express.Router();
router.use('/user',authRouter);
router.use('/account',accountRouter);
module.exports  =  router;