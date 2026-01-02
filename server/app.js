import express from "express";
import cors from "cors";
import contactsRouter from "./routes/contact.routes.js";

const app = express()

// cors configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.options("*", cors());

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome to the contact management application!");
});

app.use("/api",contactsRouter);

export default app;