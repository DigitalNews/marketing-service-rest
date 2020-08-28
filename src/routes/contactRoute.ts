/** @format */
import express from "express";

// [*] controlador para resolver las consultas.
import contactController from "@controllers/contact-controller";

/**
 * @author DigitalNew
 * @see https://digitalnew.solutions/
 * @see https://github.com/DigitalNews/
 * @version 1.0.0
 * @process 2
 */
export default class UserRouter {
  public router: express.Application;
  //[*] intanciasmos un nuevo objeto del controlador user
  public userController: contactController = new contactController();
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
       * @api {post} /api/v1/contact Agregar lista de clientes contacto.
       * @apiName SetClientContact
       * @apiVersion 0.0.1
       * @apiGroup User
       * @apiParam {String} name Client name contact
       * @apiParam {String} message Client message contact
       * @apiParam {String}  email Client email contact
       * @apiSuccess {Boolean} status true.
       * @apiSuccess {String} message Mensaje de respuesta exitosa.
       * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error.
       * @apiSuccessExample {json} Succes-Example
       * HTTP/1.1 200 OK
       * {
       *    status: true,
       *    message: "La solicitud se resolvio con exito"
       * }
       */
      .post(path + "/contact", this.userController.setContact)
      /**
       * @api {get} /api/v1/contact Solicitar lista de Clientes.
       * @apiName GetClientContact
       * @apiVersion 0.0.1
       * @apiGroup User
       * @apiSuccess {Boolean} status true
       * @apiSuccess {Object} data client contacts list.
       * @apiSuccess {String} message Mensaje de respuesta exitosa.
       * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error.
       * @apiSuccessExample {json} Succes-Example
       * HTTP/1.1 200 OK
       * {
       *    status: true,
       *    data: [{}]
       *    message: "La solicitud se resolvio con exito"
       * }
       */
      .get(path + "/contact", this.userController.getContacts)
      /**
       * @api {delete} /api/v1/contact/:uid Solicitar Eliminar un cliente.
       * @apiName DeleteClientContact
       * @apiVersion 0.0.1
       * @apiGroup User
       * @apiParam {String} uid cliente uid
       * @apiSuccess {Boolean} status true
       * @apiSuccess {String} message Mensaje de respuesta exitosa.
       * @apiError UserNotFound  The <code>uid</code> of the Client Contact was not found.
       * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error.
       * @apiSuccessExample {json} Succes-Example
       * HTTP/1.1 200 OK
       * {
       *    status: true,
       *    message: "La solicitud se resolvio con exito"
       * }
       */
      .delete(path + "/contact/:uid", this.userController.deletedContac);
  }
}
