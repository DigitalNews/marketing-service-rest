import { Request, Response } from "express";
import QueryModel from "@models/querys";
import has from "@util/hasKeys";

/**
 * @author DigitalNew
 * @version 1.0.0
 * @description controlador para especicar las peticiones de contactos.
 * @url /api/v1/contact
 */

export default class Contact extends QueryModel {
  constructor(public colection: string = "contact") {
    super(colection);
  }

  /**
   * @function setContact
   * @param req
   * @param res
   * @description esta función guarda todos los
   * contacto de los posibles clientes.
   */
  setContact = async (req: Request, res: Response) => {
    // console.log(req.body);
    const { name, message, email } = req.body;
    const response = await this.addData({ name, message, email }, true);
    if (response) {
      return res.status(200).json(response);
    }
    return res.status(500).json(this.captureError.response500());
  };

  /**
   * @function getContacts
   * @param _req
   * @param res
   * @description retonar todoso los contactos de la base de datos
   */
  getContacts = async (_req: Request, res: Response) => {
    const response = await this.getDatas();
    if (response) return res.status(200).json(response);
    return res.status(500).json(this.captureError.response500());
  };

  /**
   * @function deletedContac
   * @param req 
   * @param res 
   * @description esta funcion nos permite eleminar contacto de la base de datos
   */

  deletedContac = async (req: Request, res: Response) => {
    // verificamos si el uid existe en el request
    if (!has.getHaskey(req.body, "uid"))
      return res.status(400).json({
        status: false,
        message: "El uid es necesario para esta accion",
      });

    // capturamos el iud
    const { uid } = req.body;
    const response = await this.deletedData(uid);
    if (response) return res.status(200).json(response);
    return res.status(500).json(this.captureError.response500());
  };

}
