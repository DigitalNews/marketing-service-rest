import { google } from "googleapis";

const analytics = google.analytics("v3");

//[*] seleccionamos el view id a consultar
export const viewId = process.env.VIEW_ID;

/**
 * iniciamos una autenticación en google para obtener los
 * datos
 **/
export const jwt = new google.auth.JWT({
  email: process.env.CLIENT_EMAIL_ANALYTICS,
  key: process.env.PRIVATE_KEY_ANALYTICS!.replace(/\\n/g, "\n"),
  scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
});


export default analytics;
