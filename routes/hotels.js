import express from 'express';
import hotel from '../models/hotel.js';
import room from '../models/room.js';
const router=express.Router();

// post
router.post('/',async(req,res)=>{
    const newHotel=new hotel(req.body)
    try{
    const savedHotel=await newHotel.save();
    res.status(200).json(savedHotel)
    }
    catch(err){
    res.status(500).json(err)


    }
})

// put
router.put('/:id',async(req,res)=>{

    try{
    const updatedHotel=await hotel.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
    res.status(200).json(updatedHotel)
    }
    catch(err){
    res.status(500).json(err)


    }
})

// delete
router.delete('/:id',async(req,res)=>{

    try{
  await hotel.findByIdAndDelete(req.params.id);
    res.status(200).json('deleted')
    }
    catch(err){
    res.status(500).json(err)


    }
})
// get by id
router.get('/find/:id',async(req,res)=>{

    try{
  const Hotel=await hotel.findById(req.params.id);
    res.status(200).json(Hotel)
    }
    catch(err){
    res.status(500).json(err)


    }
})
// get all
router.get('/',async(req,res)=>{
const {min,max,...others}=req.query;
    try{
  const Hotels=await hotel.find({...others,cheapestPrice:{$gt: min || 1,$lt: max || 1000}})
    res.status(200).json(Hotels)
    }
    catch(err){
    res.status(500).json(err)


    }
})




router.get("/countByCity",async(req,res,next)=>{
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
});

router.get("/byCity",async(req,res,next)=>{
  const city = req.query.city;
  const filter={type:city}
  try{
    const Hotels=await hotel.find(filter)
      res.status(200).json(Hotels)
      }
  catch (err) {
    next(err);
  }
});


router.get("/countByType", async(req,res,next)=>{
  try {
    const hotelCount = await hotel.countDocuments({ type: "Hotel" });
    const apartmentCount = await hotel.countDocuments({ type: "Apartment" });
    const resortCount = await hotel.countDocuments({ type: "Resort" });
    const villaCount = await hotel.countDocuments({ type: "Villa" });
    const cabinCount = await hotel.countDocuments({ type: "Cabin" });

    res.status(200).json([
      { type: "Hotel", count: hotelCount },
      { type: "Apartment", count: apartmentCount },
      { type: "Resort", count: resortCount },
      { type: "Villa", count: villaCount },
      { type: "Cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
});
router.get("/room/:id", async(req,res,next)=>{
  try {
    const Hotel = await hotel.findById(req.params.id);
    // console.log(Hotel);
    const list = await Promise.all(
      Hotel?.rooms.map((r) => {
        return room.findById(r);
      })
    );
    res.status(200).json(list)
  } catch (err) {
    next(err);
  }
});

export default router;