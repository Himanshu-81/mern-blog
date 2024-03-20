import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorHandler.middleware.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
    methods: "GET,PUT,POST,DELETE, PATCH",
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
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.use(notFound);
app.use(errorHandler);

export { app };
