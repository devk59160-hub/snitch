import ImageKit from '@imagekit/nodejs';
import { Config } from "../config/config.js";

let client = null;
try {
  client = new ImageKit({
    privateKey: Config.IMAGE_KIT
  });
} catch (e) {
  console.log("ImageKit init error:", e.message);
}

export async function uploadFile({ buffer, filename, fileName, folder = "flipkart" }) {
  const name = filename || fileName || "product_image.jpg";
  try {
    if (client && client.files && buffer) {
      const result = await client.files.upload({
        file: buffer,
        fileName: name,
        folder
      });
      return result;
    }
  } catch (error) {
    console.error("ImageKit upload error:", error.message);
  }

  // Graceful fallback so product creation succeeds even offline or without imagekit credentials
  const base64 = buffer ? buffer.toString("base64") : "";
  return {
    url: base64 ? `data:image/jpeg;base64,${base64}` : "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80",
    fileId: "local_" + Date.now()
  };
}