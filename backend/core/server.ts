import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "../middlewares/error.middleware";
import productRoutes from "../routes/product.routes";
import categoryRoutes from "../routes/category.routes";
import movementRoutes from "../routes/movements.routes";
import authRoutes from "../routes/auth.routes";
import userRoutes from "../routes/user.routes";
import profileRoutes from "../routes/profile.routes";
import userDetailRoutes from "../routes/user-detail.routes";
import userCompanies from "../routes/company.routes";
dotenv.config();

export class Server {
  private app: Application;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.middlewares();
    this.routes();
  }

  middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }
  routes(): void {
    this.app.use("/api/auth", authRoutes);
    this.app.use("/api/products", productRoutes);
    this.app.use("/api/categories", categoryRoutes);
    this.app.use("/api/movements", movementRoutes);
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/profiles", profileRoutes);
    this.app.use("/api/user-details", userDetailRoutes);
    this.app.use("/api/companies", userCompanies);
    this.app.get("/api/health", (req, res) => {
      res.json({ status: "ok", timestamp: new Date() });
    });
    this.app.use(errorHandler);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log("Server is running on port " + this.port);
    });
  }
}
