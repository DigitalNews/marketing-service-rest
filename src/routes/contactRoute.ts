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
    // metodo post
    .post(path + "/contact", this.userController.setContact)
    // metodo get
    .get(path + "/contact", this.userController.getContacts)
    // metodo deleted
    .delete(path + "/contact/:uid", this.userController.deletedContac)
  }
}
