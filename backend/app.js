
const express = require('express');
 const cors = require('cors')
const app = express();
const mainRouter = require('./routes/index');
const useMid = require('./middlewares/auth');
// Middleware
app.use(cors())
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hello from the root route!');
});
app.get('/hola' ,useMid, (req,res)=>{
    res.json({
        msg: "Woah"
    })
})

app.use('/api/v1', mainRouter);


module.exports = app;
