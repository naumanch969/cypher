export const encryptColumnarTransposition = (plaintext: string, key: string): string => {
    const keyOrder = getKeyOrder(key);
    const numRows = Math.ceil(plaintext.length / key.length);
    const matrix: string[][] = [];
  
    // Fill the matrix with the plaintext
    for (let i = 0; i < numRows; i++) {
      matrix.push(plaintext.slice(i * key.length, (i + 1) * key.length).split(''));
    }
  
    // Rearrange the columns according to the key
    const ciphertext = keyOrder.map(col => matrix.map(row => row[col]).join('')).join('');
  
    return ciphertext;
  };
  
  export const decryptColumnarTransposition = (ciphertext: string, key: string): string => {
    const keyOrder = getKeyOrder(key);
    const numRows = Math.ceil(ciphertext.length / key.length);
    const matrix: string[][] = [];
  
    // Fill the matrix with the ciphertext
    for (let i = 0; i < numRows; i++) {
      matrix.push(ciphertext.slice(i * key.length, (i + 1) * key.length).split(''));
    }
  
    // Rearrange the columns back to the original order
    const originalText = keyOrder.map(col => matrix.map(row => row[col]).join('')).join('');
  
    return originalText;
  };
  
  const getKeyOrder = (key: string): number[] => {
    // Create an array of indices (0 to key.length - 1) and sort them based on the characters in the key
    return Array.from({ length: key.length }, (_, i) => i).sort((a, b) => key.charCodeAt(a) - key.charCodeAt(b));
  };
  
  // Example usage
  const plaintext = "COLUMNARTRANSPOSITION";
  const key = "KEY";
  
  // Encryption
  const ciphertext = encryptColumnarTransposition(plaintext, key);
  console.log("Ciphertext:", ciphertext);
  
  // Decryption
  const decryptedText = decryptColumnarTransposition(ciphertext, key);
  console.log("Decrypted Text:", decryptedText);
  