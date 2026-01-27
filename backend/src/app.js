import express from "express";
import cors from "cors";
import songRoutes from "./routes/songRoutes.js";
import userRouter from "./routes/userRouter.js";
// import artistRoutes from "./routes/artistRoutes.js";
// import artistRoutes from "./routes/artistRoutes.js";
const app = express();

// Middleware
// app.use(cors(
//     {
//     origin: [
//       "http://localhost:5173",
//       "https://wavefy.vercel.app" // example prod URL
//     ],
//     credentials: true,
//   }
// ));



app.use(
  cors({
    origin: [
      "https://rohan-mac-wavefy.vercel.app",
      "http://localhost:5173"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());


app.use("/api/songs", songRoutes);
app.use("/api/users", userRouter);   // ✅ connect router
// app.use("/api/artists", artistRoutes); // ✅ connect artist routes
export default app;
