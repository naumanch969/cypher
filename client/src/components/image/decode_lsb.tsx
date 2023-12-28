import React, { useState, useRef } from "react";

const ImageSteganographyDecoder = () => {
  const [decodedMessage, setDecodedMessage] = useState("");
  const [decodedImage, setDecodedImage] = useState(null);

  const inputRef = useRef(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onload = () => {
        setDecodedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const decodeMessage = () => {
    if (!decodedImage) {
      return;
    }

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;

      const context: any = canvas.getContext("2d");
      context.drawImage(img, 0, 0);

      const imageData = context.getImageData(0, 0, img.width, img.height);
      const pixels = imageData.data;

      let binaryMessage = "";

      for (let i = 0; i < pixels.length; i += 4) {
        for (let j = 0; j < 3; j++) {
          binaryMessage += (pixels[i + j] & 1).toString(); // Extract the LSB
        }
      }

      let decodedMessage = "";

      for (let i = 0; i < binaryMessage.length; i += 8) {
        const binaryChar = binaryMessage.substr(i, 8);
        const charCode = parseInt(binaryChar, 2);
        decodedMessage += String.fromCharCode(charCode);
      }

      setDecodedMessage(decodedMessage);
    };

    img.src = decodedImage;
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-full">
      <div className="flex flex-col gap-2">
        <label className="font-medium">Choose an image to decode:</label>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <br />
      <button
        className="border border-gray-600 bg-gray-200 px-4 py-2 rounded-md"
        onClick={decodeMessage}
      >
        Decode Message
      </button>
      <br />
      {decodedMessage && (
        <div>
          <strong>Decoded Message:</strong> {decodedMessage}
        </div>
      )}
    </div>
  );
};

export default ImageSteganographyDecoder;
