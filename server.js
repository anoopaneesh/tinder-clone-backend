import express from 'express'
import mongoose from 'mongoose'
import Cors from 'cors'
import Cards from './dbCard.js'

//App config
const app = express()
const port = process.env.PORT || 8001
const connectionURL = 'mongodb+srv://admin:msrNQzCMRWHCIWxt@cluster0.p802l.mongodb.net/tinderdb?retryWrites=true&w=majority'

//Middleware
app.use(express.json())
app.use(Cors())

//DB Config
mongoose.connect(connectionURL,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
})


//API endpoints
app.get('/',(req,res)=>res.status(200).send("Hello world"))

app.post('/tinder/card',(req,res)=>{
    const card = req.body
    Cards.create(card,(err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/card',(req,res)=>{
    Cards.find((err,data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

//Listener
app.listen(port,()=>{console.log(`listening on localhost : ${port}`);})