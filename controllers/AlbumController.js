const Album = require('../models/Album')
const express = require('express')
const middleware = require('../middleware/middleware')
const router = new express.Router()

router.get('/api/albums',(req,res) => {
    // let albums;
    // try{
    //     albums = await Album.find()
    // }catch(error){
    //     if(error) return res.status(500).json(error)
    // }
    // if(!albums){
    //     return res.status(404).json({"msg":"no albums"})
    // }
    // res.status(200).json(albums)
    Album.find()
        .then((data)=>{
            if(!data) return res.status(404).json({"msg":"No data"})
            res.status(201).json(data)
        })
        .catch(err=>{
            res.status(500).json({"msg":"something went wrong!"})
        })
})
exports.getall =  (req,res) => {
}

router.post('/api/createalbum',middleware ,async (req,res) => {
    if(!req.body.name || !req.body.pic)
        return res.status(500).json({"Error":"fill all the blanks"})
    const NewAlbum=new Album({
        name:req.body.name,
        pic:req.body.pic
    })
    let data;
    try{
        data = await Album.find()
    }catch(error){
        if(error) return res.status(500).json({"Error":error})
    }
    if(!data){
        return res.status(404).json({"Error":"no data"})
    }

    const duplicate = data.filter(item=>{ return item.name === NewAlbum.name})

    console.log(NewAlbum)
    if(duplicate.length === 0){

    
        let album;
        try{
            album = await NewAlbum.save()
        }catch(error){
            if(error) return res.status(500).json({"Error":error})
        }
        res.status(201).json({"msg":"created Album!","Album":album})
    }
    else{
        res.status(404).json({"Error":"TRy with another name!"})
    }
})

module.exports = router