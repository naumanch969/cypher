 
export const encryptAutokeyCipher = (
    plainText: string,
    key: string,
    setEncryptedText: any
  ) => {
    const plainTextUpperCase = plainText.toUpperCase();
    const keyExtended = (key + plainText).toUpperCase();
    let result = "";
  
    for (let i = 0; i < plainText.length; i++) {
      const char = plainTextUpperCase[i];
  
      if (char.match(/[A-Z]/)) {
        const plainTextPos = char.charCodeAt(0) - 65;
        const keyPos = keyExtended[i].charCodeAt(0) - 65;
        const encryptedPos = (plainTextPos + keyPos) % 26;
        result += String.fromCharCode(encryptedPos + 65);
      } else {
        result += char;
      }
    }
  
    setEncryptedText(result);
  };
   
  export const decryptAutokeyCipher = (
    encryptedText: string,
    key: string,
    setDecryptedText: any
  ) => {
    const encryptedTextUpperCase = encryptedText.toUpperCase();
    const keyExtended = (key + " " + encryptedText).toUpperCase();
    let result = "";
  
    for (let i = 0; i < encryptedText.length; i++) {
      const char = encryptedTextUpperCase[i];
  
      if (char.match(/[A-Z]/)) {
        const encryptedPos = char.charCodeAt(0) - 65;
        const keyPos = keyExtended[i].charCodeAt(0) - 65;
        const decryptedPos = (encryptedPos - keyPos + 26) % 26;
        result += String.fromCharCode(decryptedPos + 65);
      } else {
        result += char;
      }
    }
  
    setDecryptedText(result);
  };
  