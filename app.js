require('dotenv').config();

const express = require('express')
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT || 3030

app.use(express.json())
app.use(bodyparser.urlencoded({extended:true}))

// mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>{
    console.log("BD is connected")
}).catch((err)=>{
    console.log(err)
    process.exit();
})

app.use(require('./controllers/AlbumController'))
app.use(require('./controllers/ArtistController'))
app.use(require('./controllers/SongsController'))


app.get('/',(req,res)=>{
    res.send('Hello!')
})

console.log(process.env.MONGO_URL)

app.listen(port,(err)=>{
    if(err) console.log(err);
    else console.log(`listening on port ${port}`)
})