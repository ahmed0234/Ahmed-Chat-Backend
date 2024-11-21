import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected Successfully");
  } catch (error) {
    console.log(`Mongodb Error Connect ${error.message}`);
  }
};
