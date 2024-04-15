import { NextResponse } from "next/server";
import { File } from "formidable";
import fs from "fs";
import { pipeline } from "stream";
import { promisify } from "util";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request) {
  const data = await request.formData();
  const imageType = data.get("image").type || "";

  const ImageRequestFile = data.get("image");

  // Define the path where the image will be stored
  const imagePath = `./public/${ImageRequestFile.name}`;

  // Use pipeline to handle backpressure and errors
  await promisify(pipeline)(
    ImageRequestFile.stream(),
    fs.createWriteStream(imagePath)
  );

  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI);

  function fileToGenerativePart(path, mimeType) {
    return {
      inlineData: {
        data: Buffer.from(fs.readFileSync(path)).toString("base64"),
        mimeType,
      },
    };
  }

  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt =
    "Could you provide me with the correct prompt to generate this  image?, please be carefull whith the colors, the background, the perspective, the style, the quality, and be the more descriptive you can";

  const imageParts = [fileToGenerativePart(imagePath, imageType)];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();

  // Delete the image
  fs.unlink(imagePath, (err) => {
    if (err) {
      console.error("Error deleting the image:", err);
    } else {
      console.log("Image deleted successfully");
    }
  });
  
  return NextResponse.json({ message: text }, { status: 200 });
}
