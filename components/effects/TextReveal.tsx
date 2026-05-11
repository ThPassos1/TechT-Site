import React, { useEffect, useState } from 'react';

interface TextRevealProps {
  text: string;
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * TextReveal - Revela texto progressivamente (efeito cortina/máscara)
 * Perfeito para títulos e headlines
 */
export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  delay = 0,
  duration = 1.5,
  className = '',
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Iniciar após delay
    const startTimeout = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    const charDuration = (duration * 1000) / text.length;
    let index = 0;

    const interval = setInterval(() => {
      setDisplayText(text.substring(0, index + 1));
      index++;

      if (index >= text.length) {
        clearInterval(interval);
      }
    }, charDuration);

    return () => clearInterval(interval);
  }, [isVisible, text, duration]);

  return (
    <span className={className}>
      {displayText}
      {displayText.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

export default TextReveal;
