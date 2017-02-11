module.exports = {
    "extends": "airbnb-base",
    "plugins": [
      "import",
      "html"
    ],
    "rules": {
      "comma-dangle": 0
    },
    "env": {
      "browser": true
    },
    "globals": {
      "FIREBASE_API_KEY": false,
      "FIREBASE_AUTH_DOMAIN": false,
      "FIREBASE_DATABASE_URL": false,
      "FIREBASE_STORAGE_BUCKET": false,
      "FIREBASE_MESSAGING_SENDER_ID": false
    },
    "settings": {
      "import/resolver": "webpack"
    }
};
