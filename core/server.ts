import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler } from "../middlewares/error.middleware";
import productRoutes from "../routes/product.routes";

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
    this.app.use(errorHandler);
  }

  routes(): void {
    this.app.use("/api/products", productRoutes);
    // this.app.use('/api/categories', IMPORTAR RUTAS DE CATEGORIAS COMO MODULO);
    // this.app.use('/api/movements', IMPORTAR RUTAS DE MOVIMIENTOS COMO MODULO);
    this.app.get("/api/health", (req, res) => {
      res.json({ status: "ok", timestamp: new Date() });
    });
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log("Server is running on port " + this.port);
    });
  }
}
