const admin = require('firebase-admin');
const serviceAccount = require('./stulyfe-secretKey.json');
const firebaseConfig = require('./CommonFunction/firebaseconfig.json')
const { initializeApp } = require('firebase/app')



initializeApp(firebaseConfig);


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  
});


  module.exports = admin;