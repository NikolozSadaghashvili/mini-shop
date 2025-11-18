import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect Mongoose Success:", connect.connection.name);
  } catch (error) {
    console.log("Connected faild Mongoose", error);
  }
};

export default connectMongoDB;
