const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types;
const postSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    body:{
        type:String,
    },
    photo:{
        type:String,
    },
    likes:[{type:ObjectId,ref:"User"}],
    comments:[{text:String,
        postedBy:{
            type:ObjectId,
            ref:"User"
        }
    }],
    date:Date,
    postedBy:{
        type: ObjectId,
        ref:"User"
    }
})

mongoose.model("Post",postSchema)