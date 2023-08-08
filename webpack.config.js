const path = require('path');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  // ... Autres configurations Webpack ...

  plugins: [
    // ... Autres plugins ...

    // Utilisation de Workbox pour générer un Service Worker
    new WorkboxPlugin.GenerateSW({
      // Paramètres de configuration de Workbox
      clientsClaim: true, // Réclamer les clients tout de suite lors de l'activation du Service Worker
      skipWaiting: true, // Ignorer le cache actuel et activer le nouveau Service Worker

      // Stratégie de mise en cache pour les fichiers HTML
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://votre-domaine.com/'), // Modifiez ceci avec votre domaine
          handler: 'StaleWhileRevalidate',
        },
      ],
    }),
  ],

  // ... Autres configurations Webpack ...
};
