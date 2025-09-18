import { useState, useRef } from 'react';
import { Upload, Camera, X, Check } from 'lucide-react';

const ImageUpload = ({ currentImage, onImageSelect, className = "" }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(currentImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    console.log('File selected:', file);
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('Invalid file type:', file.type);
      alert('Please select an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      console.error('File too large:', file.size);
      alert('File size must be less than 5MB');
      return;
    }

    console.log('File validation passed, processing...');
    setIsUploading(true);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      console.log('FileReader loaded successfully');
      const result = e.target.result;
      setPreview(result);
      setIsUploading(false);
      console.log('Calling onImageSelect with:', { file, result });
      onImageSelect && onImageSelect(file, result);
    };
    reader.onerror = (e) => {
      console.error('FileReader error:', e);
      setIsUploading(false);
      alert('Error reading file');
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreview(null);
    onImageSelect && onImageSelect(null, null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative group">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20 shadow-lg">
            <img
              src={preview}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Overlay with actions */}
          <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div className="flex gap-2">
              <button
                onClick={openFileDialog}
                className="btn btn-sm btn-circle bg-primary text-primary-content hover:bg-primary/80"
                title="Change image"
              >
                <Camera className="w-4 h-4" />
              </button>
              <button
                onClick={removeImage}
                className="btn btn-sm btn-circle bg-error text-error-content hover:bg-error/80"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {isUploading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <span className="loading loading-spinner loading-md text-primary"></span>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`w-32 h-32 rounded-full border-2 border-dashed transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
            dragActive
              ? 'border-primary bg-primary/10 scale-105'
              : 'border-base-300 hover:border-primary hover:bg-base-200'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={openFileDialog}
        >
          {isUploading ? (
            <span className="loading loading-spinner loading-md text-primary"></span>
          ) : (
            <>
              <Upload className="w-8 h-8 text-base-content/60 mb-2" />
              <span className="text-sm text-base-content/60 text-center px-2">
                Click or drag image
              </span>
            </>
          )}
        </div>
      )}

      {/* File format info */}
      <div className="mt-2 text-xs text-base-content/60 text-center">
        JPG, PNG, GIF up to 5MB
      </div>
    </div>
  );
};

export default ImageUpload;
