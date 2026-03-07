"use client";

import { useState, useEffect, useRef } from "react";
import { X, Upload, Image as ImageIcon, XCircle } from "lucide-react";
import {
  Property,
  CreatePropertyData,
  createProperty,
  updateProperty,
} from "@/lib/propertyService";
import { uploadMultipleImages } from "@/lib/cloudinary";

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  property?: Property | null;
  onSuccess: () => void;
}

export default function AddPropertyModal({
  isOpen,
  onClose,
  property,
  onSuccess,
}: AddPropertyModalProps) {
  const [formData, setFormData] = useState<CreatePropertyData>({
    title: "",
    location: "",
    price: 0,
    pricePerSqm: 0,
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    parking: 0,
    type: "Apartment",
    yearBuilt: new Date().getFullYear(),
    floor: 0,
    images: [],
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        location: property.location,
        price: property.price,
        pricePerSqm: property.pricePerSqm,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        area: property.area,
        parking: property.parking,
        type: property.type,
        yearBuilt: property.yearBuilt,
        floor: property.floor || 0,
        images: property.images,
        description: property.description,
      });
      setImagePreviewUrls(property.images);
    } else {
      setFormData({
        title: "",
        location: "",
        price: 0,
        pricePerSqm: 0,
        bedrooms: 0,
        bathrooms: 0,
        area: 0,
        parking: 0,
        type: "Apartment",
        yearBuilt: new Date().getFullYear(),
        floor: 0,
        images: [],
        description: "",
      });
      setImagePreviewUrls([]);
    }
    setUploadedFiles([]);
  }, [property, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      let finalImages = formData.images;

      // Upload new images if any
      if (uploadedFiles.length > 0) {
        setUploadingImages(true);
        const uploadedUrls = await uploadMultipleImages(uploadedFiles);
        finalImages = [...finalImages, ...uploadedUrls];
      }

      const finalFormData = { ...formData, images: finalImages };

      if (property) {
        await updateProperty(property.id, finalFormData);
      } else {
        await createProperty(finalFormData);
      }
      onSuccess();
      onClose();
    } catch (error: any) {
      setError(error.message || "Failed to save property");
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? 0 : Number(value)) : value,
    }));
  };

  const handleImageUrlsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const urls = e.target.value.split("\n").filter((url) => url.trim());
    setFormData((prev) => ({
      ...prev,
      images: urls,
    }));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadedFiles((prev) => [...prev, ...files]);

    // Create preview URLs for selected files
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviewUrls((prev) => [...prev, ...newPreviews]);
  };

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index);
    setUploadedFiles(newFiles);

    const newPreviews = imagePreviewUrls.filter((_, i) => i !== index);
    setImagePreviewUrls(newPreviews);
  };

  const removeImageUrl = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, images: newImages }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/5 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-card-foreground">
            {property ? "Edit Property" : "Add New Property"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">
                Price (ETB)
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">
                Price per m² (ETB)
              </label>
              <input
                type="number"
                name="pricePerSqm"
                value={formData.pricePerSqm}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">
                Bedrooms
              </label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">
                Bathrooms
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">
                Area (m²)
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">
                Parking
              </label>
              <input
                type="number"
                name="parking"
                value={formData.parking}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">
                Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="Apartment">Apartment</option>
                <option value="Condominium">Condominium</option>
                <option value="Townhouse">Townhouse</option>
                <option value="Villa">Villa</option>
                <option value="Duplex">Duplex</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">
                Year Built
              </label>
              <input
                type="number"
                name="yearBuilt"
                value={formData.yearBuilt}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-1">
                Floor
              </label>
              <input
                type="number"
                name="floor"
                value={formData.floor}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-3">
              Property Images
            </label>

            {/* File Upload Section */}
            <div className="border-2 border-dashed border-border rounded-lg p-4 mb-4">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 w-full py-3 border border-border rounded-lg hover:bg-accent transition-colors"
              >
                <Upload className="w-4 h-4" />
                Upload Images
              </button>
            </div>

            {/* Image Previews */}
            {(imagePreviewUrls.length > 0 || formData.images.length > 0) && (
              <div className="space-y-4">
                {/* New uploaded files preview */}
                {uploadedFiles.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      New Images to Upload:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <XCircle className="w-3 h-3" />
                          </button>
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {file.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Existing images */}
                {formData.images.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Existing Images:
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {formData.images.map((url, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={url}
                              alt={`Property image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImageUrl(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <XCircle className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Manual URL input (fallback) */}
            <div className="mt-4">
              <label className="block text-sm text-muted-foreground mb-1">
                Or add image URLs manually (one per line):
              </label>
              <textarea
                value={formData.images.join("\n")}
                onChange={handleImageUrlsChange}
                rows={3}
                placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
                className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading || uploadingImages}
              className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {loading || uploadingImages
                ? uploadingImages
                  ? "Uploading Images..."
                  : "Saving..."
                : property
                  ? "Update Property"
                  : "Add Property"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-border rounded-lg font-medium hover:bg-accent transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
