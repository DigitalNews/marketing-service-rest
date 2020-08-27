import { google } from "googleapis";
const analytics = google.analytics("v3");
export const viewId = process.env.VIEW_ID;
export const jwt = new google.auth.JWT({
  email: process.env.CLIENT_EMAIL_ANALYTICS,
  key: process.env.PRIVATE_KEY_ANALYTICS,
  scopes: ['https://www.googleapis.com/auth/analytics.readonly']
});
export default analytics
