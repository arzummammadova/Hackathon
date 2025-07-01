import React, { useState } from 'react';
import { X, Upload, Trash2 } from 'lucide-react';
import axios from 'axios'; // Make sure axios is installed

const AddProfileImage = ({ open, onClose, onSave,user }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG, etc.)');
      return;
    }
    
    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }
    
    setError('');
    setSelectedFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };
 
  const handleSave = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    try {
      setIsLoading(true);
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('You need to be logged in to upload an avatar');
        setIsLoading(false);
        return;
      }

      // Create FormData object to send the file
      const formData = new FormData();
      formData.append('avatar', selectedFile);

      // Send the request to your API
      const response = await axios.post(
        'http://localhost:5000/api/profile/avatar', 
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // On success
      if (response.data.success) {
        // Pass the avatar URL back to the parent component
        // Ensure the URL includes the server domain if the path is relative
        const avatarUrl = response.data.avatar.startsWith('http') 
          ? response.data.avatar 
          : `${response.data.avatar}`;
          
        onSave(avatarUrl);
        onClose();
      }
    } catch (err) {
      console.error('Error uploading avatar:', err);
      setError(err.response?.data?.message || 'Failed to upload avatar');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveImage = async () => {
      setIsLoading(true);

    try {
      const response = await axios.delete('http://localhost:5000/api/profile/deleteavatar',formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      console.log("Image deleted:", response.data);
      // Burada istəsən əlavə əməliyyatlar (məsələn, state yeniləmə) edə bilərsən
    } catch (error) {
      console.error("Failed to delete image:", error);
    }
  };
  


  return (
    <div className="top-0 left-50 w-[500px] absolute h-[14vh] inset-0 bg-opacity-50 flex items-center justify-center z-9000 p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Update Profile Image</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        
        {!previewImage ? (
          <div 
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload size={48} className="mx-auto mb-4 text-gray-400" />
            <p className="mb-2 text-gray-700">Drag and drop an image here, or</p>
            <label className="cursor-pointer">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 inline-block">
                Browse Files
              </span>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleFileInputChange}
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">PNG, JPG or GIF (max. 5MB)</p>
          </div>
        ) : (
          <div className="mb-4">
            <div className="relative w-40 h-40 mx-auto">
              <img 
                src={previewImage} 
                alt="Preview" 
                className="w-40 h-40 rounded-full object-cover"
              />
              <button 
                onClick={handleRemoveImage}
                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        )}
        
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
        
        <div className="flex justify-end mt-6 space-x-2">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            disabled={!previewImage || isLoading}
          >
            {isLoading ? 'Uploading...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProfileImage;