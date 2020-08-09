import { Request, Response } from "express";
import QueryModel from "@models/querys";

/**
 * @author DigitalNew
 * @version 1.0.0
 * @description controlador para especicar las peticiones de contactos.
 * @url /api/v1/contact
 */

export default class Contact extends QueryModel {
  // public colection: string = "contact"
  constructor(public colection: string = "contact") {
    super(colection);
  }
  setContact = async (req: Request, res: Response) => {
    // console.log(req.body);
    const { name, message, email } = req.body;
    const response = await this.addData({ name, message, email });
    if (response) {
      return res.status(200).json(response);
    }
    return res.status(400).json({
      message:
        "opps, Ocurrio un error inesperado, por favor intentalo mas tarde.",
    });
  };
}
