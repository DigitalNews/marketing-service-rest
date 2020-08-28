/** @format */
import express from "express";
import analyticsController from "@controllers/analytics-controller";

/**
 * @author DigitalNew
 * @see https://digitalnew.solutions/
 * @see https://github.com/DigitalNews/
 * @version 1.0.0
 */
export default class UserRouter {
  public router: express.Application;
  //[*] intanciasmos un nuevo objeto del controlador analytics
  public analyticsController: analyticsController = new analyticsController();
  constructor(router: express.Application) {
    this.router = router;
  }
  /**
   * @function Endpoint
   * @param path endoinpoint base
   */
  public Endpoint(path: string): void {
    this.router

      /**
       * @api {get} /api/v1/analytics/users-by-country Solicitar usuarios por paises
       * @apiVersion 0.0.1
       * @apiName GetUserByCountry
       * @apiGroup Analytics
       * @apiParam { string } viewid Identificación unica del proyecto a analizar de Google Analytics
       * @apiSuccess {Boolean} status true.
       * @apiSuccess {Object} data top User by country list.
       * @apiSuccess {String} message Mensaje de respuesta exitosa.
       * @apiError ViewIDNotFound   El <code>viewid</code> de google analytics no es valido.
       * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error.
       * @apiSuccessExample {json} Succes-Example
       * HTTP/1.1 200 OK
       * {
       *    status: true,
       *    data: [{}],
       *    message: "La solicitud se resolvio con exito"
       * }
       */
      .get(
        path + "/analytics/users-by-country",
        this.analyticsController.getUserbyCountry
      )

      /**
       * @api {get} /api/v1/analytics/top-browsers/:viewid Solicitar tops navegadores
       * @apiName GetTopBrowser
       * @apiVersion 0.0.1
       * @apiGroup Analytics
       * @apiParam { string } viewid Identificación unica del proyecto a analizar de Google Analytics
       * @apiSuccess {Boolean} status true.
       * @apiSuccess {Object} data top Browser list.
       * @apiSuccess {String} message Mensaje de respuesta exitosa.
       * @apiError ViewIDNotFound   El <code>viewid</code> de google analytics no es valido.
       * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error.
       * @apiSuccessExample {json} Succes-Example
       * HTTP/1.1 200 OK
       * {
       *    status: true,
       *    data: [{}],
       *    message: "La solicitud se resolvio con exito"
       * }
       */
      .get(
        path + "/analytics/top-browsers/:viewid",
        this.analyticsController.getTopBrowsers
      );
  }
}
