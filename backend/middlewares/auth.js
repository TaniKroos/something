const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET


async function useMid(req,res,next){
    const token = req.headers.authorization
    if(!token){
        return res.status(403).json({
            msg: "I don't know you"
        })
    }
    const words = token.split(" ");
    const jwtT = words[1];
    const dec = jwt.verify(jwtT,JWT_SECRET);

    if(dec.userId){
        req.userId = dec.userId
        next();
    }
    else{
        return res.status(403).json({
            msg: "You are not Authenticated"
        })
    }
}
module.exports = useMid;