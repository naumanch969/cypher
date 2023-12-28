import React, { useState, useRef } from "react";

const ImageSteganography = () => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState(null);
  const [encodedImage, setEncodedImage] = useState<string>("");

  const inputRef = useRef(null);

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader: any = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const encodeMessage = () => {
    if (!image || !message) {
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

      for (let i = 0; i < message.length; i++) {
        const charCode = message.charCodeAt(i);
        const binaryChar = charCode.toString(2).padStart(8, "0");
        binaryMessage += binaryChar;
      }

      let binaryIndex = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        for (let j = 0; j < 3; j++) {
          if (binaryIndex < binaryMessage.length) {
            pixels[i + j] &= 0b11111110; // Clear the LSB
            pixels[i + j] |= parseInt(binaryMessage[binaryIndex], 2); // Set the LSB
            binaryIndex++;
          }
        }
      }

      context.putImageData(imageData, 0, 0);
      setEncodedImage(canvas.toDataURL("image/png"));
    };

    img.src = image;
  };

  return (
    <div className="w-full flex flex-col justify-center items-center h-full">
      <div className="flex flex-col gap-2">
        <label className="font-medium">Choose an image:</label>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </div>
      <br />
      <div className="flex flex-col gap-2">
        <label className="font-medium">Enter message to hide:</label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <br />
      <button
        className="border border-gray-600 bg-gray-200 px-4 py-2 rounded-md"
        onClick={encodeMessage}
      >
        Encode Message
      </button>
      <br />
      {encodedImage && (
        <div>
          <strong>Encoded Image:</strong>
          <img src={encodedImage} alt="Encoded" />
        </div>
      )}
    </div>
  );
};

export default ImageSteganography;
