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
    origin: "https://mern-blog-frontend-vert-three.vercel.app",
<<<<<<< HEAD
    methods: "GET,PUT,POST,DELETE, PATCH",
=======
>>>>>>> 1927e6eecb66049522ab0dd33966e48ac750a069
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
