const mongoose = require('mongoose')

const ArtistSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    mail:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Artist',ArtistSchema)