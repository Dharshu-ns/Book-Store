import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get('/',(request, response)=>{
console.log(request);
return response.status(234).send('Welcome to MERN Stack Tutorial');
})

//Save a new book
app.post('/books', async (request,response)=>{
try{
if(!request.body.title || !request.body.author ||!request.body.publishYear){
    return response.status(400).send({message: 'Send all required fields: title, author, publishedYear'})
}

const newBook={
    title: request.body.title,
    author: request.body.author,
    publishYear: request.body.publishYear
}
const book = await Book.create(newBook)
return response.status(201).send(book);
}catch(error){
    console.log(error);
    response.status(500).send({message: error.message});
}
});

// Get all books from the database
app.get('/allbooks', async(request,response)=>{
    try{
const books = await Book.find({});
response.status(201).send(books);
    }catch(error){
        console.log(error);
        response.status(500).send({message: error.message});
    }
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