const express= require('express')
const router= express.Router()
const Url = require('../models/Url.js')

router.get('/:urlcode',async(req,res)=>{
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

module.exports = router