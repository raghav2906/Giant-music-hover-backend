const Songs=require('../models/Songs')
const express = require('express')
const router = new express.Router()
const middleware = require('../middleware/middleware')

router.get('/api/songs',async (req,res)=>{
    let data;
    try{
        data =await Songs.find()
    }catch(error){
        if(error) return res.status(500).json(error)
    }
    if(!data) return res.status(404).json({"Error":"data not found"})
    res.status(200).json(data)
})

router.get('/api/songsalbum/:album',async (req,res)=>{
    let data;
    try{
        data =await Songs.find({album: req.params.album})
    }catch(error){
        if(error) return res.status(500).json(error)
    }
    if(!data) return res.status(404).json({"Error":"data not found"})
    res.status(200).json(data)
})

router.get('/api/songsname/:name',async (req,res)=>{
    let data;
    try{
        data =await Songs.find({name: req.params.name})
    }catch(error){
        if(error) return res.status(500).json(error)
    }
    if(!data) return res.status(404).json({"Error":"data not found"})
    res.status(200).json(data)
})

router.get('/api/songsartist/:artist',async (req,res)=>{
    let data;
    try{
        data =await Songs.find({artists: {$in : req.params.artist}})
    }catch(error){
        if(error) return res.status(500).json(error)
    }
    if(!data) return res.status(404).json({"Error":"data not found"})
    res.status(200).json(data)
})

router.post('/api/createsong',middleware, async (req,res) =>{
    if(!req.body.name || !req.body.img || !req.body.url || !req.body.artists || !req.body.lang || !req.body.album)
        return res.status(500).json({"Error":"fill all the blanks"})
    const NewSong=new Songs({
        name:req.body.name,
        img:req.body.img,
        url:req.body.url,
        artists:req.body.artists,
        lang:req.body.lang,
        album:req.body.album
    })

    let data;
    try{
        data =await Songs.find()
    }catch(error){
        if(error) return res.status(500).json({"Error":error})
    }
    if(!data) return res.status(404).json({"Error":"data not found"})

    const duplicate = data.filter((item)=>{
        return item.name === NewSong.name
    })
    console.log(duplicate)
    
    console.log(NewSong)
    if(duplicate.length === 0)
    {

    

        let song;
        try{
            song = await NewSong.save()
        }catch(error){
            if(error) return res.status(500).json({"Error":error})
        }
        res.status(201).json({"msg":"created song","Song":song})
    }
    else{
        res.status(404).json({"Error":"try with another name"})
    }
    
})

module.exports = router