// service-worker.js
self.addEventListener('push', function(event) {
    const options = {
      body: event.data.text(), // message content sent from the backend
      icon: 'icon.png', // specify an icon for the notification
      badge: 'badge.png', // specify a badge icon
    };
  
    event.waitUntil(
      self.registration.showNotification('New Message', options)
    );
  });
  