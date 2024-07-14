const admin = require('firebase-admin');
const serviceAccount = require('./stulyfe-secretKey.json');
const firebaseConfig = require('./CommonFunction/firebaseconfig.json')
const { initializeApp } = require('firebase/app');
const { decrypt } = require('./CommonFunction/decrypt');
const crypto = require('crypto');
const keyHex = 'your-key-hex-string-here';
const ivHex = 'your-iv-hex-string-here';

const key = Buffer.from(keyHex, 'hex');
const iv = Buffer.from(ivHex, 'hex');


initializeApp(firebaseConfig);

let decrypted = JSON.parse(decrypt(serviceAccount.encryptedData))
admin.initializeApp({
  credential: admin.credential.cert(decrypted),
  
});


  module.exports = admin;