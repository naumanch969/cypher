// Right now, it is not integrated to frontend
export const encryptColumnarTransposition = (
  plaintext: string,
  key: string
): string => {
  const keyOrder = getKeyOrder(key);
  const numRows = Math.ceil(plaintext.length / key.length);
  const matrix: string[][] = [];

  for (let i = 0; i < numRows; i++) {
    matrix.push(
      plaintext.slice(i * key.length, (i + 1) * key.length).split("")
    );
  }

  const ciphertext = keyOrder
    .map((col) => matrix.map((row) => row[col]).join(""))
    .join("");

  return ciphertext;
};

export const decryptColumnarTransposition = (
  ciphertext: string,
  key: string
): string => {
  const keyOrder = getKeyOrder(key);
  const numRows = Math.ceil(ciphertext.length / key.length);
  const matrix: string[][] = [];

  for (let i = 0; i < numRows; i++) {
    matrix.push(
      ciphertext.slice(i * key.length, (i + 1) * key.length).split("")
    );
  }

  const originalText = keyOrder
    .map((col) => matrix.map((row) => row[col]).join(""))
    .join("");

  return originalText;
};

const getKeyOrder = (key: string): number[] => {
  return Array.from({ length: key.length }, (_, i) => i).sort(
    (a, b) => key.charCodeAt(a) - key.charCodeAt(b)
  );
};

const plaintext = "COLUMNARTRANSPOSITION";
const key = "KEY";

const ciphertext = encryptColumnarTransposition(plaintext, key);
console.log("Ciphertext:", ciphertext);

const decryptedText = decryptColumnarTransposition(ciphertext, key);
console.log("Decrypted Text:", decryptedText);
