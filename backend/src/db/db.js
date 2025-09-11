import mongoose from 'mongoose';

function connectToDatabase() {
  mongoose.connect(process.env.MONGO_URL)
    .then(() => {
      console.log("✅ Connected to MongoDB Atlas successfully");
    })
    .catch((error) => {
      console.error("❌ Error connecting to MongoDB Atlas:", error);
    });
}

export default connectToDatabase;
