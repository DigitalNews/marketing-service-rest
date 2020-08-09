/*
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

/**
 * @author ronycb
 * @see https://github.com/mrbalem
 * @version 1.0.0
 */

export default class HasKeys {
  /**
   * @param obj
   * @param keys
   * @returns boolean
   */
  static getHaskey = (obj: any, keys: string) => {
    if (typeof obj !== "object") {
      throw new TypeError("haskeys: has-keys expects an object");
    }
    let newkeys = Array.isArray(keys) ? keys : [keys];
    let len = newkeys.length;
    while (len--) {
      if (!(keys[len] in obj)) return false;
    }

    return true;
  };
}
