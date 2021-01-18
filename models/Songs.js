const mongoose = require('mongoose')

const SongsSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    album:{
        type:String,
        required:true
    },
    lang:{
        type:String,
        required:true
    },
    artists:[{type:String}]
},{
    timestamps:true
})

module.exports = mongoose.model('Songs',SongsSchema)