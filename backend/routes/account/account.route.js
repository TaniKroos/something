const express = require('express');
const useMid = require('../../middlewares/auth');
const { getBal , transferBal } = require('./account.controller')
const accountRouter = express.Router();


accountRouter.get('/getBalance', useMid , getBal )
accountRouter.post('/transfer',useMid,transferBal)

module.exports = {
    accountRouter,
}