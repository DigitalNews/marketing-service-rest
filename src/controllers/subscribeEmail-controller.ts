import { Request, Response } from "express";
import QueryModel from "@models/querys";

/**
 * @author DigitalNew
 * @version 1.0.0
 * @description controlador para especicar las peticiones de contactos.
 * @url /api/v1/contact
 */

export default class SubscribeEmail extends QueryModel {
  // public colection: string = "contact"
  constructor(public colection: string = "subscribes") {
    super(colection);
  }
  setSubscribeEmail = async (req: Request, res: Response) => {
    // console.log(req.body);
    const { email } = req.body;
    const response = await this.addData({ email });
    if (response) {
      return res.status(200).json(response);
    }
    return res.status(400).json({
      message:
        "opps, Ocurrio un error inesperado, por favor intentalo mas tarde.",
    });
  };
}
