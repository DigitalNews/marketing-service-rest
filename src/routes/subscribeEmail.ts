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
    this.router.post(
      path + "/subscribe-email",
      this.subscribeEMail.setSubscribeEmail
    );
  }
}
