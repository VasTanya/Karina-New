export const ENV_VARS_LIST = {
  MONGODB_URI: "globals.mongodb_uri",
  JWT_SECRET: "globals.jwt_secret",
  ADMIN_MAIL_USERNAME: "mail.admin_mail",
  ADMIN_MAIL_PASSWORD: "mail.admin_mail_password",
  SUPPORT_MAIL: "mail.support_mail",
  SUPPORT_MAIL_PASSWORD: "mail.support_mail_password",
  MAIL_SERVICE: "mail.mail_service",
  MAIL_HOST: "mail.mail_host",
  MAIL_PORT: "mail.mail_port",
  MAIL_ENCRYPTION: "mail.mail_encryption",
  TYPE: "config.type",
  PROJECT_ID: "config.project_id",
  PRIVATE_KEY_ID: "config.private_key_id",
  PRIVATE_KEY: "config.private_key",
  CLIENT_EMAIL: "config.client_email",
  CLIENT_ID: "config.client_id",
  AUTH_URI: "config.auth_uri",
  TOKEN_URI: "config.token_uri",
  AUTH_PROVIDER_X509_CERT_URL: "config.auth_provider_x509_cert_url",
  CLIENT__X509_CERT_URL: "config.client_x509_cert_url",
  UNIVERSE_DOMAIN: "config.universe_domain",
  API_KEY: "config.api_key",
  AUTH_DOMAIN: "config.auth_domain",
  STORAGE_BUCKET: "config.storage_bucket",
  MESSAGING_SENDER_ID: "config.messaging_sender_id",
  APP_ID: "config.app_id",
  MEASUREMENT_ID: "config.measurement_id",
  DATABASE_URL: "config.database_url",
};

export const IMAGE_SIZES = {
  sm: { width: 96, height: 96 },
  md: { width: 268, height: 326 },
  lg: { width: 384, height: 384 },
};

export const DEFAULT_IMAGE = "noPhoto.jpeg";

export const NO_PHOTO_URLS = Object.keys(IMAGE_SIZES).reduce((acc, size) => {
  acc[size] = DEFAULT_IMAGE;

  return acc;
}, {});
