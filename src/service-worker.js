// Importez workbox et configurez le service worker
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

// Pré-cachez les fichiers statiques
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Mettez en cache les requêtes GET vers l'API
workbox.routing.registerRoute(
  new RegExp('http://localhost:5000/'),
  new workbox.strategies.NetworkFirst()
);
