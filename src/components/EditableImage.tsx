import React, { useState } from 'react';

interface EditableImageProps {
  src: string;
  alt: string;
  className?: string;
  isEditing: boolean;
  onImageChange?: (newSrc: string) => void;
}

export const EditableImage: React.FC<EditableImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  isEditing, 
  onImageChange 
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isEditingImage, setIsEditingImage] = useState(false);

  const handleImageClick = () => {
    if (isEditing) {
      const newSrc = prompt('Enter new image URL:', imageSrc);
      if (newSrc && newSrc !== imageSrc) {
        setImageSrc(newSrc);
        if (onImageChange) {
          onImageChange(newSrc);
        }
      }
    }
  };

  return (
    <div className={`relative inline-block ${isEditing ? 'group' : ''}`}>
      <img 
        src={imageSrc} 
        alt={alt} 
        className={`${className} ${isEditing ? 'cursor-pointer hover:outline hover:outline-2 hover:outline-blue-400 hover:outline-dashed transition-all duration-200 hover:opacity-90' : ''}`}
        onClick={handleImageClick}
        title={isEditing ? "Click to edit image URL" : undefined}
      />
      {isEditing && (
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          🖼️ Edit
        </div>
      )}
    </div>
  );
};