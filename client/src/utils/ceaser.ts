export const encryptCaesarCipher = (
  plainText: string,
  key: string,
  setEncryptedText: any
) => {
  const plaintextUpperCase = plainText.toUpperCase();
  let result = "";

  let keyAsciiSum = 0;
  for (const c of key) {
    const asciiCode = c.charCodeAt(0);
    keyAsciiSum += asciiCode;
  }

  let calculatedKey = keyAsciiSum % 25;

  for (let i = 0; i < plaintextUpperCase.length; i++) {
    let char = plaintextUpperCase[i];

    if (char.match(/[A-Z]/)) {
      const asciiCode = char.charCodeAt(0);
      const shiftedCode =
        ((((asciiCode - 65 + calculatedKey) % 26) + 26) % 26) + 65;
      char = String.fromCharCode(shiftedCode);
    }

    result += char;
  }

  setEncryptedText(result);
};

export const decryptCaesarCipher = (
  encryptedText: string,
  key: string,
  setDecryptedText: any
) => {
  const encryptedTextUpperCase = encryptedText.toUpperCase();
  let result = "";

  let keyAsciiSum = 0;
  for (const c of key) {
    const asciiCode = c.charCodeAt(0);
    keyAsciiSum += asciiCode;
  }

  let calculatedKey = keyAsciiSum % 25;

  for (let i = 0; i < encryptedTextUpperCase.length; i++) {
    let char = encryptedTextUpperCase[i];

    if (char.match(/[A-Z]/)) {
      const asciiCode = char.charCodeAt(0);
      const shiftedCode =
        ((((asciiCode - 65 - calculatedKey) % 26) + 26) % 26) + 65;
      char = String.fromCharCode(shiftedCode);
    }

    result += char;
  }

  setDecryptedText(result);
};
