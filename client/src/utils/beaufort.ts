 
export const encryptBeaufortCipher = (
    plainText: string,
    key: string,
    setEncryptedText: any
  ) => {
    const plainTextUpperCase = plainText.toUpperCase();
    const keyRepeated = key.toUpperCase().repeat(plainText.length);
    let result = "";
  
    for (let i = 0; i < plainTextUpperCase.length; i++) {
      const char = plainTextUpperCase[i];
  
      if (char.match(/[A-Z]/)) {
        const plainTextPos = char.charCodeAt(0) - 65;
        const keyPos = keyRepeated[i].charCodeAt(0) - 65;
        const encryptedPos = (keyPos - plainTextPos + 26) % 26;
        result += String.fromCharCode(encryptedPos + 65);
      } else {
        result += char;
      }
    }
  
    setEncryptedText(result);
  };
   
  export const decryptBeaufortCipher = (
    encryptedText: string,
    key: string,
    setDecryptedText: any
  ) => {
    const encryptedTextUpperCase = encryptedText.toUpperCase();
    const keyRepeated = key.toUpperCase().repeat(encryptedText.length);
    let result = "";
  
    for (let i = 0; i < encryptedTextUpperCase.length; i++) {
      const char = encryptedTextUpperCase[i];
  
      if (char.match(/[A-Z]/)) {
        const encryptedPos = char.charCodeAt(0) - 65;
        const keyPos = keyRepeated[i].charCodeAt(0) - 65;
        const decryptedPos = (keyPos - encryptedPos + 26) % 26;
        result += String.fromCharCode(decryptedPos + 65);
      } else {
        result += char;
      }
    }
  
    setDecryptedText(result);
  };
  