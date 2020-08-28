/** @format */
import express from "express";

// [*] controlador para resolver las consultas.
import usersController from "@controllers/userController";

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
  public userController: usersController = new usersController();
  constructor(router: express.Application) {
    this.router = router;
  }
  /**
   * @function Endpoint
   * @param path endoinpoint base
   */
  public Endpoint(path: string): void {
    /**
     * @api {get} /api/v1/users Solicitar lista de usuarios
     * @apiName GetUserAll
     * @apiVersion 0.0.1
     * @apiGroup User
     * @apiSuccess {Boolean} status true.
     * @apiSuccess {Object} data users list.
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
    this.router.get(path + "/users", this.userController.getUserAll);
  }
}
