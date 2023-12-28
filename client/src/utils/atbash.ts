// Function to encrypt using Atbash Cipher
export const encryptAtbashCipher = (
  plainText: string,
  setEncryptedText: any
) => {
  const plainTextUpperCase = plainText.toUpperCase();
  let result = "";

  for (let i = 0; i < plainText.length; i++) {
    const char = plainTextUpperCase[i];

    if (char.match(/[A-Z]/)) {
      const asciiCode = char.charCodeAt(0);
      const mirroredCode = 90 - (asciiCode - 65);
      result += String.fromCharCode(mirroredCode);
    } else {
      result += char;
    }
  }

  setEncryptedText(result);
};

// Function to decrypt using Atbash Cipher
export const decryptAtbashCipher = (
  encryptedText: string,
  setDecryptedText: any
) => {
  const encryptedTextUpperCase = encryptedText.toUpperCase();
  let result = "";

  for (let i = 0; i < encryptedText.length; i++) {
    const char = encryptedTextUpperCase[i];

    if (char.match(/[A-Z]/)) {
      const asciiCode = char.charCodeAt(0);
      const mirroredCode = 90 - (asciiCode - 65);
      result += String.fromCharCode(mirroredCode);
    } else {
      result += char;
    }
  }

  setDecryptedText(result);
};
