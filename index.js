import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get('/',(request, response)=>{
console.log(request);
return response.status(234).send('Welcome to MERN Stack Tutorial');
})

mongoose
  .connect(mongoDBURL)
  .then(()=>{
console.log('App is connected to the database');

app.listen(PORT, ()=>{
    console.log(`App is running in the port ${PORT}`)
})

  })
  .catch((error)=>{
    console.log(error)
  })