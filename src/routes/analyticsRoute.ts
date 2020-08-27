/** @format */
import express from "express";

// [*] controlador para resolver las consultas.
import analyticsController from "@controllers/analytics-controller";

/**
 * @author DigitalNew
 * @see https://digitalnew.solutions/
 * @see https://github.com/DigitalNews/
 * @version 1.0.0
 * @process 2
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
    // metodo get
    .get(path + "/analytics/users-by-country", this.analyticsController.getUserbyCountry)
    .get(path + "/analytics/top-browsers/:viewid", this.analyticsController.getTopBrowsers)
  }
}