const mongoose = require('mongoose')
const schema=mongoose.Schema
const Profileschema =new schema({
  type:{
    type:String
  },
  describe:{
    type:String
  },
  incode:{
    type:String,
    required:true
  },
  expend:{
    type:String,
    required:true
  },
  cash:{
    type:String,
    required:true
  },
  remark:{
    type:String
  },
  date:{
    type:Date,
    default:Date.now
  },
})

module.exports=Profile =mongoose.model('profiles',Profileschema)