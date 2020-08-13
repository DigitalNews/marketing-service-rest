/** @format */

import {
  DocumentSnapshot,
  QuerySnapshot,
  DocumentData,
} from "@google-cloud/firestore";

/**
 * capture estatus para las consultas
 */
export type StatusConsult = {
  status: boolean;
  data?: any;
  message: string;
};

/**
 * @author Rony cb
 * @version 1.0.1
 * @description clases para capturar errors en firebase.
 */
export default class CaptureError {
  constructor() {}

  /**
   * @description funcion para capturar el error cuando se consulta un Document de firestore
   * @param query Promise<DocumentSnapshot<DocumentData>
   */
  public captureErrorDocument = async (
    query: Promise<DocumentSnapshot<DocumentData>>
    // getDocument: Promise<D>
  ) => {
    try {
      return await query;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /**
   * @description funcion para capturar el error  cuando se consulta una Coleccion de firestore
   * @param query Promise<QuerySnapshot<DocumentData>>
   */
  public captureErrorCollention = async (
    query: Promise<QuerySnapshot<DocumentData>>
    // getDocument: Promise<D>
  ) => {
    try {
      return await query;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /**
   * @description funcion para capturar el error Cuando se ingresa un nuevo item
   * @param query Promise<FirebaseFirestore.DocumentReference<DocumentData>>
   */
  public captureErrorAdditem = async (
    query: Promise<FirebaseFirestore.DocumentReference<DocumentData>>
  ) => {
    try {
      return await query;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /**
   * @description funtion para capturar el error cuando 7se ingresa un items en firestore
   * @param query Promise<FirebaseFirestore.WriteResult>
   */
  public catureErrorsetItem = async (
    query: Promise<FirebaseFirestore.WriteResult>
  ) => {
    try {
      await query;
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  /**
   * @description funtion para capturar el error cuando se actualiza un item en firestore
   * @param query Promise<FirebaseFirestore.WriteResult>
   */
  public catureErrorupdateItem = async (
    query: Promise<FirebaseFirestore.WriteResult>
  ) => {
    try {
      await query;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /**
   * @description function para capturar el error cuando de elimina un item
   * @param query Promise<FirebaseFirestore.WriteResult>
   */
  public catureErrordeletedItem = async (
    query: Promise<FirebaseFirestore.WriteResult>
  ) => {
    try {
      await query;
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  /**
   * @param status true
   * @param data any
   * @param message "Se realizo con exito esta consulta"
   */

  public response200 = (data: any, message?: string) => ({
    status: true,
    message: message || "Se realizo con exito esta consulta",
    data: data,
  });

  /**
   * @param status false
   * @param  message "opps, Ocurrio un error inesperado, por favor intentalo mas tarde.",
   */

  public response500 = () => ({
    status: false,
    message:
      "opps, Ocurrio un error inesperado, por favor intentalo mas tarde.",
  });

  /**
   * @param status false
   *  @param message "No se encontro ningún resultado para esta consulta."
   */

  public response404 = () => ({
    status: false,
    message: "No se encontro ningún resultado para esta consulta.",
  });
}
