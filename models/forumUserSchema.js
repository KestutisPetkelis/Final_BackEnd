const mongoose =require("mongoose")
const Schema =mongoose.Schema


const forumUserSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    createTime:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    photo:{
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model("forumUserModel", forumUserSchema)