// Right now, it is not integrated to frontend
export const encryptRailFence = (plaintext: string, rails: number): string => {
  const fence: string[][] = Array.from({ length: rails }, () => []);
  let railIndex = 0;
  let direction = 1;

  for (let char of plaintext) {
    fence[railIndex].push(char);
    railIndex += direction;

    if (railIndex === 0 || railIndex === rails - 1) {
      direction *= -1;
    }
  }

  const ciphertext = fence.flat().join("");
  return ciphertext;
};

export const decryptRailFence = (ciphertext: string, rails: number): string => {
  const fence: string[][] = Array.from({ length: rails }, () => []);
  let railIndex = 0;
  let direction = 1;

  for (let i = 0; i < ciphertext.length; i++) {
    fence[railIndex].push("X");
    railIndex += direction;

    if (railIndex === 0 || railIndex === rails - 1) {
      direction *= -1;
    }
  }

  let charIndex = 0;
  for (let i = 0; i < rails; i++) {
    for (let j = 0; j < fence[i].length; j++) {
      fence[i][j] = ciphertext[charIndex];
      charIndex++;
    }
  }

  const decryptedText = fence.flat().join("");
  return decryptedText;
};

const plaintext = "HELLOWORLD";
const rails = 3;

const ciphertext = encryptRailFence(plaintext, rails);
console.log("Ciphertext:", ciphertext);

const decryptedText = decryptRailFence(ciphertext, rails);
console.log("Decrypted Text:", decryptedText);
