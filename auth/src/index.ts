import express from "express";
import morgan from "morgan";
import router from "./routes/authRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/auth", router);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("server running in port 3000!!!");
});
