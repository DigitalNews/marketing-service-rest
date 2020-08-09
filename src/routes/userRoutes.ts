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
    this.router.get(path + "/users", this.userController.getCalzadosAll);
  }
}
