import express from "express";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import colors from "colors";

dotenv.config();

const app = express();
app.use(express.json());
connectDB();

app.use("/api/users", userRoutes);
app.get("/", (req, res)=>{
    res.send('app is running on server')
})

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mod on port ${PORT}`.yellow.bold
  )
);
