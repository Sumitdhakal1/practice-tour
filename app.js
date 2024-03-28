const express = require('express')
const dotenv =require('dotenv')
const tourRoute = require('./routes/tourRoutes')
const AppError = require('./utils/appError')

process.on('uncaughtException', err =>{
    console.log('uncaught exception : shutting down')
    console.log(err.name , err.message)
    process.exit(1)
})

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/tour', tourRoute)

app.all('*',(req, res, next)=>{
    next(new AppError(`can't find ${req.originalUrl} on this server`,404))
})

process.on('unhandledRejection', err =>{
    console.log('unhandled rejection : shutting dow')
    console.log(err.name, err.message)
    server.close(()=>{
        process.exit(1);
    })
})

module.exports = app;