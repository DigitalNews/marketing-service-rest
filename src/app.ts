import express from "express";
import logger from "@util/logger";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import Routes from "./routes/router";

interface IApp {
  app: express.Application;
}

class App implements IApp {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  //   public router: void;
  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    // use cors
    this.app.use(cors());
    // Configure Express App Instance
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ extended: true, limit: "10mb" }));
    // Configure custom logger middleware
    this.app.use(logger.dev, logger.combined);
    // Configure options dev
    this.app.use(morgan("dev"));
    this.app.use(cookieParser());
    this.app.use(helmet());
    // This middleware adds the json header to every response
    this.app.use("*", (_req, res, next) => {
      res.setHeader("Content-Type", "application/json");
      next();
    });

    // change router
    this.routePrv.routes(this.app);

    // Handle not valid route
    this.app.use("*", (_req, res) => {
      res.status(404).json({ status: false, message: "Endpoint Not Found" });
    });
  }
}

export default new App().app;
