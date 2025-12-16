import webPush from 'web-push';
import env from '../config/env.js';

// Configurar VAPID
if (env.VAPID_PUBLIC_KEY && env.VAPID_PRIVATE_KEY) {
  webPush.setVapidDetails(
    env.VAPID_SUBJECT,
    env.VAPID_PUBLIC_KEY,
    env.VAPID_PRIVATE_KEY
  );
}

// Almacén temporal de subscripciones (en producción usar MongoDB)
const subscriptions = new Set();

export const addSubscription = (subscription) => {
  subscriptions.add(JSON.stringify(subscription));
  return true;
};

export const sendNotification = async (subscription, payload) => {
  try {
    await webPush.sendNotification(subscription, JSON.stringify(payload));
    return true;
  } catch (error) {
    console.error('Error enviando notificación:', error);
    if (error.statusCode === 410) {
      // Subscription expirada, eliminar
      subscriptions.delete(JSON.stringify(subscription));
    }
    throw error;
  }
};

export const sendToAll = async (payload) => {
  const results = await Promise.allSettled(
    Array.from(subscriptions).map(sub => 
      sendNotification(JSON.parse(sub), payload)
    )
  );
  
  return {
    sent: results.filter(r => r.status === 'fulfilled').length,
    failed: results.filter(r => r.status === 'rejected').length
  };
};
