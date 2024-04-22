import { GoogleGenerativeAI } from "@google/generative-ai";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(request) {
  const session = await getServerSession(request);

  if (!session) {
    return NextResponse.json({ message: "Please log in" }, { status: 401 });
  }

  const data = await request.formData();
  const imageType = data.get("image").type || "";
  const ImageRequestFile = data.get("image");

  let imageExtension = imageType.split("/");
  imageExtension = imageExtension[1];

  if (
    imageExtension != "webp" &&
    imageExtension != "jpeg" &&
    imageExtension != "png" &&
    imageExtension != "jpg"
  ) {
    return NextResponse.json(
      {
        message:
          "Invalid image extension. Please upload an image with .webp, .jpeg, .png, or .jpg extension.",
      },
      { status: 500 }
    );
  }

  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI);

  async function blobToGenerativePart(blob, mimeType) {
    const arrayBuffer = await blob.arrayBuffer();
    return {
      inlineData: {
        data: Buffer.from(arrayBuffer).toString("base64"),
        mimeType,
      },
    };
  }

  // For text-and-image input (multimodal), use the gemini-pro-vision model
  const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

  const prompt =
    "Provide me a description of this image: Describe it in a beautifully way and make me feel the love";
  
    const imageParts = [await blobToGenerativePart(ImageRequestFile, imageType)];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();

  return NextResponse.json({ message: text }, { status: 200 });
}
