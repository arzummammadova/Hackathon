

// And now update the EditBackground component
import React, { useState } from 'react';
import { Upload } from 'lucide-react';

const EditBackground = ({ open, onClose, onSelectBackground }) => {
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [customUrl, setCustomUrl] = useState('');

  if (!open) return null;

  // 8 default background options with gradients and solid colors
  const defaultBackgrounds = [
    { id: 1, style: 'bg-gradient-to-r from-[#4BA3FF] to-[#2D639B]' },
    { id: 2, style: 'bg-[#4BA3FF]' },
    { id: 3, style: 'bg-[#2D639B]' },
    { id: 4, style: 'bg-gradient-to-br from-blue-400 to-indigo-600' },
    { id: 5, style: 'bg-gradient-to-r from-cyan-500 to-blue-500' },
    { id: 6, style: 'bg-gradient-to-r from-sky-400 to-blue-800' },
    { id: 7, style: 'bg-gradient-to-tr from-indigo-500 via-purple-500 to-[#4BA3FF]' },
    { id: 8, style: 'bg-gradient-to-r from-[#2D639B] via-blue-600 to-[#4BA3FF]' }
  ];

  const handleSave = () => {
    if (selectedBackground === 'custom' && customUrl) {
      // For custom URL backgrounds, we need to create a style with the background image
      onSelectBackground(`bg-cover bg-center bg-no-repeat`);
      // In a real implementation, you would also store the URL somewhere
      console.log('Custom URL selected:', customUrl);
    } else if (typeof selectedBackground === 'number') {
      // Get the style of the selected background from our array
      const selected = defaultBackgrounds.find(bg => bg.id === selectedBackground);
      if (selected) {
        onSelectBackground(selected.style);
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="text-xl font-semibold mb-6 text-[#2D639B]">Arxa fonu redaktə et</h2>
        
        <div className="space-y-6">
          {/* Default background options */}
          <div>
            <h3 className="text-[#4BA3FF] font-medium mb-3">Default arxa fonlar</h3>
            <div className="grid grid-cols-4 gap-3">
              {defaultBackgrounds.map(bg => (
                <button
                  key={bg.id}
                  className={`w-full aspect-square rounded-lg ${bg.style} overflow-hidden transition transform hover:scale-105 ${
                    selectedBackground === bg.id ? 'ring-4 ring-[#4BA3FF] ring-opacity-70' : ''
                  }`}
                  onClick={() => setSelectedBackground(bg.id)}
                  aria-label={`Background option ${bg.id}`}
                />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Custom URL input */}
          <div>
            <h3 className="text-[#4BA3FF] font-medium mb-2">Öz arxa fonunuzu daxil edin</h3>
            <div className="relative">
              <input
                type="text"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://example.com/background.jpg"
                className="w-full rounded-lg border border-gray-300 p-3 focus:ring-[#4BA3FF] focus:border-[#4BA3FF] pr-24"
              />
              {customUrl && (
                <button 
                  className="absolute right-2 top-2 px-3 py-1 bg-[#4BA3FF] text-white text-sm rounded-md hover:bg-[#2D639B]"
                  onClick={() => setSelectedBackground('custom')}
                >
                  Seç
                </button>
              )}
            </div>
          </div>

          {/* Image upload section */}
          <div>
            <h3 className="text-[#4BA3FF] font-medium mb-2">Şəkil yüklə</h3>
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#4BA3FF] cursor-pointer bg-gray-50 transition-colors">
              <div className="flex flex-col items-center p-4">
                <Upload size={28} className="text-[#2D639B] mb-2" />
                <span className="text-sm text-gray-600 text-center">Şəkil faylı seçin və ya buraya sürükləyin</span>
                <span className="text-xs text-gray-500 mt-1">PNG, JPG, GIF (maks. 10MB)</span>
              </div>
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    // Handle file upload - in a real implementation you would upload to a server
                    // and get back a URL, but for now we'll just select it
                    setSelectedBackground('upload');
                  }
                }}
              />
            </label>
          </div>

          {/* Save button */}
          <button 
            onClick={handleSave}
            className="w-full bg-gradient-to-r from-[#4BA3FF] to-[#2D639B] hover:from-[#2D639B] hover:to-[#4BA3FF] text-white py-3 rounded-lg transition font-medium shadow-md"
          >
            Yadda saxla
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBackground;