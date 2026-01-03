import express from "express";
import cors from "cors";
// import {router} from "./routers/userRouter";
import songRoutes from "./routes/songRoutes.js";
import userRouter from "./routes/userRouter.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


app.use("/api/songs", songRoutes);
app.use("/api/users", userRouter);   // ✅ connect router

export default app;
