const { default: mongoose } = require("mongoose");
const { Account } = require("../../models/mongo");
const {gett,ts} = require('./account.zod')

async function getBal(req,res){
    // const r = gett.safeParse(req.userId)
    // if(!r.success){
    //     return res.json({
    //         msg: "Invalid Inputs"
    //     })
    // }
    const acc = await Account.findOne({
       userId: req.userId
    });
    if(acc){
        return res.json({
            balance: acc.balance
        })
    }
    return res.json({
        msg: "Nothing is there"
    })
}
async function transferBal(req,res){
    const r = ts.safeParse(req.body);
    console.log(req.body.to)
    if(!r.success){
            return res.json({
                    msg: "Invalid Inputs"
            })
    }
    const session = await mongoose.startSession();
    console.log("Transaction Starts")
    session.startTransaction();
    const {amount , to} = req.body;
    const acc = await Account.findOne({
        userId: req.userId,

    }).session(session);

    if(!acc || acc.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg: "You have insufficient Balance"
        })
    }
    const toAcc  = await Account.findOne({userId: to}).session(session);
    if(!toAcc){
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Invalid Account"
        })
    }
    await Account.updateOne({
        userId: req.userId
    },{
        $inc: {balance: -amount}
    }).session(session);
    await Account.updateOne({
        userId: to
    },{
        $inc: {balance: +amount}
    }).session(session);
    await session.commitTransaction();
    return res.json({
        msg: "Transfer Successful"
    })

}


module.exports = {
    getBal,
    transferBal,
}