const mongoose =require("mongoose")
const Schema =mongoose.Schema


const notificationSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    readStatus:{
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("notificationModel", notificationSchema)