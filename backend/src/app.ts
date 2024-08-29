import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import PrismaService from "./services/prisma.service";
import userRoutes from "./routes/user.route";
import errorHandler from "./middlewares/errorHandler";

dotenv.config();

const app = express();

const allowedOrigins = ["http://localhost:3000"];
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};
app.use(cors(options));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

const PORT = process.env.PORT || 3500;

const prismaService = PrismaService.getInstance();
prismaService
  .connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.log(`An error occured while connecting database: ${error}`);
  });

app.use("/users", userRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
