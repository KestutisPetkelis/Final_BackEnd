const forumUserModel= require("../models/forumUserSchema")
const auctionModel= require("../models/themaSchema")
const bcrypt = require("bcrypt")    // HASH crypto modulis


module.exports = {
    registeruser: async (req, res) => {
        const data = req.body
        console.log(data)
        const createCrypto = async(data) =>{
            const hash = await bcrypt.hash(data.password,10)
            console.log("HASHAS", hash)
            const isUser = await  forumUserModel.findOne({username:data.name})
        
            if (!isUser){
                const user = new forumUserModel()
                user.username = data.name
                user.createTime = Date.now()
                user.password = hash
                user.photo = data.photo
                console.log(user)
                const newUser = await user.save()
                console.log(newUser)
                res.send({success:true, message: " User has been registered"})
                
            }else{
                console.log("toks jau yra")
                res.send({success:false, message: " This username allready exists"})
            }
        }
        createCrypto(data)
    },
    loginuser: async (req, res) => {
        const data = req.body
        // const {name, password} = req.body

        const comparePsw = async(data) =>{
            
            const user = await  forumUserModel.findOne({username:data.name})
        
            if (user){
                const compare = await bcrypt.compare(data.password,user.password)
                //console.log("This user ", user, compare)
                if(!compare){
                    //console.log ("Ne valio su slaptazodziu...")
                    req.session.user = null
                    res.send({success: false, message: "Something wrong with this password"})
                }else{
                //console.log ("Valio")
                req.session.user = user
                res.send({success: true, message: "User logged successfully", user})
                }
                
            }else{
                //console.log("toks jau yra")
                req.session.user = null
                res.send({success: false, message: "There are no such user"})
            }
        }
        comparePsw(data)
    },
    logout: (req, res) => {
        req.session.user = null
        res.send({success: true, message: "User logged out"})
    },
    allusers: async (req, res) => {
        const user = req.session.user   
        console.log("current user", req.session.user)
        const allUsers = await forumUserModel.find() 
        console.log (allUsers)
        if(req.session.user){
            res.send({message:"All users", allUsers, user})
        }else{
            res.send({message:"All users without active user", allUsers})
        }
    },
    changeavatar: async (req, res) => {
        const user = req.session.user
        const data = req.body
        console.log ("Avatar", user, data)
        if(req.session.user){
            await forumUserModel.findOneAndUpdate({_id:user._id},{photo:data.photo})
            res.send({success: true, message: "Avatar changed successfully"})
        } else{
            res.send({success: false, message: "You can not change avatar for nobody"})
        }
        
    },






    createauction: async (req, res) => {
        const data = req.body
        console.log(data, req.session.user)

        if(req.session.user){
            console.log("Session user", req.session.user.username)
            const auction = new auctionModel()
            auction.username=req.session.user.username
            auction.image = data.image
            auction.title = data.title
            auction.time = Date.now()+data.time
            auction.startprice = Number(data.price)
            auction.sellprice= Number(data.price)
            auction.active = true
            
            const newauction = await auction.save()

            return res.send({success:true, message:"Auction has been created successfully ", newauction })
        }
        res.send({success:false, message:"To create auction you need login first"})
    },
    allauctions: async (req, res) => {
        const user = req.session.user   
        //console.log("current user", req.session.user)
        const allAuctions = await auctionModel.find() 
        if(req.session.user){
            res.send({message:"All auctions", allAuctions, user})
        }else{
            res.send({message:"All auctions without active user", allAuctions})
        }
    },
    getauction: async (req,res) =>{
        const {id} = req.params // perduodam id per paramsus
        const user = req.session.user
        //console.log ("some ID", id )
        const singleauction = await auctionModel.findOne({_id:id})
        res.send({message: "single auction", singleauction, user})
       //res.send({message: "single auction"})
    },
    addbid: async (req,res) =>{
        const data = req.body
        console.log("pridedam statyma", data)
        const newbid={
            username: data.username,
            bid: data.bid,
            time: Date.now()
        }
         console.log("Statymo objektas", newbid)
        await auctionModel.findOneAndUpdate({_id:data.id},{$set:{sellprice:data.bid}})
        await auctionModel.findOneAndUpdate({_id:data.id}, {$push:{bids:newbid}
        })
        res.send({message:"New bid has been added "})
    },
    getuserinfo: async (req,res) =>{
        //const data = req.body
        //const {user} = req.params
        const thisuser = req.session.user
        if(thisuser){
            //console.log("imam userio duomenis",  lll.username)
            const activeuser = await forumUserModel.findOne({username:thisuser.username})
            return res.send({message:"info user ", activeuser})
        }
        
        const activeuser=false
        res.send({message:"info user undefined", activeuser})
    },




        
        // const user = new userModel2()
        // user.username = data.name
        // user.image = "https://png.pngitem.com/pimgs/s/80-801053_aws-simple-icons-non-service-specific-user-default.png"
        // user.password = data.password
        
        // console.log(user)
        // const newUser = await user.save()
        // console.log(newUser)
        // user.save().then(res => {
        //     console.log('user saved')
        // })
           
        // res.send({key:"kazkas", newUser})
    // },






    // createcar:(req,res) =>{
    //     const data =req.body
    //     // const {model, year, color, power, gasConsumption} = req.body  iskart galim destrukturizuoti 
        
    //     console.log(data)
    //     const car = new carModel()
    //     car.model=data.model
    //     car.year=data.year
    //     car.color=data.color
    //     car.gasConsumption=data.gasConsumption
    //     car.power=data.power

    //     //Object.keys(req.body).map(key{ car[key]=req.body[key]})  uzpildom viska, jei daug lauku (uzpildom pagal key)

    //     car.save().then(res =>{
    //         console.log("car successfully saved")
    //     })
    //     res.send({car:"ok",car})
    // },
    // findcar: async (req,res)=>{
    //     const data=req.body
    //     console.log(data, "lenght", data.model, data.model.length)
    //     if (data.model.length>0){
    //         const cars = await carModel.find({model:data.model})
    //         console.log("find result ", cars)
    //         res.send({message:"ok", cars})
    //     }else{
    //         const cars = await carModel.find()
    //         console.log("return all ", cars)
    //          res.send({message:"ok", cars})
    //     }
    // },
    // findcar2: async (req,res)=>{
    //     const data=req.body
    //     console.log(data)
    //     if (data.type==="model"){
    //         const cars = await carModel.find({model:data.field})
    //         console.log("find model ", cars)
    //         res.send({message:"ok", cars})
    //     }else if(data.type==="year"){
    //         const cars = await carModel.find({year:Number(data.field)})
    //         console.log("find year ", cars)
    //         res.send({message:"ok", cars})
    //     }else{
    //         const cars = await carModel.find({color:data.field})
    //         res.send({message:"ok", cars})
    //     }

        
    // },
    // updatecar:async(req,res)=>{
    //     const {id} = req.params // perduodam id per paramsus
    //     const data=req.body     // perduodam duomenis
    //     const updatingCar ={
    //         model : data.model,
    //         year:data.year,
    //         color:data.color,
    //         gasConsumption:data.gasConsumption,
    //         power:data.power
    //     }
    //     await carModel.findOneAndUpdate({_id:id},{$set:updatingCar})
    //     res.send({message:"car record has been updated "})
    //     console.log (data, id )
    // },
    // deletecar: async(req,res)=>{
    //     const {id} = req.params // perduodam id per paramsus
    //     console.log ( id )
    //     await carModel.findOneAndRemove({_id:id})
    //     // await carModel.findOneAndDelete({_id:id})   analogiskai veikia siuo atveju
    //     res.send({message: "car record has been deleted"})
    // }

    
}