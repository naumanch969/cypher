export const createPlayfairKeySquare = (key: string): string[][] => {
  const alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; // 'J' is usually combined with 'I'
  const keySquare: string[][] = [];

  // Fill the key square with unique letters from the key
  for (let char of key.toUpperCase()) {
    if (char === "J") char = "I"; // Replace 'J' with 'I'
    if (!keySquare.flat().includes(char) && alphabet.includes(char)) {
      keySquare.push([char]);
    }
  }

  // Fill the remaining cells with the remaining alphabet letters
  for (let char of alphabet) {
    if (!keySquare.flat().includes(char)) {
      keySquare.push([char]);
    }
  }

  // Convert the flat array into a 5x5 matrix
  return [
    keySquare.slice(0, 5).flat(),
    keySquare.slice(5, 10).flat(),
    keySquare.slice(10, 15).flat(),
    keySquare.slice(15, 20).flat(),
    keySquare.slice(20, 25).flat(),
  ];
};

export const encryptPlayfair = (plaintext: string, key: string): string => {
  const keySquare = createPlayfairKeySquare(key);
  const preparedText = prepareText(plaintext);
  let ciphertext = "";

  for (let i = 0; i < preparedText.length; i += 2) {
    const digraph = preparedText.slice(i, i + 2);
    const encryptedDigraph = encryptPlayfairDigraph(digraph, keySquare);
    ciphertext += encryptedDigraph;
  }

  return ciphertext;
};

export const decryptPlayfair = (ciphertext: string, key: string): string => {
  const keySquare = createPlayfairKeySquare(key);
  let plaintext = "";

  for (let i = 0; i < ciphertext.length; i += 2) {
    const digraph = ciphertext.slice(i, i + 2);
    const decryptedDigraph = decryptPlayfairDigraph(digraph, keySquare);
    plaintext += decryptedDigraph;
  }

  return plaintext;
};

const prepareText = (text: string): string => {
  const sanitizedText = text.toUpperCase().replace(/[^A-Z]/g, "");
  let preparedText = "";

  for (let i = 0; i < sanitizedText.length; i++) {
    preparedText += sanitizedText[i];
    if (
      i < sanitizedText.length - 1 &&
      sanitizedText[i] === sanitizedText[i + 1]
    ) {
      preparedText += "X";
    }
  }

  if (preparedText.length % 2 !== 0) {
    preparedText += "X";
  }

  return preparedText;
};

const encryptPlayfairDigraph = (
  digraph: string,
  keySquare: string[][]
): string => {
  const [x1, y1] = findPosition(digraph[0], keySquare);
  const [x2, y2] = findPosition(digraph[1], keySquare);

  if (x1 === x2) {
    return keySquare[x1][(y1 + 1) % 5] + keySquare[x2][(y2 + 1) % 5];
  } else if (y1 === y2) {
    return keySquare[(x1 + 1) % 5][y1] + keySquare[(x2 + 1) % 5][y2];
  } else {
    return keySquare[x1][y2] + keySquare[x2][y1];
  }
};

const decryptPlayfairDigraph = (
  digraph: string,
  keySquare: string[][]
): string => {
  const [x1, y1] = findPosition(digraph[0], keySquare);
  const [x2, y2] = findPosition(digraph[1], keySquare);

  if (x1 === x2) {
    return keySquare[x1][(y1 - 1 + 5) % 5] + keySquare[x2][(y2 - 1 + 5) % 5];
  } else if (y1 === y2) {
    return keySquare[(x1 - 1 + 5) % 5][y1] + keySquare[(x2 - 1 + 5) % 5][y2];
  } else {
    return keySquare[x1][y2] + keySquare[x2][y1];
  }
};

const findPosition = (
  letter: string,
  keySquare: string[][]
): [number, number] => {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      if (keySquare[i][j] === letter) {
        return [i, j];
      }
    }
  }
  throw new Error(`Letter not found in key square: ${letter}`);
};

// Example usage
const plaintext = "HELLO";
const key = "KEYWORD";

// Encryption
const ciphertext = encryptPlayfair(plaintext, key);
console.log("Ciphertext:", ciphertext);

// Decryption
const decryptedText = decryptPlayfair(ciphertext, key);
console.log("Decrypted Text:", decryptedText);
