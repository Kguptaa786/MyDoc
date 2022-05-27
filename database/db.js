import mongoose from "mongoose";

const Connection = async (DB_URL) => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting to db", error);
  }
};

export default Connection;
