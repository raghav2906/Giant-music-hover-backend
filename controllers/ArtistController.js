const Artist = require('../models/Artist');
const express = require('express')
const router = new express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const middleware = require('../middleware/middleware')

router.get('/api/artists',async (req,res) => {
    let data;
    try{
        data = await Artist.find()
    }catch(error){
        if(error) return res.status(500).json(error)
    }
    if(!data){
        return res.status(404).json({"msg":"no data"})
    }
    res.status(200).json(data)
}) 

router.post('/api/createartist',async (req,res) => {
    if(!req.body.username || !req.body.mail || !req.body.password || !req.body.img)
        return res.status(500).json({"msg":"fill all the blanks"})
    
    try{
        const hashedPassword = await bcrypt.hash(req.body.password,12)
        const NewArtist=new Artist({
            username:req.body.username,
            mail:req.body.mail,
            password:hashedPassword,
            img:req.body.img
        })
        console.log(NewArtist)
        try{
            const duplicate = await Artist.findOne({mail:req.body.mail})
            console.log(duplicate)
            if(!duplicate){
                let artist;
                try{
                    artist = await NewArtist.save()
                }catch(error){
                    if(error) return res.status(500).json({"Error":error})
                }
                res.status(201).json({"msg":"create","Artist":artist})
            }
            else{
                return res.status(404).json({"Error":"Email already Exists! try different one."})
            }
        }
        catch(error){
            if(error) return res.status(500).json({"Error":error})
        }
        
    }
    catch(error){
        if(error) return res.status(500).json({"Error":error})
    }
    
    
})

router.post('/api/login',async (req,res)=>{
    const {mail,password} = req.body
    if(!mail || !password){
        return res.status(500).json({"Error":"fill all the blanks"})
    }
    try{
        const artist = await Artist.findOne({mail:mail})
        if(!artist){
            return res.status(404).json({"Error":"Invalid mail or password"})
        }
        const doMatch = await bcrypt.compare(password,artist.password)
        if(doMatch){
            // res.status(200).json({"msg":"Succesfully logged in"})
            const token = jwt.sign({_id:artist._id},'1234')
            const {_id,username,mail,img} = artist
            res.json({token,artist:{mail,_id,username,img}})
        }
        else{
            return res.status(404).json({"Error":"Invalid mail or password"})
        }
    }
    catch(error){
        if(error) return res.status(500).json({"Error":error})
    }

})

module.exports = router