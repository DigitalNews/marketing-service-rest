import { Request, Response } from "express";
import ganalytics, { jwt, viewId } from "@models/ganalytics";
import has from "@util/hasKeys";
/**
 * @author DigitalNew
 * @version 1.0.0
 * @description controlador para consutar a la api de google analytics.
 * @url /api/v1/analytics
 */

export default class Analytics {
  getUserbyCountry = async (_req: Request, res: Response) => {
    let dimensions = "ga:country";
    let metrics = "ga:users";
    try {
      const response = await ganalytics.data.ga.get({
        auth: jwt,
        ids: viewId,
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

  getTopBrowsers = async (req: Request, res: Response) => {
    if (!has.getHaskey(req.params, "viewid")) {
      return res.status(400).json({
        status: false,
        message: "viewid es necesario, por favor intentalo mas tarde.",
      });
    }

    let { viewid } = req.params;
    let dimensions = "ga:browser";
    let metrics = "ga:pageviews";
    try {
      const response = await ganalytics.data.ga.get({
        auth: jwt,
        ids: "ga:" + viewid,
        dimensions,
        metrics,
        sort: "-ga:pageviews",
        "start-date": "30daysAgo",
        "end-date": "today",
        "max-results": 100
      });
      return res.status(200).json({ status: true, data: response.data.rows });
    } catch (error) {
      console.warn("GoogleAnalytics:", error);
      res.status(500).json({
        status: false,
        message:
          "opps, ocurrio un error inesperado por favor intentalo mas tarde",
      });
    }
  };
}
