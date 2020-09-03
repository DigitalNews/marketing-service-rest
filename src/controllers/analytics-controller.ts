import { Request, Response } from "express";
import ganalytics, { jwt } from "@models/ganalytics";
import has from "@util/hasKeys";
/**
 * @author DigitalNew
 * @version 1.0.1
 * @description controlador para consutar a la api de google analytics.
 * @url /api/v1/analytics
 */

export default class Analytics {
  getUserbyCountry = async (req: Request, res: Response) => {
    //[*] verificamos si el parametro view id existre el request
    if (!has.getHaskey(req.query, "viewid")) {
      return res.status(400).json({
        status: false,
        message: "viewid es necesario, por favor intentalo de nuevo.",
      });
    }

    let { viewid } = req.query;
    let dimensions = "ga:country";
    let metrics = "ga:users";
    try {
      const response = await ganalytics.data.ga.get({
        auth: jwt,
        ids: "ga:" + viewid,
        dimensions,
        metrics,
        "start-date": "30daysAgo",
        "end-date": "today",
      });
      return res.status(200).json({ status: true, data: response.data.rows });
    } catch (error) {
      console.warn("GoogleAnalytics:", error);
      return res.status(500).json({
        status: false,
        message:
          "opps, ocurrio un error inesperado por favor intentalo mas tarde",
      });
    }
  };

  GetPageViewsByDimensions = async (req: Request, res: Response) => {
    try {
      has.getHaskey(req.query, ["viewid", "dimensions"], (name) => {
        if (name)
          return res.status(400).json({
            status: false,
            message: name + " es necesario, por favor intentalo de nuevo.",
          });
      });

      let {
        viewid,
        dimensions,
        sort,
        startDate,
        endDate,
        maxResults,
      } = req.query;
      // let dimensions = "ga:browser";
      let metrics = "ga:pageviews";
      const response = await ganalytics.data.ga.get({
        auth: jwt,
        ids: "ga:" + viewid,
        dimensions: "ga:" + dimensions,
        metrics,
        sort: has.verifyStringV(sort),
        "start-date": has.verifyStringV(startDate, "30daysAgo"),
        "end-date": has.verifyStringV(endDate, "today"),
        "max-results": has.verifyNumberV(maxResults),
      });
      if (response.status === 200)
        return res.status(200).json({ status: true, data: response.data });
      return res.status(500).json({
        status: status,
        message:
          "opps, ocurrio un erros inesperado, por favor intentelo mas tarde",
      });
    } catch (error) {
      console.warn("GoogleAnalytics:", error);
      if (error) {
        if (error.response) {
          res.status(error.response.status).json({
            status: false,
            message: error.response.data.error.message,
            details: error.response.data.error.errors,
          });
        } else {
          res.status(500).json({
            status: false,
            message:
              "opps, ocurrio un erros inesperado, por favor intentelo mas tarde",
            details: error,
          });
        }
      }
    }
  };

  /**
   * @function getInfoGoogleAnalytic
   * @param req
   * @param res
   * @description consulta general para consumir la API de google analytics
   * @see https://ga-dev-tools.appspot.com/dimensions-metrics-explorer/
   */

  getInfoGoogleAnalytic = async (req: Request, res: Response) => {
    console.log("ingorGooleAnalytics", req.query);
    try {
      //[*] indentificamos los parametro requeridos para esta consulta
      has.getHaskey(
        req.query,
        ["dimensions", "viewid", "metrics", "startDate", "endDate"],
        (name) => {
          if (name)
            return res.status(400).json({
              status: false,
              message: name + " es necesario, por favor intentalo de nuevo.",
            });
        }
      );

      //[*] obtenos los datos del query
      let {
        viewid,
        dimensions,
        metrics,
        sort,
        startDate,
        endDate,
        maxResults,
        filters,
        includeEmptyRows,
        output,
        samplingLevel,
        segment,
        startIndex,
      } = req.query;

      //[*] realizamos la consulta a google analytics
      const response = await ganalytics.data.ga.get({
        auth: jwt,
        ids: "ga:" + viewid,
        dimensions: has.verifyStringV(dimensions),
        metrics: has.verifyStringV(metrics),
        sort: has.verifyStringV(sort),
        filters: has.verifyStringV(filters),
        output: has.verifyStringV(output),
        samplingLevel: has.verifyStringV(samplingLevel),
        segment: has.verifyStringV(segment),
        "start-date": has.verifyStringV(startDate),
        "end-date": has.verifyStringV(endDate),
        "max-results": has.verifyNumberV(maxResults),
        "include-empty-rows": has.verifyBooleanV(includeEmptyRows),
        "start-index": has.verifyNumberV(startIndex),
      });

      //[*] si obtenemos un status 200 enviamos la respuesta de analytics
      if (response.status === 200)
        return res.status(200).json({ status: true, data: response.data });

      //[*] si ocurre cualquier error que no es capturado por try catch enviamos un mensaje
      // al cliente.
      return res.status(500).json({
        status: status,
        message:
          "opps, ocurrio un error inesperado, por favor intentelo mas tarde",
      });
    } catch (error) {
      //[*] capturamos cualquier error en la consulta
      console.warn("GoogleAnalytics:", error);

      //[+] verificamos si error existe!.
      if (error) {
        if (error.response) {
          res.status(error.response.status).json({
            status: false,
            message: error.response.data.error.message,
            details: error.response.data.error.errors,
          });
        } else {
          res.status(500).json({
            status: false,
            message:
              "opps, ocurrio un erros inesperado, por favor intentelo mas tarde",
            details: error,
          });
        }
      }
    }
  };
}
