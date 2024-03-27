const app = require('./app')
const mongoose = require('mongoose')
const port = 5100
const dotenv =require('dotenv')

dotenv.config({path: './config.env'})

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
mongoose.connect(DB, {

  }).then(()=> console.log('database connected successfully'))



app.listen(port, ()=>{
    console.log(`App running on port ${port}...`);
  });

