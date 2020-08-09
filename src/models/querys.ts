import { Actions } from "@util/Actions";
import { firestore } from "./database";

/**
 * @author DigitalNews
 * @version 1.0.0
 * @constructor true
 * @param colection especifica la coleccion a interectuar con firestore.
 * @description Esta clase nos permite usar las acciones para interactuar con
 * firestore especificando los datos a ingresar, actualizar, eliminar, consultar.
 */
export default class QueryModel extends Actions {
  constructor(public colection: string) {
    super(firestore, colection);
  }
}
