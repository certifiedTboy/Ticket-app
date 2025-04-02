import mongoose from "mongoose";
import { app } from "./app";

const startServer = async () => {
<<<<<<< HEAD
  console.log("starting up auth service...");
  console.log("env variables");
=======
>>>>>>> 4dbf9c8fd27f8d6018e7042ba550ffe73101289a
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongo db");
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

startServer();
