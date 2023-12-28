import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from './routes/user.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CONNECTION_URL = process.env.MONGODB_URI || "mongodb://localhost/test";

app.use(express.json());

app.use('/api/user', userRoutes);

app.get('/',(req,res)=>{
    res.send('App is working...')
})

mongoose
  .connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log("Listening on port ", PORT)))
  .catch((error) => console.log("Error in connection with db"));
