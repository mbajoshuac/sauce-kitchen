const express = require('express')
const app = express();
const userRouter = require('./routes/userRoute')
const mealRouter = require('./routes/mealRoute')

//middilewares
app.use(express.json())

//user routes
app.use('/user', userRouter)
app.use('/meal', mealRouter)


//Error MiddleWare

app.use((err, req, res, next) => {
    console.log(err);
    res.status(400).json({
        status: 'failed',
        message: err
    })
})


module.exports = app