const express = require("express")  // serveris

const app = express()
const mongoose = require("mongoose") // duomenu baze Mongoose
const session = require("express-session") // sesijos
const schedule = require('node-schedule')
require('dotenv').config()

app.use(express.json()) ///Butinai reikia isideti, kad pasiimtu duomenis is req.body

// const cors = require("cors")
// app.use(cors())
const http= require('http').createServer(app)

const io = require('socket.io')(http,{
    cors:{
        origin: "http://localhost:3000"
    }
})

//app.listen(4000)   // klausom porto: pvz.: 4000

http.listen(4000, () =>{
    console.log("Listen on port 4000")
})

app.use((req, res, next) => {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(session({
    secret: process.env.SESSION_SECRET_KEY,    //  pasiimam is .env failo reiksme
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const router = require("./routes/main")
const { json } = require("express")
app.use("/", router)


mongoose.connect(process.env.MONGO_KEY)  // pasiimam is .env failo reiksme
.then(res=>{
    console.log("connection good")
}).catch(e =>{
    console.log(e)
})

// const newUserModel= require("./models/newUserSchema")
// const auctionModel= require("./models/auctionSchema")

// async function controlBids(){           // **** BID CONTROL MODULE **** //
//     //const all = await auctionModel.find({time:{ $gte: Date.now() }})
//     const all = await auctionModel.find({active:true})      // atrenkam aktyvius aukcionus  is bendros DB
//     //console.log(all.length, all)
//     const endAuction = all.find(x=>x.time<=Date.now()) // tikrinam aktyvius aukcionus ar nera pasibaiges laikas
//     if (endAuction) {
//         if( endAuction.bids.length>0){      // vykdom tuo atveju, jei yra statymu, kitaip tiesiog deaktyvuojam
//             console.log("endAuction'as.....",endAuction, endAuction.bids[endAuction.bids.length-1].username )
//             const winner = endAuction.bids[endAuction.bids.length-1].username   // aukciono laimetojas
//             const currentUser = await newUserModel.findOne({username:winner})
//             const currentMoney = currentUser.money - endAuction.sellprice
//             const bidUser= await newUserModel.findOne({username:endAuction.username})   // aukciono kurejo objekto
//             const plusCurrentMoney = bidUser.money+endAuction.sellprice
//             if(currentMoney>=0){        // jei laimetojas po keliu aukcionu turi pinigu sumoketi.... kitaip aukciona deaktyvuojam
//                 await newUserModel.findOneAndUpdate({username:winner},{$set:{"money":currentMoney}}) // is laimetojo atimam pinigu
//                 await newUserModel.findOneAndUpdate({username:bidUser.username},{$set:{"money":plusCurrentMoney}})  // aukciono kurejui pridedam pinigu
//             }
//         }
//         await auctionModel.findOneAndUpdate({_id:endAuction._id},{$set:{"active":false}}) // pasibaigus laikui aukciona deaktyvuojam
    
//     }

// }
// const thisJob = schedule.scheduleJob('*/1 * * * * *', ()=>{
    
//     controlBids()
    
// })

// io.on("connection", socket =>{
//     console.log("socket connected...", "User connected: "+ socket.id)
//     console.log ("Now are connecting to server: "+io.engine.clientsCount)

//     socket.on("newAuction", message =>{
//         console.log(message)
//         io.emit('auctionToAll', message)
//     })
//     socket.on("newBid", message =>{
//         console.log(message)
//         io.emit('auctionToAll', message)
//     })
// })

