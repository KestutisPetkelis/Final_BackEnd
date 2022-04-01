const mongoose =require("mongoose")
const Schema =mongoose.Schema


const themaSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    time:{
        type: Number,
        required: true
    },
    posts:{
        type:[
            {
            "username": String,
            "photo": String,
            "youtubeUrl": String,
            "text": String,
            "time": Number
            }
        ]

    }
})

module.exports = mongoose.model("themaModel", themaSchema)