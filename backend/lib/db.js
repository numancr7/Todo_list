import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const mongourl = process.env.MONGODB_URL;



mongoose.connect(mongourl, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
  }).then(() => {
    console.log("Connected to MongoDB successfully");
  }).catch(err => {
    console.error("Failetd to connect to MongoDB", err);  // Clearer error message
  });
  const db = mongoose.connection;


  db.on('error', (err) => {
    console.error("MongoDB error:", err);  // Improve the error message
  });
  
  db.on('disconnected', () => {
    console.log("MongoDB disconnected");
  });
  
export default db;  