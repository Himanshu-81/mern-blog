import express from "express";
import cors from "cors";
import testRoutes from "./routes/test.routes.js";

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

app.use("/api/test", testRoutes);

export { app };
