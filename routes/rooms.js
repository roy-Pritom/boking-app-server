import express from 'express';
import hotel from '../models/hotel.js';
import room from '../models/room.js';
const router=express.Router();

router.post('/:hotelid',async(req,res,next)=>{
    const hotelId = req.params.hotelid;
  const newRoom = new room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
})


router.put("/availability/:id",async(req,res,next)=>{
    try {
        await room.updateOne(
          { "roomNumbers._id": req.params.id },
          {
            $push: {
              "roomNumbers.$.unavailableDates": req.body.dates
            },
          }
        );
        res.status(200).json("Room status has been updated.");
      } catch (err) {
        next(err);
      }
} );
router.put("/:id",async(req,res,next)=>{
    try {
        const updatedRoom = await room.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedRoom);
      } catch (err) {
        next(err);
      }
});
//DELETE
router.delete("/:id/:hotelid",async(req,res,next)=>{
    const hotelId = req.params.hotelid;
  try {
    await room.findByIdAndDelete(req.params.id);
    try {
      await hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json("Room has been deleted.");
  } catch (err) {
    next(err);
  }
});
//GET

router.get("/:id",async(req,res,next)=>{
    try {
        const Room = await room.findById(req.params.id);
        res.status(200).json(Room);
      } catch (err) {
        next(err);
      }
});
//GET ALL

router.get("/",async(req,res,next)=>{
    try {
        const Rooms = await room.find();
        res.status(200).json(Rooms);
      } catch (err) {
        next(err);
      }
});


export default router;