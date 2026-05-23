import mongoose from "mongoose";

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  if (!MONGO_URI) {
    throw new Error("Something went wrong with .env");
  }
  try {
    await mongoose.connect(MONGO_URI).then(() => {
      console.log("Whoohoo! You're connected to WORLD WIDE WEB! :D");
    });
  } catch (error) {
    console.error("Oopsy! Something went wrong..", error);
  }
};

export default connectDB;
