import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/booksroutes.js";
import cors from "cors";

const app = express();
// Enable CORS for all origins
app.use(cors());

app.use(express.json());
app.use('/books', bookRoute )



app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack Tutorial");
});

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
