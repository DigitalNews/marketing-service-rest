/** @format */
import express from "express";

// [*] controlador para resolver las consultas.
import subscribeEMailController from "@controllers/subscribeEmail-controller";

/**
 * @author DigitalNew
 * @see https://digitalnew.solutions/
 * @see https://github.com/DigitalNews/
 * @version 1.0.0
 * @process 2
 */
export default class SubscribeEMail {
  public router: express.Application;
  //[*] intanciasmos un nuevo objeto del controlador user
  public subscribeEMail: subscribeEMailController = new subscribeEMailController();
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
       * @api {post} /api/v1/subscribe-email Agregar lista de subscriptores.
       * @apiName SetSubscribeAll
       * @apiVersion 0.0.1
       * @apiGroup Email
       * @apiParam { string } email Email a agregar del cliente
       * @apiSuccess {Boolean} status true
       * @apiSuccess {String} message Mensaje de respuesta exitosa.
       * @apiError EmailNotFOund   El <code>email</code> es necesario para esta consulta.
       * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error.
       * @apiSuccessExample {json} Succes-Example
       * HTTP/1.1 200 OK
       * {
       *    status: true,
       *    message: "La solicitud se resolvio con exito"
       * }
       */
      .post(path + "/subscribe-email", this.subscribeEMail.setSubscribeEmail)
      /**
       * @api {get} /api/v1/subscribe-email Solicitar lista de subscriptores.
       * @apiName GetSubscribeAll
       * @apiVersion 0.0.1
       * @apiGroup Email
       * @apiSuccess {Boolean} status true
       * @apiSuccess {Object} data Subcribe Email list.
       * @apiSuccess {String} message Mensaje de respuesta exitosa.
       * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error.
       * @apiSuccessExample {json} Succes-Example
       * HTTP/1.1 200 OK
       * {
       *    status: true,
       *    data: [{}],
       *    message: "La solicitud se resolvio con exito"
       * }
       */
      .get(path + "/subscribe-email", this.subscribeEMail.getSubscribeEmails);
  }
}
