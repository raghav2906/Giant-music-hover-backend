const jwt = require('jsonwebtoken')
const Artist = require('../models/Artist');

module.exports = (req,res,next) => {
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"You must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,"1234",(err,payload)=>{
        if(err){
            return res.status(401).json({error:"you must be logged in !"})
        }
        const {_id} = payload
        Artist.findById(_id).then(artist=>{
            req.artist=artist
        })
        next()
    })
}