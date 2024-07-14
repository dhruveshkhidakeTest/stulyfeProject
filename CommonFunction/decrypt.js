const crypto = require('crypto');

const key = Buffer.from('12345678901234567890123456789012', 'utf8'); // 32 bytes key for AES-256
const iv = Buffer.from('1234567890123456', 'utf8'); // 16 bytes IV


function encrypt(text) {
  let cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decrypt(text) {
  let decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(text, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}





module.exports = {decrypt}