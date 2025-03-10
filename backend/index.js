import express from 'express';
import db from "./lib/db.js"
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import todoroutes from './route/todo.route.js';
import userroutes from "./route/auth.route.js";        

dotenv.config();
const app = express()
app.use(express.json())
const PORT = process.env.PORT || 4001

app.use(cookieParser());

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.FRONTEND_URL_PRODUCTION
].filter(Boolean);

app.use(
  cors({
    origin: function(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use('/todo', todoroutes); 
app.use('/user', userroutes); 

app.get('/', (req, res) => {
  res.send('Todo API is running!')
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})