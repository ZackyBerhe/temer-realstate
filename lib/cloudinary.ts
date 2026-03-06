export async function uploadImage(file: File): Promise<string> {
  try {
    console.log("Starting upload for file:", file.name);
    
    // Create a FormData object for the upload
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'property_images');
    formData.append('folder', 'temer-properties');

    console.log("Uploading to Cloudinary...");
    
    // Upload to Cloudinary using unsigned upload
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/dwarz2fpd/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    console.log("Cloudinary response status:", response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Cloudinary error:", errorText);
      throw new Error(`Upload failed: ${errorText}`);
    }

    const data = await response.json();
    console.log("Upload successful, URL:", data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function uploadMultipleImages(files: File[]): Promise<string[]> {
  const uploadPromises = files.map(file => uploadImage(file));
  return Promise.all(uploadPromises);
}
