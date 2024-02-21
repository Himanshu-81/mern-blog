import express from "express";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/user.routes.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.use(
  express.json({
    limit: "16kb",
    extended: true,
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use(express.static("public"));
// app.use(cookieParser());
app.use(notFound);
app.use(errorHandler);

app.use("/api/test", userRoutes);

export { app };
