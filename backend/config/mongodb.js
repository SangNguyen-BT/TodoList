import mongoose from "mongoose";

async function connectDB() {
  mongoose.connection.on("connected", () => {
    console.log("DB connected");
  });

  await mongoose.connect(`${process.env.MONGODB_URI}/TODO_LIST`);
}

export default connectDB;
