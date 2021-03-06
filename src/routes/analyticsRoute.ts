/** @format */
import express from "express";
import analyticsController from "@controllers/analytics-controller";

/**
 * @author DigitalNew
 * @see https://digitalnew.solutions/
 * @see https://github.com/DigitalNews/
 * @version 1.0.0
 */
export default class UserRouter {
  public router: express.Application;
  //[*] intanciasmos un nuevo objeto del controlador analytics
  public analyticsController: analyticsController = new analyticsController();
  constructor(router: express.Application) {
    this.router = router;
  }
  /**
   * @function Endpoint
   * @param path endoinpoint base
   */
  public Endpoint(path: string): void {
    this.router

      /**
       * @api {get} /api/v1/analytics/users-by-country Solicitar usuarios por paises
       * @apiVersion 0.0.1
       * @apiName GetUserByCountry
       * @apiGroup Analytics
       * @apiParam { string } viewid Identificación unica del proyecto a analizar de Google Analytics
       * @apiSuccess {Boolean} status true.
       * @apiSuccess {Object} data top User by country list.
       * @apiSuccess {String} message Mensaje de respuesta exitosa.
       * @apiError ViewIDNotFound   El <code>viewid</code> de google analytics no es valido.
       * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error.
       * @apiSuccessExample {json} Succes-Example
       * HTTP/1.1 200 OK
       * {
       *    status: true,
       *    data: [{}],
       *    message: "La solicitud se resolvio con exito"
       * }
       */
      .get(
        path + "/analytics/users-by-country",
        this.analyticsController.getUserbyCountry
      )

      /**
       * @api {get} /api/v1/analytics/pageviews Solicitar pageViews por dimenciones.
       * @apiName GetPageViewsByDimensions
       * @apiVersion 0.0.1
       * @apiGroup Analytics
       * @apiparam {String} dimensions Dimenciones especificas como -> https://ga-dev-tools.appspot.com/dimensions-metrics-explorer/#ga:browser
       * @apiParam { String } viewid Identificación unica del proyecto a analizar de Google Analytics
       * @apiparam {String} sort A comma-separated list of dimensions or metrics that determine the sort order for Analytics data.
       * @apiparam {String} startDate Start date for fetching Analytics data. Requests can specify a start date formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or 7daysAgo). The default value is 7daysAgo.
       * @apiparam {String} endDate End date for fetching Analytics data. Request can should specify an end date formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or 7daysAgo). The default value is yesterday.
       * @apiparam {Number} maxResults The maximum number of entries to include in this feed.
       * @apiSuccess {Boolean} status true.
       * @apiSuccess {Object} data top Browser list.
       * @apiSuccess {String} message Mensaje de respuesta exitosa.
       * @apiError ViewIDNotFound   El <code>viewid</code> de google analytics no es valido.
       * @apiError DimensionsNotFound   La <code>dimensions</code> es necesario para esta consulta.
       * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error.
       * @apiSuccessExample {json} Succes-Example
       * HTTP/1.1 200 OK
       * {
       *   status: true,
       *   data: {
       *       "columnHeaders": [],
       *       "containsSampledData": false,
       *       "dataLastRefreshed": "my_dataLastRefreshed",
       *       "dataTable": {},
       *       "id": "my_id",
       *       "itemsPerPage": 0,
       *       "kind": "my_kind",
       *       "nextLink": "my_nextLink",
       *       "previousLink": "my_previousLink",
       *       "profileInfo": {},
       *       "query": {},
       *       "rows": [],
       *       "sampleSize": "my_sampleSize",
       *       "sampleSpace": "my_sampleSpace",
       *       "selfLink": "my_selfLink",
       *       "totalResults": 0,
       *       "totalsForAllResults": {}
       *      }
       *   }
       */
      .get(
        path + "/analytics/pageviews",
        this.analyticsController.GetPageViewsByDimensions
      )

      /**
       * @api {get} /api/v1/analytics/info Solicitar informacion de anaylitics.
       * @apiName GetInfoAnalytics
       * @apiVersion 0.0.1
       * @apiGroup Analytics
       * @apiDescription Mas información:
       * <h4> <a target="_blanck" href="https://ga-dev-tools.appspot.com/dimensions-metrics-explorer/" > Dimenciones y Metricas </a> </h4>
       * <h4> <a target="_blanck" href="https://developers.google.com/analytics/devguides/reporting/core/v3/reference?hl=es-419" > API google Analytics </a>  </h4>
       * @apiparam {String} dimensions A comma-separated list of Analytics dimensions. E.g., 'ga:browser,ga:city'.
       * @apiparam {String} metrics A comma-separated list of Analytics metrics. E.g., 'ga:sessions,ga:pageviews'. At least one metric must be specified.
       * @apiparam {String} viewid  Unique table ID for retrieving Analytics data. Table ID is of the form ga:XXXX, where XXXX is the Analytics view (profile) ID.
       * @apiparam {String} sort A comma-separated list of dimensions or metrics that determine the sort order for Analytics data.
       * @apiparam {String} startDate Start date for fetching Analytics data. Requests can specify a start date formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or 7daysAgo). The default value is 7daysAgo.
       * @apiparam {String} endDate End date for fetching Analytics data. Request can should specify an end date formatted as YYYY-MM-DD, or as a relative date (e.g., today, yesterday, or 7daysAgo). The default value is yesterday.
       * @apiparam {String} maxResults The maximum number of entries to include in this feed.
       * @apiparam {String} filters A comma-separated list of dimension or metric filters to be applied to Analytics data.
       * @apiparam {Boolean} includeEmptyRows The response will include empty rows if this parameter is set to true, the default is true
       * @apiparam {String} output The selected format for the response. Default format is JSON.
       * @apiparam {String} samplingLevel The desired sampling level.
       * @apiparam {String} segment An Analytics segment to be applied to data.
       * @apiparam {String} startIndex An index of the first entity to retrieve. Use this parameter as a pagination mechanism along with the max-results parameter.
       * @apiError ViewIDNotFound   El <code>viewid</code> de google analytics no es valido.
       * @apiError DimensionsNotFound   Las <code>dimensions</code> es necesario para esta consulta.
       * @apiError MetricsNotFound   Las <code>Metrics</code> es necesario para esta consulta.
       * @apiError startDateNotFound   Las <code>startDate</code> es necesario para esta consulta.
       * @apiError endDateNotFound   Las <code>endDate</code> es necesario para esta consulta.
       * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error.
       * @apiSuccessExample {json} Succes-Example
       * HTTP/1.1 200 OK
       * {
       *   status: true,
       *   data: {
       *       "columnHeaders": [],
       *       "containsSampledData": false,
       *       "dataLastRefreshed": "my_dataLastRefreshed",
       *       "dataTable": {},
       *       "id": "my_id",
       *       "itemsPerPage": 0,
       *       "kind": "my_kind",
       *       "nextLink": "my_nextLink",
       *       "previousLink": "my_previousLink",
       *       "profileInfo": {},
       *       "query": {},
       *       "rows": [],
       *       "sampleSize": "my_sampleSize",
       *       "sampleSpace": "my_sampleSpace",
       *       "selfLink": "my_selfLink",
       *       "totalResults": 0,
       *       "totalsForAllResults": {}
       *      }
       *   }
       *
       * @apiErrorExample {json} Error-Example
       * HTTP/1.1 4xx
       * {
       *  "status": false,
       *  "message": "User does not have sufficient permissions for this profile.",
       *  "details": [
       *      {
       *          "message": "User does not have sufficient permissions for this profile.",
       *          "domain": "global",
       *          "reason": "insufficientPermissions"
       *      }
       *  ]
       * }
       */
      .get(
        path + "/analytics/info",
        this.analyticsController.getInfoGoogleAnalytic
      )

      /**
       * @api {get} /api/v1/analytics/countries-code Solicitar latitud y longitud por paises
       * @apiVersion 0.0.1
       * @apiName getCountryByCode
       * @apiGroup Analytics
       * @apiParam { string } code Lista de codigo de paises. E.g. 'PE, CO, ...' o 'pe, co, ...'. <a target="_blanck" href=" https://developers.google.com/public-data/docs/canonical/countries_csv"> mas información. <a/>
       * @apiSuccess {Boolean} status true.
       * @apiSuccess {Object} data lista de de latitud y longitud por codigo de pais.
       * @apiError code   El <code>code</code> es necesario para esta consulta.
       * @apiError (500 Internal Server Error) InternalServerError The server encountered an internal error.
       * @apiSuccessExample {json} Succes-Example
       * HTTP/1.1 200 OK
       * {
       *    status: true,
       *    data: [
       *        [
       *          "code",
       *          "latitude",
       *          "longitude"
       *        ],
       *        ...
       *    ],
       * }
       */
      .get(
        path + "/analytics/countries-code",
        this.analyticsController.getCountryByCode
      );
  }
}
