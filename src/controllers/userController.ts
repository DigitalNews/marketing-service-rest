/** @format */

import status from "http-status";
import usersModel from "@models/users";
import { Request, Response } from "express";
import has from "@util/hasKeys";

/**
 * @author DigitalNew
 * @see https://digitalnew.solutions/
 * @version 1.0.0
 * @template UserControllers
 */

export default class UserControllers {
  async getUserAll(_req: Request, res: Response) {
    let prueba = usersModel.getCalzado();
    try {
      const resposne = await prueba.doc("example").get();
      if (resposne.exists) res.json(resposne.data());
      res.json({ status: false, message: "not found user" });
    } catch (error) {
      console.log(error);
      res.status(500).json("opps. Ocurrio un error inesperado");
    }
  }
  async getUserById(req: Request, res: Response) {
    if (!has.getHaskey(req.params, "id"))
      throw { code: status.BAD_REQUEST, message: "You must specify the id" };
    let { id } = req.params;
    let data = null;
    if (!data) throw { code: status.BAD_REQUEST, message: "User not found" };
    res.json({ status: true, message: "Returning user", data });
  }
}
