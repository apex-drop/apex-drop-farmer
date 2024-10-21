import CryptoJS from "crypto-js";

const SECRET_PHRASE = __ENCRYPTION_KEY__;

export function encryptData(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_PHRASE).toString();
}

export function decryptData(cipher) {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_PHRASE).toString(
    CryptoJS.enc.Utf8
  );

  return JSON.parse(bytes);
}
