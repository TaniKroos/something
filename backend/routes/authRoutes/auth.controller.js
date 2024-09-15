const { model } = require("mongoose");
const { User, Account } = require("../../models/mongo");
const JWT_SECRET = process.env.JWT_SECRET
const mongoose  = require('mongoose');
const { sinin, sinup, update } = require("./auth.zod");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');


async function pswd(password){
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password,salt);
  return hash;
}


async function Signup(req,res){
    const r = sinup.safeParse(req.body)
    if(!r.success){
        return res.status(401).json({
            msg: "Why are you doing something that you shouldn't do"
        })
    }
    console.log("From Signup");
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    try {
        const user = await User.findOne({ email });
        

        if (!user) {
            hash = await pswd(password)
            const newUser = await User.create({
                username,
                email,
                password: hash,
                firstName,
                lastName
            });
            const userId =  newUser._id
            const acc  = await Account.create({
                userId,
                balance: 10000
            })
            const token  = jwt.sign({
                userId
            },JWT_SECRET);
            return res.status(200).json({ 
               userId,
                token
             });
        } else {
            return res.status(400).json({
                msg: "Email already exists",
            });
        }
    } catch (error) {
        console.error("Error in signup:", error);
        return res.status(500).json({
            msg: "Sorry, we can't let you in right now",
        });
    }

}





 
async function Signin(req,res){
    const r = sinin.safeParse(req.body)
    console.log(req.body)
    if(!r.success){
        return res.status(401).json({
            msg: "Why are you doing something that you shouldn't do"
        })
    }
    const email  = req.body.email
    const password = req.body.password
    try {
 
        const user = await User.findOne({email})
        if(user){
  
           
            const h = await bcrypt.compare(password , user.password);
            if(h){
                const token  = jwt.sign({
                    userId: user._id
                },JWT_SECRET)
               return res.status(200).json({
                msg: "One Kiss is all it takes ",
                token
               })
            }else{
                return res.status(400).json({ 
                    msg: "Wrong Password"
                })
            }
        }
        else{
            return res.status(400).json({
                msg:"User ain't exist"
            })
        }


    } catch (err) {
        console.log(err)
    }
}




async function Update(req,res){
        const r = update.safeParse(req.body);
    if(r.success){
        
        if(req.body.password){
            const c = req.body.password;
            req.body.password  = await pswd(c);
        }
        const result = await User.updateOne({_id: req.userId},{
            $set: {firstName: req.body.firstName,lastName: req.body.lastName, password: req.body.password}
        } );

        res.json({
            msg: "anything"
        })
         
    }else{
        return res.status(400).json({
            msg: "send correct inputs"
        }) 
    }
}



async function getUsers(req,res){
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName:{
                "$regex": filter
            }
        },{
            lastName: {
                "$regex": filter
            }
        }]
    });
    return res.status(200).json({
        user: users.map(user =>({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
        }))
    })
}



module.exports ={
    Signup,
    Signin,
    Update,
    getUsers,
}