import { useState, useEffect } from 'react';

const useFontSize = () => {
  const [fontSize, setFontSize] = useState(() => {
    return parseInt(localStorage.getItem('fontSize')) || 16;
  });

  useEffect(() => {
    localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  return { fontSize, setFontSize };
};

export default useFontSize;