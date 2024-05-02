import mongoose, { Mongoose } from 'mongoose';

const connection: { isConnected?: number } = {};

async function dbConnect(): Promise<Mongoose | void> {
  try {
    if (connection.isConnected) {
      return;
    }

    const db = await mongoose.connect(process.env.MONGODB_URI!, {});

    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    // Handle the error appropriately
    // You might want to throw the error to let the calling function handle it
    throw error;
  }
}

export default dbConnect;
