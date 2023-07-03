import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import paymentsRoute from './routes/payments.js'
import usersRoute from './routes/users.js'
import citiesRoute from './routes/cities.js'
// const cors=require('cors')
const app = express()
const port = process.env.PORT || 3000;
dotenv.config()
import stripe from 'stripe'
 const t =stripe(process.env.PAYMENT_SECRET_KEY)

// middleware
app.use(cors())
app.use(express.json())
app.use('/api/auth',authRoute);
app.use('/api/hotels',hotelsRoute);
app.use('/api/rooms',roomsRoute);
app.use('/api/payments',paymentsRoute);
app.use('/api/users',usersRoute);
app.use('/api/cities',citiesRoute);


app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.post('/create-payment-intent',  async (req, res) => {
  const { price } = req.body;
  const amount = parseInt(price * 100)
  const paymentIntent = await t.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ['card']
  })

  res.send({
      clientSecret: paymentIntent.client_secret
  })
})

// c0tzIjm1MKiIm8Qd
// booking-app-user
const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('connected to mongodb');
      } catch (error) {
      throw error;
      }
}


// mongoose.connection.on('disconnected')



app.get('/', (req, res) => {
  res.send('booking app running')
})

app.listen(port, () => {
    connect();
  console.log(`Example app listening on port ${port}`)
})