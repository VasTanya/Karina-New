export const serviceAccount = {
  type: process.env.REACT_APP_FIREBASE_TYPE,
  project_id: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  private_key_id: process.env.REACT_APP_FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.REACT_APP_FIREBASE_PRIVATE_KEY,
  client_email: process.env.REACT_APP_FIREBASE_CLIENT_EMAIL,
  client_id: process.env.REACT_APP_FIREBASE_CLIENT_ID,
  auth_uri: process.env.REACT_APP_FIREBASE_AUTH_URI,
  token_uri: process.env.REACT_APP_FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url:
    process.env.REACT_APP_FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.REACT_APP_FIREBASE_CLIENT__X509_CERT_URL,
  universe_domain: process.env.REACT_APP_FIREBASE_UNIVERSE_DOMAIN,
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};
