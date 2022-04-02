
module.exports ={
    validateData:(req,res, next)=>{
        const data = req.body
        
        console.log(data)
        if(data.password.length<3||data.password.length>20){
            res.send({success:false,
                message:"Wrong password length"
            })
        }else if(data.password!==data.password2){
            res.send({success:false,
                message:"Passwords do not match"
            })
        }else if(data.name.length<4 || data.name.length>20){
            res.send({success:false,
                    message:"The length of user name is less than 4 or more than 20"
                })
        }else if(!data.photo.includes("http")){
            res.send({success:false,
                message:"Avatar link does not includes 'http'"
            })

        }else {
            next()   
        }
    },
    validateAvatar:(req,res, next)=>{
        const data = req.body
        
       // console.log(data)
        if(!data.photo.includes("http")){
            res.send({success:false,
                message:"Avatar link does not include 'http'"
            })

        }else {
            next()   
        }
    },
    
    validateTopic:(req,res, next)=>{
        const data =req.body
        //console.log("middleware ", data)
        if(data.title.length<6||data.title.length>80){
            res.send({success:false,
                message:"Title must be between 6-50 symbols length"
            })
        }else {
            next()
        }
       
    },
    validatePost:(req,res, next)=>{
        const data=req.body
        //console.log("middleware ", data)
        if(data.text.length<10 || data.text.length>250){
            res.send({success:false,
                message:"The length of post text is less than 10 or more than 250 characters"
            })
        }else if(!data.photo.includes("http") && data.photo.length>0){
            res.send({success:false,
                message:"Picture link must include 'http'"
            })

        }else if(!data.youtubeUrl.includes("youtube") && data.youtubeUrl.length>0){
            res.send({success:false,
                message:"Youtube link link must include 'youtube'"
            })

        }else{
            next()
        }

    },


    // validatePosts:(req,res,next)=>{
    //     const data =req.body
    //     if(data.title.length<3||data.title.length>20){
    //         res.send({success:"false",
    //             message:"Title must be not shorter than 3 and not longer than 20 characters"
    //         })
    //     }else if(data.description.length<3||data.description.length>25){
    //         res.send({success:"false",
    //                 message:"Description must be not shorter than 3 and not longer than 25 characters"
    //             })
    //     }else if(!data.image.includes("http")){
    //         res.send({success:"false",
    //                 message:"Image address must include 'http'"
    //             })
    //     }else if(data.link.length===0){
    //         res.send({success:"false",
    //                 message:"Link can not be empty"
    //             })
    //     }else{
    //         next()   
    //     }

    // }

}