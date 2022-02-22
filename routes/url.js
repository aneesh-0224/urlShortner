const express= require('express')
const router= express.Router()
const Url = require('../models/Url.js')
const shortid= require('shortid')
const validUrl = require('valid-url')

const base_Url = 'http:localhost:4000'
router.post('/shorten',async(req,res)=>{
    const {long}= req.body
    const urlcode= shortid.generate()

    if(validUrl.isUri(long)){
        try{
            const url = await Url.findOne({long})

            if(url){
                res.send(`your shortened url is ${url.short}`)
            }
            else{
                const short = base_Url+ '/' + urlcode;
                const new_url= await Url.insertMany({urlcode,long,short})
                res.send(`your shortened url is ${new_url.short}`)
            }
        }
        catch(err){
             console.log(err)
             res.status(500).send('server error')
        }
    }
    else{
        res.status(401).send('invalid URL')
    }
})

module.exports = router