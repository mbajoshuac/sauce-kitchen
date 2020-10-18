const express = require('express')
const app = express();
const userRouter = require('./routes/userRoute')
const mealRouter = require('./routes/mealRoute')
const orderRouter = require('./routes/orderRoute')
const response = require('./utils/response')

//middilewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/public`))

//user routes middleware
app.use('/user', userRouter)
app.use('/meal', mealRouter)
app.use('/order', orderRouter)




//Error MiddleWare
app.use((err, req, res, next) => {
    err.message = err.message || "Something went wrong";
    res.status(500).json(response('failed', err.message))
})

//dead end route
app.use("*", (req, res) => {
    res.status(404).json(response('failed', "You're trying to access a route that doesn't exist...🙄 "))
})

module.exports = app