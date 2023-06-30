import express from 'express';
import payment from '../models/payment.js';
const router=express.Router();

router.post('/',async(req,res)=>{
    const newHotel=new payment(req.body)
    try{
    const savedHotel=await newHotel.save();
    res.status(200).json(savedHotel)
    }
    catch(err){
    res.status(500).json(err)


    }
})


export default router;
