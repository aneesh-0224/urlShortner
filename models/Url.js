const mongoose=require('mongoose')
const schema = mongoose.Schema
const Url_schema = new schema({
    urlcode:String,
    long:String,
    short:String
})
module.exports = mongoose.model('Url',Url_schema)