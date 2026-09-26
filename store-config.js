// Replace values using Firebase Console > Project settings > Your apps > Web app.
// These are public Firebase web config values, NOT service-account credentials.
window.STORE_CONFIG = {
  firebase: { apiKey: "REPLACE_ME", authDomain: "REPLACE_ME", projectId: "REPLACE_ME", appId: "REPLACE_ME" },
  // Deployed Firebase HTTPS function URL, e.g. https://asia-south1-PROJECT.cloudfunctions.net
  functionsBaseUrl: "REPLACE_ME",
  // Public Razorpay Key ID only. NEVER put key secret in GitHub.
  razorpayKeyId: "REPLACE_ME"
};
