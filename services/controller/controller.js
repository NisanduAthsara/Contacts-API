const model = require('../model/model')
const {verficationData} = require('../../utilities/funcs')

exports.addContact = async(req,res)=>{
    if(req.body){
        const {name,mobile} = req.body

        const userCount = await model.findOne({mobile:mobile,isDeleted:false})
        if(userCount){
            return res.json({
                success:false,
                message:"User already added...!"
            })
        }else{
            verficationData(mobile,name)
                .then(()=>{
                    const newContactObj = new model({
                        name,
                        mobile
                    })
        
                    newContactObj.save(newContactObj)
                        .then((newContact)=>{
                            if(newContact){
                                return res.json({
                                    success:true,
                                    message:"User successfully added...!"
                                })
                            }
                        })
                        .catch((err)=>{
                            res.send({
                                success: false,
                                message: err,
                            });
                        })
                })
                .catch((err)=>{
                    res.send({
                        success: false,
                        message: err,
                    });
                })
        }
    }else{
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }
}

exports.getAllContact = async (req,res)=>{
    const users = await model.find({isDeleted:false})

    if(users){
        return res.json({
            success:true,
            users
        })
    }else{
        return res.json({
            success:false,
            message:"No Users Available..."
        })
    }
}

exports.getSpecificContact = async(req,res)=>{
    const id = req.params.id
    if(id){
        const contact = await model.findOne({_id:id,isDeleted:false})
        if(contact){
            return res.json({
                success:true,
                contact
            })
        }else{
            return res.json({
                success:false,
                message:"No Users Available..."
            })
        }
    }else{
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }
}

exports.updateContact = async (req,res)=>{
    const id = req.params.id
    const {name,mobile} = req.body
    if(id){
        try{
            const isVerified = await verficationData(mobile,name)
            if(isVerified){
                const newObj = {
                    name,
                    mobile,
                    isDeleted:false
                }
                const newContact = await model.findByIdAndUpdate(id,newObj,{useFindAndModify:false})
                if(newContact){
                    const updatedContact = await model.findById(id)
                    return res.json({
                        success:true,
                        contact:updatedContact
                    })
                }else{
                    return res.json({
                        success:false,
                        message:"Unable to add new contact..!"
                    })
                }
            }
        }catch(err){
            if(err.code === 11000){
                return res.json({
                    success:false,
                    message:'Mobile Number already in use...!'
                })
            }
            return res.json({
                success:false,
                message:err.message
            })
        }
    }else{
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }
}

exports.deleteContact = async(req,res)=>{
    const id = req.params.id
    if(id){
        const user = await model.findById(id)
        if(!user){
            return res.json({
                success:false,
                message:"Invalid ID...!"
            })
        }
        user.isDeleted = true
        const deletedContact = await model.findByIdAndUpdate(id,user,{useFindAndModify:false})
        if(!deletedContact){
            return res.json({
                success:false,
                message:"Something went wrong...!"
            })
        }
        const newDelUser = await model.findById(id)
        if(!newDelUser){
            return res.json({
                success:false,
                message:"Something went wrong...!"
            })
        }

        return res.json({
            success:true,
            user:newDelUser
        })
    }else{
        return res.json({
            success:false,
            message:"Something went wrong...!"
        })
    }
}