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
  data: any;
  message: string;
};

/**
 * capture status para las mutaciones
 */
export type statusMutation = {
  status: boolean;
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
   * esta funcion retorna un objeto con un status 401, donde
   * especifica que ocurrio un error inesperado en la consulta.
   * @message `Ocurrio un error inesperado en la consulta, por favor puede intentarlo mas tarde.`
   */
  public status401 = (message?: string): StatusConsult => ({
    status: false,
    data: [],
    message:
      message ||
      "Ocurrio un error inesperado en la consulta, por favor puede intentarlo mas tarde.",
  });

  /**
   * esta funcion retorna un objeto con un status 404, que
   * especifica que la consulta esta vacio y no se econtro
   * ninguna recurso a mostrar
   * @message `No se encontraron datos para esta consulta, por favor intentelo mas tarde.`
   */
  public status404 = (message?: string): StatusConsult => ({
    status: false,
    data: [],
    message:
      message ||
      "No se encontraron datos para esta consulta, por favor intentelo mas tarde.",
  });

  /**
   * esta funcion retorna un objeto con un status 200, que especifica que
   * la consulta se realizo con exito y de que contiene datos para mostrar
   * @message `Se realizo con exito la consulta.`
   */
  public status200 = (data: any, message?: string): StatusConsult => ({
    status: true,
    data: data,
    message: message || "Se realizo con exito la consulta.",
  });

  /**
   * esta funcion retorna un objeto con un status 200, que especifica que
   * la mutacion se realizo con exito y de que contiene datos para mostrar
   * @message `Se ${message} con exito esta acción.`
   */
  public statusMutation200 = (message: string): statusMutation => ({
    status: true,
    message: `Se ${message} con exito esta acción.`,
  });

  /**
   * esta funcion retorna un objeto con un status 401, donde
   * especifica que ocurrio un error inesperado en la mutacion.
   * @message `Ocurrio un error inesperado ${message} , por favor intentelo mas tarde.`
   */
  public statusMutation401 = (message: string): statusMutation => ({
    status: false,
    message: `Ocurrio un error inesperado ${message}, por favor intentelo mas tarde.`,
  });
}
