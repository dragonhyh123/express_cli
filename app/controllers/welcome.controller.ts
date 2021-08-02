// Import only what we need from express
import { Router, Request, Response } from 'express';

// Assign router to the express.Router() instance
const router: Router = Router();

const userModel = require('../models/user');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/todolist', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

router.post('/login', async(req:Request,res:Response)=>{
    try{
        const data = await userModel.findOne({userName:req.body.userName});
        if(data){
            if(data.password!==req.body.password){
                res.status(200).json({status:'error',message:'wrong password'});
            }else{
                res.status(200).json({status:'success'});
            }
        }else{
            res.status(200).json({status:'error',message:'No such user'});
        }
    }catch(err){
        res.status(500).json({message:err.message});
    }
})

router.post('/register',async(req:Request,res:Response)=>{
    const data = {userName:req.body.userName,password:req.body.password};
    let user = new userModel(data);

    try{
        await user.save();
        res.status(200).json({status:'success'});
    }catch(err){
        res.status(500).json({status:'error',message:err.message});
    }
})

// Export the express.Router() instance to be used by server.ts
export const WelcomeController: Router = router;