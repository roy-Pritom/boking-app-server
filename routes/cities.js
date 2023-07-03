import express from 'express';

import city from '../models/city.js';
const router=express.Router();

// post
router.post('/',async(req,res)=>{
    const newCity=new city(req.body)
    try{
    const savedCity=await newCity.save();
    res.status(200).json(savedCity)
    }
    catch(err){
    res.status(500).json(err)


    }
})

router.get('/',async(req,res)=>{

        try{
      const allCity=await city.find()
        res.status(200).json(allCity)
        }
        catch(err){
        res.status(500).json(err)
    
    
        }
    })

export default router;