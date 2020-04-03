const express = require('express')
const app = express()
const mongoose =require('mongoose')
const db =require('./config/keys').mongoURI
const user= require('./router/api/user')
const profile= require('./router/api/profile')
const port = 3000 || process.env.PORT
const bodyParser=require('body-parser')
const passport =require('passport')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
}).then(()=>{
  console.log('mongodb connected')
}).catch((err)=>{
  console.log(err);
})

app.use(passport.initialize());
require('./config/passport')(passport)

app.use('/api/user',user)
app.use('/api/profile',profile)

app.listen(port)