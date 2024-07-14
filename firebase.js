const admin = require('firebase-admin');
const serviceAccount = require('./stulyfe-secretKey.json');
const firebaseConfig = require('./CommonFunction/firebaseconfig.json')
const { initializeApp } = require('firebase/app');
const { decrypt } = require('./CommonFunction/decrypt');



initializeApp(firebaseConfig);

let decrypted = JSON.parse(decrypt(serviceAccount.encryptedData))
admin.initializeApp({
  credential: admin.credential.cert(decrypted),
  
});


  module.exports = admin;