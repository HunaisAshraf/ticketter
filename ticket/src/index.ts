import express from "express";
import morgan from "morgan";
import cookieSession from "cookie-session";

// import { dbConnect } from "./config/dbConfig";

const app = express();
app.set("trust proxy", true);

// dbConnect();

app.use(express.json());

app.use(
  cookieSession({
    signed: false,
  })
);
app.use(morgan("dev"));



app.listen(3000, () => {
  console.log("ticket server running in port 3000!!!");
});
