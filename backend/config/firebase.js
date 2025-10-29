const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin SDK
const initializeFirebase = () => {
  try {
    // Strategy (in order):
    // 1) Explicit JSON path via GOOGLE_APPLICATION_CREDENTIALS
    // 2) Local bundled JSON at backend root
    // 3) Inline JSON via FIREBASE_CREDENTIALS_JSON env (stringified)
    // 4) Individual env vars (original behavior)

    let serviceAccount = null;

    // 1) Path-based credentials (standard Google env)
    const credsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
    if (!serviceAccount && credsPath && fs.existsSync(credsPath)) {
      serviceAccount = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
    }

    // 2) Try local JSON committed/placed in backend directory
    const localJsonPath = path.resolve(__dirname, '..', 'chathub-1b438-firebase-adminsdk-fbsvc-ebdde0f822.json');
    if (!serviceAccount && fs.existsSync(localJsonPath)) {
      serviceAccount = JSON.parse(fs.readFileSync(localJsonPath, 'utf8'));
    }

    // 3) Stringified JSON in env
    if (!serviceAccount && process.env.FIREBASE_CREDENTIALS_JSON) {
      serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS_JSON);
    }

    // 4) Fallback to discrete env vars
    if (!serviceAccount) {
      serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY,
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
      };
    }

    // Normalize private_key newlines regardless of source
    if (serviceAccount && typeof serviceAccount.private_key === 'string') {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    if (!admin.apps.length) {
      const projectId = process.env.FIREBASE_PROJECT_ID || serviceAccount.project_id;
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: projectId ? `https://${projectId}-default-rtdb.firebaseio.com` : undefined
      });
      // Ensure Firestore ignores undefined properties to avoid validation errors
      admin.firestore().settings({ ignoreUndefinedProperties: true });
    }

    console.log('✅ Firebase Admin SDK initialized successfully');
    return admin;
  } catch (error) {
    console.error('❌ Error initializing Firebase:', error);
    throw error;
  }
};

const db = initializeFirebase().firestore();

module.exports = { admin, db };

