/*
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

/**
 * @author ronycb
 * @see https://github.com/mrbalem
 * @version 1.0.0
 */

type VariableType = "boolean" | "string" | "object" | "number" | undefined;

export default class HasKeys {
  // static keys: Array<{ key: string; type: string }>;

  /**
   * @param obj El congunto de objetos a analizar
   * @param keys los keys a validar ""?type -> defautl string
   * @param callback retorna el nombre del key vacio
   * @returns boolean
   */
  static getHaskey = (
    obj: any,
    keys: string | string[],
    callback?: (name: string, type?: any) => void
  ) => {
    if (typeof obj !== "object") {
      throw new TypeError("haskeys: has-keys expects an object");
    }

    let newkeys = Array.isArray(keys) ? keys : [keys];
    let len = newkeys.length;

    while (len--) {
      if (!(newkeys[len].split("?")[0] in obj)) {
        // recupermos el tipo de variable de newKeys.
        let type: VariableType = newkeys[len].split("?")[1] as VariableType;

        // verficamos si el tipo de variable existe, caso contrario mostramos un error.
        if (
          !["boolean", "string", "object", "number"].includes(type || "string")
        )
          throw new Error(
            `haskeys: Tipo de variable ${type} no es valido,
             se espera de tipo number, string, object o boolean`
          );
        if (type) {
          if (typeof newkeys[len].split("?")[0] !== type)
            throw new Error(
              `haskeys: El tipo de variable ${
                newkeys[len].split("?")[0]
              } es de tipo ${typeof newkeys[len].split(
                "?"
              )[0]} se espera un ${type}.`
            );
        }
        if (type) typeof newkeys[len].split("?")[0] === type;
        callback && callback(newkeys[len].split("?")[0]);
        return false;
      }
    }
    return true;
  };
}
