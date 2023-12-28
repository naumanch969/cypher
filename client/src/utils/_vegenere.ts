export const encryptVigenere = (plaintext: string, keyword: string): string => {
    const repeatedKeyword = repeatKeyword(plaintext, keyword);
    let ciphertext = "";
  
    for (let i = 0; i < plaintext.length; i++) {
      const char = plaintext[i];
      const shift = char.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
      const encryptedChar = shiftCharacter(char, shift);
      ciphertext += encryptedChar;
    }
  
    return ciphertext;
  };
  
  export const decryptVigenere = (ciphertext: string, keyword: string): string => {
    const repeatedKeyword = repeatKeyword(ciphertext, keyword);
    let plaintext = "";
  
    for (let i = 0; i < ciphertext.length; i++) {
      const char = ciphertext[i];
      const shift = char.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
      const decryptedChar = shiftCharacter(char, -shift);
      plaintext += decryptedChar;
    }
  
    return plaintext;
  };
  
  const repeatKeyword = (text: string, keyword: string): string => {
    const repeatedKeyword = [];
    let keywordIndex = 0;
  
    for (let i = 0; i < text.length; i++) {
      if (text[i].match(/[A-Za-z]/)) {
        repeatedKeyword.push(keyword[keywordIndex % keyword.length].toUpperCase());
        keywordIndex++;
      } else {
        repeatedKeyword.push(text[i]);
      }
    }
  
    return repeatedKeyword.join('');
  };
  
  const shiftCharacter = (char: string, shift: number): string => {
    const isUpperCase = char === char.toUpperCase();
    const baseCharCode = isUpperCase ? 'A'.charCodeAt(0) : 'a'.charCodeAt(0);
    const charCode = char.charCodeAt(0);
    const shiftedCharCode = (charCode - baseCharCode + shift + 26) % 26 + baseCharCode;
    return String.fromCharCode(shiftedCharCode);
  };
  
  // Example usage
  const plaintext = "HELLO";
  const keyword = "KEY";
  
  // Encryption
  const ciphertext = encryptVigenere(plaintext, keyword);
  console.log("Ciphertext:", ciphertext);
  
  // Decryption
  const decryptedText = decryptVigenere(ciphertext, keyword);
  console.log("Decrypted Text:", decryptedText);
  