export const uploadImageToCloudinary = async (image: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "ml_default"); 

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;

  if (!cloudName) {
    throw new Error("Cloudinary name is not defined in environment variables");
  }

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  const data = await response.json();
  return data.secure_url;
};
