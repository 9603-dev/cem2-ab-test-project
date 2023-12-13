import mongoose, { ConnectOptions } from 'mongoose';

const connectDB = async () => {
  console.log('Connecting to MongoDB...');

  if (mongoose.connections[0].readyState) {
    console.log('MongoDB is already connected');
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local or .env.production.');
  }

  // Use new db connection
  await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then((res) => {
      console.log('Connected to PetFundDB');
    })
    .catch((err) => {
      console.log(`Failed to connect to PetFundDB -`, err);
    });

  return;
};

export default connectDB;
