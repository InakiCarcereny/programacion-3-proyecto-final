import { v2 as cloudinary } from "cloudinary";

export async function uploadImage(
  fileBuffer: Buffer,
  folder: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder }, (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Error uploading image to Cloudinary"));
          return;
        }
        resolve(result.secure_url);
      })
      .end(fileBuffer);
  });
}
