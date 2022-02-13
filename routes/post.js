const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middleware/requireLogin")
const Post = mongoose.model("Post")

// View all posts
router.get("/allPost",requireLogin,async(req,res)=>{
    await Post.find()
    .populate("postedBy","_id name email")
    .populate("comments.postedBy","_id name email")
    .then(posts =>{
        res.json({posts})
    })
    .catch(err =>{console.log(err)})
})
// View Followers Post only

// Create Post
router.post("/CreatePost",requireLogin,async(req,res)=>{
    const {title,body,picUrl}  = req.body
    // if(!picUrl)
    //     return res.status(422).json({error:"Please add all the fields"})
    // req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo:picUrl,
        postedBy:req.user
    })
    await post.save()
    .then(result =>{
        res.json({post:result})})
    .catch(err => {console.log(err)})
})

router.put("/comment",requireLogin,async(req,res)=>{
    const comment={
        text:req.body.text,
        postedBy:req.user._id
    }
    await Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment},
        },
        {new:true
        })
        .populate("comments.postedBy","_id name email")
        .populate("postedBy","_id name email")
        .exec((err,result)=>{
            if(err)
                return res.status(422).json({error:err})
            res.json(result)
        })
})

module.exports = router;