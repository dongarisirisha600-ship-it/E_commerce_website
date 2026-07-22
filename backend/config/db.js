import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI && !process.env.MONGO_URI.includes('<')
      ? process.env.MONGO_URI
      : undefined;

    if (!mongoUri) {
      console.warn('No MongoDB URI provided. Using the local fallback data store for development.');
      return;
    }

    const conn = await mongoose.connect(mongoUri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn('MongoDB connection failed, using local fallback data store for development.');
    console.warn(error.message);
  }
};

export default connectDB;
