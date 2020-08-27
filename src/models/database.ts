/** @format */
import admin from "firebase-admin";
import * as dotenv from "dotenv";

//[*] load port from env
dotenv.config();

const {
  TYPE,
  PROJECT_ID,
  PRIVATE_KEY_ID,
  PRIVATE_KEY,
  CLIENT_EMAIL,
  CLIENT_ID,
  AUTH_URI,
  TOKEN_URI,
  AUTH_PROVIDER,
  CLIENT_CERT,
} = process.env;

const serviceAccount: any = {
  type: TYPE,
  project_id: PROJECT_ID,
  private_key_id: PRIVATE_KEY_ID,
  private_key: PRIVATE_KEY!.replace(/\\n/g, "\n"),
  client_email: CLIENT_EMAIL,
  client_id: CLIENT_ID,
  auth_uri: AUTH_URI,
  token_uri: TOKEN_URI,
  auth_provider_x509_cert_url: AUTH_PROVIDER,
  client_x509_cert_url: CLIENT_CERT,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://admin-b5f69.firebaseio.com",
});

// export services

// export const { auth } = admin;
// export const storage = admin.storage();
export const firestore = admin.firestore();
// export const database = admin.database();
export const FieldValue = admin.firestore.FieldValue;
