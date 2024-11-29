const crypto = require('crypto');

/**
 * Encrypts the provided plaintext using AES-128-ECB.
 * @param {string} plainText - The text to encrypt.
 * @param {string} key - The encryption key (must be 16 bytes long).
 * @returns {string} The encrypted text in base64 format.
 */
function encryptText(plainText, key) {
  if (key.length !== 16) {
    throw new Error('Key must be 16 bytes long');
  }

  const cipher = crypto.createCipheriv('aes-128-ecb', key, null);
  let encrypted = cipher.update(plainText, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

/**
 * Decrypts the provided encrypted text using AES-128-ECB.
 * @param {string} encryptedText - The base64-encoded encrypted text.
 * @param {string} key - The decryption key (must be 16 bytes long).
 * @returns {string} The decrypted plain text.
 */
function decryptText(encryptedText, key) {
  if (key.length !== 16) {
    throw new Error('Key must be 16 bytes long');
  }

  const decipher = crypto.createDecipheriv('aes-128-ecb', key, null);
  let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = {
  encryptText,
  decryptText
};