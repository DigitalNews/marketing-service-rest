import CaptureError, { StatusConsult, statusMutation } from "./Error";
import Querys, { operator, Conditional } from "./Querys";

interface IActions {
  getData: (uid: string) => Promise<StatusConsult>;
  getDatas: () => Promise<StatusConsult>;
  setData: (doc: string, data: any) => Promise<statusMutation | false>;
  addData: (data: any) => Promise<statusMutation | false>;
  updateData: (uid: string, data: any) => Promise<statusMutation>;
  deletedData: (uid: string) => Promise<statusMutation>;
}

/**
 * @author RonyCB
 * @version 1.0.0
 */
export class Actions implements IActions {
  private querys: Querys;

  constructor(
    firestore: FirebaseFirestore.Firestore,
    public colection: string
  ) {
    //[*] Instanciamos un nuevo Objeto de la clase query y lo seteamos en una variable
    this.querys = new Querys(colection, firestore);
  }

  //[*] Instanciamos un nuevo objeto la clase Error para capturar los errores en nuestra transaccion
  public captureError = new CaptureError();

  /**
   * @function getData
   * @returns  Promise<StatusConsult>
   * @param doc el documento necesario que indentifica a la accion
   * @description esta funcion sera el encargado de retornar un documento en espercifico
   * de la firebase.
   */
  getData = async (doc: string): Promise<StatusConsult> => {
    const user = await this.captureError.captureErrorDocument(
      this.querys.getItem(doc)
    );
    if (user) {
      if (user.exists) return this.captureError.status200(user.data);
      return this.captureError.status404();
    }
    return this.captureError.status401();
  };

  /**
   * @function getDatas
   * @returns Promise<StatusConsult>
   * @description esta funcion retorna los documentos de una collecion.
   */
  getDatas = async (): Promise<StatusConsult> => {
    const response = await this.captureError.captureErrorCollention(
      this.querys.getItems()
    );
    if (response) {
      let users: any[] = [];
      response.forEach((user) => {
        users.push(user.data());
      });
      if (users.length === 0) return this.captureError.status404();
      return this.captureError.status200(users);
    }
    return this.captureError.status401();
  };

  /**
   * @function getDatasByWhere
   * @returns Promise<StatusConsult>
   * @param name es el nombre de la llave del objeto a comparar
   * @param condition es el condiciona que va comparar <,>,=,<=,>=
   * @param iqual es el resultado a comparar.
   * @description esta funcion retorna los documentos de una collecion siempre
   * y cuando cumpla con la condicion.
   */
  getDatasByWhere = async (
    name: string,
    condition: operator,
    iqual: string,
    limit?: number
  ): Promise<StatusConsult> => {
    const response = await this.captureError.captureErrorCollention(
      this.querys.getItemsbyConditional(
        {
          name: name,
          iqual: iqual,
          operator: condition,
        },
        limit
      )
    );

    if (response) {
      let datas: any[] = [];
      response.forEach((data) => {
        datas.push(data.data());
      });

      if (datas.length === 0) return this.captureError.status404();
      return this.captureError.status200(datas);
    }

    return this.captureError.status401();
  };

  getDatasByWhereOrderBy = async (
    orderByQuery: string,
    condition: Conditional,
    directionStr?: "desc" | "asc",
    limit?: number
  ) => {
    const response = await this.captureError.captureErrorCollention(
      this.querys.getItemsByConditionAndOrderby(
        orderByQuery,
        condition,
        directionStr,
        limit
      )
    );
    if (response) {
      let datas: any[] = [];
      response.forEach((element) => {
        datas.push(element.data());
      });

      if (datas.length === 0) return this.captureError.status404();
      return this.captureError.status200(datas);
    }

    return this.captureError.status401();
  };

  /**
   * @function setData
   * @returns Promise<statusMutation>
   * @param doc el docuemento que identifica al a la accion
   * @param data los datos del cliente a ingresarre
   * @description esta funcion se encarga de ingresar los datos de un accion con un
   * documento personalizado.
   */
  setData = async (doc: string, data: any): Promise<statusMutation | false> => {
    const response = await this.captureError.catureErrorsetItem(
      this.querys.setItem(doc, data)
    );
    if (response) return this.captureError.statusMutation200("Ingreso");
    return false;
  };

  /**
   * @function addData
   * @returns Promise<statusMutation>
   * @param data los datos de la accion a ingresar
   * @description esta funcion se encarga de ingresar los datos de una accion con un
   * documento generado por firebase.
   */
  addData = async (
    data: any,
    date?: boolean
  ): Promise<statusMutation | false> => {
    const response = await this.captureError.captureErrorAdditem(
      this.querys.addItem(
        date
          ? {
              ...data,
              created: new Date(),
              modified: new Date(),
            }
          : data
      )
    );
    if (response) {
      const uid = response.id;
      this.querys.setItemsUid(uid, "uid");
      return this.captureError.statusMutation200("ingreso");
    }
    return false;
  };

  /**
   * @function updateData
   * @param doc el documento que identifica a la accion
   * @param data los a actualizar de la acción
   * @returns Promise<statusMutation>
   */
  updateData = async (
    doc: string,
    data: any,
    date?: boolean
  ): Promise<statusMutation> => {
    const response = await this.captureError.catureErrorupdateItem(
      this.querys.updateItem(
        doc,
        date ? { ...data, modified: new Date() } : data
      )
    );
    if (response) return this.captureError.statusMutation200("actualizo");
    return this.captureError.statusMutation401("al actualizar esta acción");
  };

  /**
   * @function deletedData
   * @returns Promise<statusMutation>
   * @param doc el documento que identifica a la accion.
   * @description esta funcion se encarga de eliminar los cliente.
   */
  deletedData = async (doc: string): Promise<statusMutation> => {
    const response = await this.captureError.catureErrordeletedItem(
      this.querys.deletedItem(doc)
    );
    if (response) return this.captureError.statusMutation200("Elimino");
    return this.captureError.statusMutation401("en elimar el cliente");
  };

  /**
   * @function getQuerys
   * @description esta funcion retorna los querys de una colección
   * para poder realizar una consulta personalizada de una coleccion
   * @returns funtion
   */
  getQuerys = () => {
    return this.querys.getQuerys();
  };

  /**
   * @requires getQuerys
   * @function captureErrorGetDatasQuery
   * @param query query personalizado para realizar la consulta
   * @returns Object{status, data, message}
   * @description esta función captura los errors de un query
   * personalizado con filtrados dependientes.
   */
  captureErrorGetDatasQuery = async (
    query: Promise<
      FirebaseFirestore.QuerySnapshot<FirebaseFirestore.DocumentData>
    >
  ) => {
    const response = await this.captureError.captureErrorCollention(query);
    if (response) {
      let datas: any[] = [];
      response.forEach((element) => {
        datas.push(element.data());
      });
      if (datas.length === 0) return this.captureError.status404();
      return this.captureError.status200(datas);
    }
    return this.captureError.status401();
  };

  /**
   * @static
   * @instance Actions
   * @class Actions
   * @description esta funcion statica retorna una nueva instancia
   * de la clase Actions.
   */
  static instancies = (
    firestore: FirebaseFirestore.Firestore,
    colection: string
  ) => {
    return new Actions(firestore, colection);
  };
}
