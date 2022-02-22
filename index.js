const express = require('express')
const cors= require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const mongoose = require('mongoose')
const path=require('path');
const ejsMate= require('ejs-mate')
const methodOverride= require('method-override')
const app= express();

const Db= 'mongodb://localhost:27017/urls';
mongoose.connect(Db,{
    useNewUrlParser:true,   
    useUnifiedTopology:true
});
const db=mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'))
db.once('open',()=>{
    console.log('database connected')
})

const Url = require('./models/Url.js')
app.use(methodOverride('_method'))
app.engine('ejs',ejsMate)
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({extended:true}))
app.use(helmet())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())


const urlRouter = require('./routes/url.js')
//const redirectRouter = require('./routes/redirect.js')

app.use('/url',urlRouter)
//app.use('/:urlcode',redirectRouter)
app.get('/:urlcode',async(req,res)=>{
    const {urlcode} = req.params
    try{
    const url = await Url.findOne({urlcode})
    if(url){
        res.redirect(url.long)
    }
    else{
        res.send('no such code for any url')
    }
}
catch(err){
    console.log(err)
    res.status(500).send('server error')
}
})

app.get('/',(req,res)=>{
    res.render('homepage')
})


const port =  4000;
app.listen(4000,()=>{
    console.log(`server started on port ${port}`)
})
