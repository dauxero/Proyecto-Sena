import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost/inventory_app"
    );
  } catch (error) {
    console.error("MongoDB connection error", error);
    process.exit();
  }
};

export default connectDB;
