import React, { useState, useRef, useEffect } from 'react';

interface EditableTextProps {
  children: React.ReactNode;
  isEditing: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  onSave?: (newText: string) => void;
}

export const EditableText: React.FC<EditableTextProps> = ({ 
  children, 
  isEditing, 
  className = '', 
  as: Component = 'div',
  onSave 
}) => {
  const [text, setText] = useState(typeof children === 'string' ? children : '');
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (typeof children === 'string') {
      setText(children);
    }
  }, [children]);

  const handleClick = () => {
    if (isEditing) {
      setIsEditable(true);
    }
  };

  const handleBlur = () => {
    setIsEditable(false);
    if (onSave && text !== children) {
      onSave(text);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setText(typeof children === 'string' ? children : '');
      setIsEditable(false);
    }
  };

  useEffect(() => {
    if (isEditable && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditable]);

  if (isEditing && isEditable) {
    const isMultiline = text.length > 50 || text.includes('\n');
    
    if (isMultiline) {
      return (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${className} border-2 border-blue-500 bg-white/90 text-black p-2 rounded resize-none min-h-[40px]`}
          style={{ width: '100%', fontFamily: 'inherit', fontSize: 'inherit' }}
        />
      );
    } else {
      return (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className={`${className} border-2 border-blue-500 bg-white/90 text-black p-1 rounded`}
          style={{ width: '100%', fontFamily: 'inherit', fontSize: 'inherit' }}
        />
      );
    }
  }

  return (
    <Component 
      className={`${className} ${isEditing ? 'relative cursor-pointer hover:bg-blue-50/20 hover:outline hover:outline-2 hover:outline-blue-400 hover:outline-dashed transition-all duration-200 group' : ''}`}
      onClick={handleClick}
      title={isEditing ? "Click to edit" : undefined}
    >
      {text || children}
      {isEditing && (
        <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-1 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          ✏️
        </span>
      )}
    </Component>
  );
};