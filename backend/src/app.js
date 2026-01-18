// import express from "express";
// import cors from "cors";
// // import {router} from "./routers/userRouter";
// import songRoutes from "./routes/songRoutes.js";
// import userRouter from "./routes/userRouter.js";

// const app = express();

// // Middleware
// app.use(cors(
//     {
//     origin: [
//       "http://localhost:5173",
//       "https://wavefy.vercel.app" // example prod URL
//     ],
//     credentials: true,
//   }
// ));
// app.use(express.json());


// app.use("/api/songs", songRoutes);
// app.use("/api/users", userRouter);   // ✅ connect router

// export default app;



import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import songRoutes from "./routes/songRoutes.js";
import userRouter from "./routes/userRouter.js";

const app = express();

/* ✅ CORS MUST COME FIRST */
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://wavefy.vercel.app",
  ],
  credentials: true,
}));

/* ✅ THEN cookie parser */
app.use(cookieParser());

/* ✅ THEN body parser */
app.use(express.json());

app.use("/api/songs", songRoutes);
app.use("/api/users", userRouter);

export default app;
