const mongoose = require('mongoose')

const AlbumSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    pic:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Album',AlbumSchema)