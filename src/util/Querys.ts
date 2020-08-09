/** @format */
import { firestore } from "firebase-admin";

export type Conditional = {
  /**
   * determina el nombre de la llave a comparar.
   */
  name: string;
  /**
   * especifica el tipo de condicion (<>=<=>=).
   * @see https://firebase.google.com/docs/firestore/query-data/queries/
   */
  operator: operator;
  /**
   * especifica la condicion que se debe de cumplir para recuperar los datos.
   */
  iqual: string | Array<string> | boolean | number;
};

//[*] operador conditinal
export type operator =
  | "<"
  | "<="
  | "=="
  | ">"
  | ">="
  | "array-contains"
  | "array-contains-any";

/**
 * @class Querys
 * @author rony cb - DigitalNews
 * @see https://gigitalnews.pe
 * @description Estos nos permiten interactuar con la base de datos real time de firestore (firebase). Mas información -> https://firebase.google.com/docs/firestore?hl=es-419
 * @example
 * import Querys from './path/Querys';
 * class Example {
 *  	private querys = new Querys("colection", firebase)
 *  }
 */

export default class Querys {
  /**
   *especifica la colleción de la base de datos a consultar.
   */
  private collection: string;

  /**
   * contiene lo necesario para realizar la consulta a una base de datos de firestore (firebase)
   */
  private firestore: FirebaseFirestore.Firestore;

  /**
   * @constructor
   * @param collection colleccion a consultar de firestore, mas informacion ---> https://firebase.google.com/docs/firestore/quickstart?hl=es-419#add_data
   * @param firestore informacion necesario para la consulta a la base de datos de firestore
   */

  constructor(collection: string, firestore: FirebaseFirestore.Firestore) {
    this.collection = collection;
    this.firestore = firestore;
  }

  /**
   * @function getItem
   * @param doc especifica el documento donde apuntara para obtener los datos necesarios
   * @param collection Este parametro es necesario si se quiere especificar una coleccion diferente a la del constructor
   * @returns retorna una promesa de tipo Objeto en formato JSON {...}
   * @description Esta funcion recupera datos en especifico de un documento.
   * @example
   * const response = await getItem("doc")
   * // obtener datos de otra colección
   * const response = await getItem("doc", "collection")
   */

  public getItem(doc: string, collection = this.collection) {
    return this.firestore.collection(collection).doc(doc).get();
  }

  /**
   * @function getItems
   * @param limit este parametro determinar la cantidad de datos que va a recuperar, por defecto es 50
   * @param collection este parametro es opcional si se quiere recuperar datos de otra coleccion, que no sea la del constructor
   * @returns retorna una promesa de objectos [{...},{...}]
   * @description es una función que recupera un conjunto de datos de una coleccion en especifico, para esto no es necesario el documento.
   * @example
   * //limit defaul 50
   * const response = await getItems()
   * //otener datos de otra colección con un limite de 10
   * const response = await getItems(10, "colection")
   */

  public getItems(limit?: number, collection = this.collection) {
    return this.firestore
      .collection(collection)
      .limit(limit || 50)
      .get();
  }

  /**
   * @function getItemsByorder
   * @param limit especifica el limite de la consulta
   * @param orderBy especifica el orden de la consulta
   * @param coleccion espeficia la coleccion a consultar
   */
  public getItemsByorder(
    limit: number,
    orderBy: string,
    coleccion = this.collection
  ) {
    return this.firestore
      .collection(coleccion)
      .orderBy(orderBy)
      .limit(limit)
      .get();
  }

  /**
   * @function getItemsbyConditional
   * @param condition  determina la condicion de la consulta a realiazar. mas informacion -> https://firebase.google.com/docs/firestore/query-data/queries/
   * @param limit determina la cantidad de datos a obtener, por defecto es 50.
   * @param collection este parametro es opcional si se quiere recuperar datos de otra coleccion, que no sea la del constructor
   * @returns retorna una promesa de Objetos [{},{},{}]
   * @description esta funcion permite realizar una consulta a una coleccion en especifica por una condicion que se debe cumplir.
   * @example
   * const response = await getItemsbyConditional({name: "tags", operator: "==", iqual: "zapatos" })
   */

  public getItemsbyConditional(
    condition: Conditional,
    limit?: number,
    collection = this.collection
  ) {
    return this.firestore
      .collection(collection)
      .where(condition.name, condition.operator, condition.iqual)
      .limit(limit || 50)
      .get();
  }

  /**
   * @function getItemsByConditionAndOrderby
   * @param orderByQuery Es el valor a ordernar
   * @param condition Es la condicion que tiene que filtrar la consulta
   * @param directionStr Es la forma de ordernar la consulta asc o desc
   * @param limit Es el limite de la consulta
   * @param colecction Es la coleccion ontener los datos
   */
  public getItemsByConditionAndOrderby(
    orderByQuery: string,
    condition: Conditional,
    directionStr?: "desc" | "asc",
    limit?: number,
    colecction = this.collection
  ) {
    return this.firestore
      .collection(colecction)
      .where(condition.name, condition.operator, condition.iqual)
      .orderBy(orderByQuery, directionStr)
      .limit(limit || 50)
      .get();
  }

  /**
   * @description retornamos todos los query para
   * porder personalizar nuestra consulta
   */
  public getQuerys(colection = this.collection) {
    console.log(colection);
    return this.firestore.collection(colection);
  }

  public getItemStartAfter(
    orderBy: string,
    startAfter: string,
    limit?: number,
    collection = this.collection
  ) {
    return this.firestore
      .collection(collection)
      .orderBy(orderBy)
      .startAfter(startAfter)
      .limit(limit || 50)
      .get();
  }

  public setItem(doc: string, data: any, collection = this.collection) {
    return this.firestore
      .collection(collection)
      .doc(doc)
      .set(data, { merge: true });
  }

  public addItem(data: any, collection = this.collection) {
    return this.firestore.collection(collection).add(data);
  }

  public setItemsUid(uid: string, key: string, collection = this.collection) {
    return this.firestore
      .collection(collection)
      .doc(uid)
      .set({ [key]: uid }, { merge: true });
  }

  public setDate = (doc: string, collection = this.collection) => {
    return this.firestore
      .collection(collection)
      .doc(doc)
      .set({ createAt: new Date() }, { merge: true });
  };

  public setElmentInArray(
    arrayName: string,
    doc: string,
    element: string | number,
    collection = this.collection
  ) {
    return this.firestore
      .collection(collection)
      .doc(doc)
      .update({
        [arrayName]: firestore.FieldValue.arrayUnion(element),
      });
  }

  public updateItem(doc: string, data: any, collection = this.collection) {
    return this.firestore.collection(collection).doc(doc).update(data);
  }

  public deletedItem(doc: string, collection = this.collection) {
    return this.firestore.collection(collection).doc(doc).delete();
  }

  public deleteFieldItem(
    collection = this.collection,
    doc: string,
    field: string
  ) {
    return this.firestore
      .collection(collection)
      .doc(doc)
      .update({
        [field]: firestore.FieldValue.delete(),
      });
  }

  public deleteElementinArray(
    collection = this.collection,
    doc: string,
    arrayName: string,
    elemet: string | number
  ) {
    return this.firestore
      .collection(collection)
      .doc(doc)
      .update({
        [arrayName]: firestore.FieldValue.arrayRemove(elemet),
      });
  }
}
