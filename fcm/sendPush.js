const admin = require('firebase-admin');
const path = require('path');
const serviceAccount = require(path.resolve(__dirname, '../config/firebaseServiceAccount.json'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

async function sendPushNotification(fcmToken, title, body, data = {}) {
  try {
    const message = {
      token: fcmToken,
      notification: {
        title,
        body
      },
      data
    };

    const response = await admin.messaging().send(message);
    console.log('Successfully sent message:', response);
    return response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
}

module.exports = sendPushNotification;
