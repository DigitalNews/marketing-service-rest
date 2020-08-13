import CaptureError, { StatusConsult } from "./Error";
import Querys, { operator, Conditional } from "./Querys";

interface IActions {
  getData: (uid: string) => Promise<StatusConsult | false>;
  getDatas: () => Promise<StatusConsult | false>;
  setData: (doc: string, data: any) => Promise<StatusConsult | false>;
  addData: (data: any) => Promise<StatusConsult | false>;
  updateData: (uid: string, data: any) => Promise<StatusConsult | false>;
  deletedData: (uid: string) => Promise<StatusConsult | false>;
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
  getData = async (doc: string): Promise<StatusConsult | false> => {
    const response = await this.captureError.captureErrorDocument(
      this.querys.getItem(doc)
    );
    if (response) {
      if (response.exists)
        return this.captureError.response200(response.data(), "se obtuvo con exito los datos de la consutal.")
      return this.captureError.response404();
    }
    return false;
  };

  /**
   * @function getDatas
   * @returns Promise<StatusConsult>
   * @description esta funcion retorna los documentos de una collecion.
   */
  getDatas = async (): Promise<StatusConsult | false> => {
    const response = await this.captureError.captureErrorCollention(
      this.querys.getItems()
    );
    if (response) {
      let users: any[] = [];
      response.forEach((user) => {
        users.push(user.data());
      });
      if (users.length === 0) return this.captureError.response404();
      return this.captureError.response200(
        users,
        "Se obtuvo con exito los datos de la consulta."
      );
    }
    return false;
  };

  /**
   * @function getDatasByWhere
   * @returns Promise<StatusConsult>
   * @param name es el nombre de la llave del objeto a comparar
   * @param condition es el condiciona que va comparar <,>,=,<=,>=
   * @param iqual es el resultado a comparar.
   * @param message mensage a retorna con la consulta.
   * @description esta funcion retorna los documentos de una collecion siempre
   * y cuando cumpla con la condicion.
   */
  getDatasByWhere = async (
    name: string,
    condition: operator,
    iqual: string,
    limit?: number
  ): Promise<StatusConsult | false> => {
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

      if (datas.length === 0) return this.captureError.response404();
      return this.captureError.response200(
        datas,
        "Se obtuvo con exito los datos de la consutal."
      );
    }
    return false;
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

      if (datas.length === 0) return this.captureError.response404();
      return this.captureError.response200(
        datas,
        "Se obtuvo con exito los datos de la consulta."
      );
    }
    return false;
  };

  /**
   * @function setData
   * @returns Promise<statusMutation>
   * @param doc el docuemento que identifica al a la accion
   * @param data los datos del cliente a ingresarre
   * @description esta funcion se encarga de ingresar los datos de un accion con un
   * documento personalizado.
   */
  setData = async (doc: string, data: any): Promise<StatusConsult | false> => {
    const response = await this.captureError.catureErrorsetItem(
      this.querys.setItem(doc, data)
    );
    if (response)
      return this.captureError.response200(
        {},
        "se ingreso con exito los datos de la consulta."
      );
    return false;
  };

  /**
   * @function addData
   * @returns Promise<statusMutation>
   * @param data los datos de la accion a ingresar
   * @param date esperifica la fecha de ingreso del dato
   * @description esta funcion se encarga de ingresar los datos de una accion con un
   * documento generado por firebase.
   */
  addData = async (
    data: any,
    date?: boolean
  ): Promise<StatusConsult | false> => {
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
      return this.captureError.response200(
        {},
        "Se ingreso con exito los datos de la consulta."
      );
    }
    return false;
  };

  /**
   * @function updateData
   * @param doc el documento que identifica a la accion
   * @param data los a actualizar de la acción
   * @param message retorna un mensage personalisado si la conulta es exitosa
   * @returns Promise<statusMutation>
   */
  updateData = async (
    doc: string,
    data: any,
    date?: boolean
  ): Promise<StatusConsult | false> => {
    const response = await this.captureError.catureErrorupdateItem(
      this.querys.updateItem(
        doc,
        date ? { ...data, modified: new Date() } : data
      )
    );
    if (response)
      return this.captureError.response200(
        {},
        "Se actulizo con éxito los datos de la consutla."
      );
    return false;
  };

  /**
   * @function deletedData
   * @returns Promise<statusMutation>
   * @param doc el documento que identifica a la accion.
   * @description esta funcion se encarga de eliminar los cliente.
   */
  deletedData = async (doc: string): Promise<StatusConsult | false> => {
    const response = await this.captureError.catureErrordeletedItem(
      this.querys.deletedItem(doc)
    );
    if (response)
      return this.captureError.response200(
        {},
        "Se elimino con éxito los datos de la consulta."
      );
    return false;
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
      if (datas.length === 0) return this.captureError.response404();
      return this.captureError.response200(
        datas,
        "Se obtuvo con exito los datos de la consulta"
      );
    }
    return false;
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
