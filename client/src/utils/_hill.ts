// Function to convert a letter to a number (A=0, B=1, ..., Z=25)
const letterToNumber = (letter: string): number => letter.charCodeAt(0) - 'A'.charCodeAt(0);

// Function to convert a number to a letter (0=A, 1=B, ..., 25=Z)
const numberToLetter = (number: number): string => String.fromCharCode((number + 26) % 26 + 'A'.charCodeAt(0));

// Function to calculate the modular inverse of a number
const modInverse = (a: number, m: number): number | null => {
  for (let i = 1; i < m; i++) {
    if ((a * i) % m === 1) {
      return i;
    }
  }
  return null; // No modular inverse exists
};

// Function to calculate the determinant of a 2x2 matrix
const determinant2x2 = (matrix: number[][]): number => matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

// Function to calculate the inverse of a 2x2 matrix (mod 26)
const inverse2x2 = (matrix: number[][]): number[][] | null => {
  const det = determinant2x2(matrix);
  const invDet = modInverse(det, 26);

  if (invDet !== null) {
    return [
      [(matrix[1][1] * invDet) % 26, (-matrix[0][1] * invDet) % 26],
      [(-matrix[1][0] * invDet) % 26, (matrix[0][0] * invDet) % 26],
    ];
  }

  return null; // No inverse exists
};

// Function to encrypt using Hill Cipher
export const encryptHillCipher = (plaintext: string, keyMatrix: number[][]): string => {
  const n = keyMatrix.length;
  const plaintextBlocks: string[] = [];
  for (let i = 0; i < plaintext.length; i += n) {
    plaintextBlocks.push(plaintext.slice(i, i + n));
  }

  const ciphertextBlocks: string[] = plaintextBlocks.map((block) => {
    const numericalVector: number[] = block.split('').map(letterToNumber);
    const resultVector: number[] = keyMatrix.map((row) =>
      row.reduce((acc, val, idx) => acc + val * numericalVector[idx], 0) % 26
    );
    return resultVector.map(numberToLetter).join('');
  });

  return ciphertextBlocks.join('');
};

// Function to decrypt using Hill Cipher
export const decryptHillCipher = (ciphertext: string, keyMatrix: number[][]): string | null => {
  const n = keyMatrix.length;
  const keyMatrixInverse = inverse2x2(keyMatrix);

  if (keyMatrixInverse === null) {
    console.error('Invalid key matrix. No modular inverse exists.');
    return null;
  }

  const ciphertextBlocks: string[] = [];
  for (let i = 0; i < ciphertext.length; i += n) {
    ciphertextBlocks.push(ciphertext.slice(i, i + n));
  }

  const plaintextBlocks: string[] = ciphertextBlocks.map((block) => {
    const numericalVector: number[] = block.split('').map(letterToNumber);
    const resultVector: number[] = keyMatrixInverse.map((row) =>
      row.reduce((acc, val, idx) => acc + val * numericalVector[idx], 0) % 26
    );
    return resultVector.map(numberToLetter).join('');
  });

  return plaintextBlocks.join('');
};

// Example key matrix (2x2)
const keyMatrix: number[][] = [
  [6, 24],
  [13, 16],
];

// Example plaintext
const plaintext: string = 'HELLO';

// Encryption
const ciphertext: string = encryptHillCipher(plaintext, keyMatrix);
console.log('Ciphertext:', ciphertext);

// Decryption
const decryptedText: string | null = decryptHillCipher(ciphertext, keyMatrix);
console.log('Decrypted Text:', decryptedText);
