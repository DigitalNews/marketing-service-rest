import express from "express";

//[*] import routes
import userRouter from "./userRoutes";
import contactRouter from "./contactRoute";
import subscribeRoute from "./subscribeEmail";

/**
 * @author DigitalNew
 * @see https://digitalnew.solutions/
 * @process 1
 * @version 1.0
 */

export default class Routes {
  public pathname: string = "/api/v1";
  /**
   * @function routes
   * @generator router for this proyect api rest
   * @param app aplication use for express route
   * @description continene todas las rutas establecidas para el proyecto
   */
  public routes(app: express.Application): void {
    // [*] lista de rutas del proyecto
    new userRouter(app).Endpoint(this.pathname);
    new contactRouter(app).Endpoint(this.pathname);
    new subscribeRoute(app).Endpoint(this.pathname);
    // [+] instanciar las rutas necesarias para el proyecto
  }
}
