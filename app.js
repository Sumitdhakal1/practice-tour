const express = require('express')
const port = 4000
const app = express()
const tourRoute = require('./routes/tourRoutes')

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/tour', tourRoute)

app.all('*',(req, res, next)=>{
    const err = new Error(`can't find ${req.originalUrl} on this server`,404);
    err.status='fail',
    err.statusCode=404,
    next(err)
})

app.use('*',(err,req,res,next)=>{
    err.statusCode= err.statusCode || 500;
    err.status = err.status || 'error'

    res.status(err.statusCode).json({
        status:err.status,
        message:err.message
    })
})


module.exports = app;