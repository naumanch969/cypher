// Right now, it is not integrated to frontend

const letterToNumber = (letter: string): number => letter.charCodeAt(0) - 'A'.charCodeAt(0);
const numberToLetter = (number: number): string => String.fromCharCode((number + 26) % 26 + 'A'.charCodeAt(0));
const determinant2x2 = (matrix: number[][]): number => matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

const modInverse = (a: number, m: number): number | null => {
  for (let i = 1; i < m; i++) {
    if ((a * i) % m === 1) {
      return i;
    }
  }
  return null; 
};




const inverse2x2 = (matrix: number[][]): number[][] | null => {
  const det = determinant2x2(matrix);
  const invDet = modInverse(det, 26);

  if (invDet !== null) {
    return [
      [(matrix[1][1] * invDet) % 26, (-matrix[0][1] * invDet) % 26],
      [(-matrix[1][0] * invDet) % 26, (matrix[0][0] * invDet) % 26],
    ];
  }

  return null; 
};


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


const keyMatrix: number[][] = [
  [6, 24],
  [13, 16],
];
const plaintext: string = 'HELLO';
const ciphertext: string = encryptHillCipher(plaintext, keyMatrix);
console.log('Ciphertext:', ciphertext);
const decryptedText: string | null = decryptHillCipher(ciphertext, keyMatrix);
console.log('Decrypted Text:', decryptedText);