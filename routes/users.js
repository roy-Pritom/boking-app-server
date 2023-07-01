import express from 'express';
import user from '../models/user.js';
const router=express.Router();

router.post('/',async(req,res)=>{
    const newUser=new user(req.body)
    try{
    const savedUser=await newUser.save();
    res.status(200).json(savedUser)
    }
    catch(err){
    res.status(500).json(err)


    }
})


router.put('/:id',async(req,res)=>{

    try{
        
    const updatedUser=await user.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
    res.status(200).json(updatedUser)
    }
    catch(err){
    res.status(500).json(err)


    }
})

router.get('/find/:email',async(req,res)=>{
    const email=req.params.email;

    try{
        const query={email:email}
  const User=await user.findOne(query);
  const result = { admin: User?.role === 'admin' }

    res.status(200).json(result)
    }
    catch(err){
    res.status(500).json(err)


    }
})
router.get('/',async(req,res)=>{
 

    try{
     
  const User=await user.find();

    res.status(200).json(User)
    }
    catch(err){
    res.status(500).json(err)


    }
})

router.delete('/:id',async(req,res)=>{

    try{
  await user.findByIdAndDelete(req.params.id);
    res.status(200).json('deleted')
    }
    catch(err){
    res.status(500).json(err)


    }
})

export default router;
