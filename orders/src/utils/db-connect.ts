import mongoose from "mongoose";

const connectDb = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongo db");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export { connectDb };
