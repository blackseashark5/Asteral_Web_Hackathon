import React, { useState, useEffect } from 'react';
import { Bell, BellOff, Settings } from 'lucide-react';
import { useAppContext } from '../contexts/AppContext';
import { motion, AnimatePresence } from 'framer-motion';

const PushNotificationManager: React.FC = () => {
  const { user } = useAppContext();
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationTypes, setNotificationTypes] = useState({
    newEvents: true,
    missionUpdates: true,
    quizChallenges: false,
    leaderboardUpdates: false,
    weeklyDigest: true
  });

  useEffect(() => {
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Check for existing subscription
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(registration => {
        registration.pushManager.getSubscription().then(sub => {
          setSubscription(sub);
        });
      });
    }

    // Load notification preferences
    const savedPrefs = localStorage.getItem('cosmic-notification-prefs');
    if (savedPrefs) {
      setNotificationTypes(JSON.parse(savedPrefs));
    }
  }, []);

  const requestPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return;
    }

    const permission = await Notification.requestPermission();
    setPermission(permission);

    if (permission === 'granted') {
      await subscribeToNotifications();
    }
  };

  const subscribeToNotifications = async () => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.ready;
      
      // VAPID public key (in production, this should be from your server)
      const vapidPublicKey = 'BEl62iUYgUivxIkv69yViEuiBIa40HI80NM9f4LiKiOOUkjwFWYxJaryRNBuNcYE-Hk6ti4cS0Ek6VJSz3dBSWM';
      
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
      });

      setSubscription(subscription);
      
      // Send subscription to server (mock implementation)
      await sendSubscriptionToServer(subscription);
      
      // Show welcome notification
      showNotification('Welcome to Cosmic Explorer!', {
        body: 'You\'ll now receive updates about space events and missions.',
        icon: '/icons/icon-192x192.png',
        tag: 'welcome'
      });
      
    } catch (error) {
      console.error('Failed to subscribe to notifications:', error);
    }
  };

  const unsubscribeFromNotifications = async () => {
    if (subscription) {
      await subscription.unsubscribe();
      setSubscription(null);
      
      // Remove from server (mock implementation)
      await removeSubscriptionFromServer(subscription);
    }
  };

  const sendSubscriptionToServer = async (subscription: PushSubscription) => {
    // Mock server call - in production, send to your backend
    console.log('Sending subscription to server:', subscription);
    
    // Store locally for demo purposes
    localStorage.setItem('cosmic-push-subscription', JSON.stringify(subscription));
  };

  const removeSubscriptionFromServer = async (subscription: PushSubscription) => {
    // Mock server call - in production, remove from your backend
    console.log('Removing subscription from server:', subscription);
    
    // Remove from local storage
    localStorage.removeItem('cosmic-push-subscription');
  };

  const showNotification = (title: string, options: NotificationOptions) => {
    if (permission === 'granted') {
      new Notification(title, options);
    }
  };

  const updateNotificationPreferences = (type: keyof typeof notificationTypes, enabled: boolean) => {
    const newPrefs = { ...notificationTypes, [type]: enabled };
    setNotificationTypes(newPrefs);
    localStorage.setItem('cosmic-notification-prefs', JSON.stringify(newPrefs));
  };

  const sendTestNotification = () => {
    showNotification('Test Notification', {
      body: 'This is a test notification from Cosmic Explorer!',
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-72x72.png',
      tag: 'test',
      vibrate: [100, 50, 100]
    });
  };

  // Utility function to convert VAPID key
  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  };

  if (!('Notification' in window)) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setShowSettings(true)}
        className={`fixed top-1/2 left-0 transform -translate-y-1/2 translate-x-0 p-3 rounded-r-lg shadow-lg transition-all duration-300 z-40 ${
          permission === 'granted' && subscription
            ? 'bg-green-600/90 text-white hover:bg-green-700/90'
            : 'bg-gray-600/90 text-gray-300 hover:bg-gray-700/90'
        }`}
        title="Notification settings"
      >
        {permission === 'granted' && subscription ? (
          <Bell className="w-5 h-5" />
        ) : (
          <BellOff className="w-5 h-5" />
        )}
      </button>

      <AnimatePresence>
        {showSettings && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="cosmic-card max-w-md w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Bell className="w-5 h-5 text-blue-400" />
                  <span>Notifications</span>
                </h2>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {permission === 'default' && (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h3 className="text-blue-300 font-semibold mb-2">Enable Notifications</h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Get notified about new space events, mission updates, and more!
                    </p>
                    <button
                      onClick={requestPermission}
                      className="cosmic-button w-full py-2"
                    >
                      Enable Notifications
                    </button>
                  </div>
                )}

                {permission === 'denied' && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                    <h3 className="text-red-300 font-semibold mb-2">Notifications Blocked</h3>
                    <p className="text-gray-300 text-sm">
                      Notifications are blocked. Please enable them in your browser settings to receive updates.
                    </p>
                  </div>
                )}

                {permission === 'granted' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Push Notifications</span>
                      <button
                        onClick={subscription ? unsubscribeFromNotifications : subscribeToNotifications}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          subscription
                            ? 'bg-red-600/80 text-white hover:bg-red-700/80'
                            : 'bg-green-600/80 text-white hover:bg-green-700/80'
                        }`}
                      >
                        {subscription ? 'Unsubscribe' : 'Subscribe'}
                      </button>
                    </div>

                    {subscription && (
                      <>
                        <div className="space-y-3">
                          <h4 className="text-white font-medium">Notification Types</h4>
                          
                          {Object.entries(notificationTypes).map(([type, enabled]) => (
                            <div key={type} className="flex items-center justify-between">
                              <span className="text-gray-300 text-sm capitalize">
                                {type.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </span>
                              <button
                                onClick={() => updateNotificationPreferences(type as keyof typeof notificationTypes, !enabled)}
                                className={`w-12 h-6 rounded-full transition-colors relative ${
                                  enabled ? 'bg-blue-600' : 'bg-gray-600'
                                }`}
                              >
                                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                                  enabled ? 'translate-x-6' : 'translate-x-0.5'
                                }`} />
                              </button>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={sendTestNotification}
                          className="w-full bg-gray-600/50 text-white py-2 rounded-lg hover:bg-gray-600/70 transition-colors text-sm"
                        >
                          Send Test Notification
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PushNotificationManager;