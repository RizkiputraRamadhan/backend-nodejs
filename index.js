import express from "express";
import cors from "cors";
import FileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import UserRoute from "./routes/UserRoute.js";
import AnimalRoute from "./routes/AnimalRoute.js";
import AdminRoute from "./routes/AdminRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(FileUpload());
app.use(express.static("public"));

app.use(UserRoute);
app.use(AnimalRoute);
app.use(AdminRoute);
app.use(AuthRoute);

app.listen(PORT, () => console.log("Server up and running..."));
