import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack Tutorial");
});

//Save a new book
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response
        .status(400)
        .send({
          message: "Send all required fields: title, author, publishedYear",
        });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
    return response.status(200).send(book);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Get all books from the database
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find({});
    response.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

// Get a book from the database
app.get("/books/:id", async (request, response) => {
  try {
    const {id} = request.params;
    const book = await Book.findById(id);
    response.status(200).json(book);
  } catch (error) {
    console.log(error);
    response.status(500).send({ message: error.message });
  }
});

//Route for Update an Book
app.put('/books/:id', async(request, response)=>{
    try{
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
          ) {
            return response
              .status(400)
              .send({
                message: "Send all required fields: title, author, publishedYear",
              });
          }
          const { id } = request.params; // Fix destructuring of id
          const result = await Book.findByIdAndUpdate(id, request.body);
          if(!result){
            return response.status(404).json({message:'Book not found'})
          }
          return response.status(200).send({message:'Book updated successfully'})
    }catch(error){
        console.log(error);
        response.status(500).send({message: error.message});
    }
})

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected to the database");

    app.listen(PORT, () => {
      console.log(`App is running in the port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
