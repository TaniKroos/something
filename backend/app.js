
const express = require('express');
 const cors = require('cors')
const app = express();
const mainRouter = require('./routes/index');
const useMid = require('./middlewares/auth');
// Middleware
app.use(cors())
app.use(express.json());

// Routes
async function me(req,res,next){
    const token = req.headers.authorization
    if(!token){
        return res.status(403).json(null)
    }
    const words = token.split(" ");
    const jwtT = words[1];
    const dec = jwt.verify(jwtT,JWT_SECRET);

    if(dec.userId){
        req.userId = dec.userId
        next();
    }
    else{
        return res.status(403).json(null)
    }
}
app.get('/me',me , (req, res) => {
    return res.status(200).send('Hello from the root route!');
});
app.get('/hola' ,useMid, (req,res)=>{
    res.json({
        msg: "Woah"
    })
})

app.use('/api/v1', mainRouter);


module.exports = app;
