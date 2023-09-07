const mongoose= require('mongoose')

const taskCard = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})

exports.task=mongoose.model("task",taskCard)