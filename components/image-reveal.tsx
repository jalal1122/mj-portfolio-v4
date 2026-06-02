'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ImageRevealProps {
  imageSrc: string;
  isVisible: boolean;
}

export function ImageReveal({ imageSrc, isVisible }: ImageRevealProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    if (isVisible) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="pointer-events-none fixed z-40"
      style={{
        left: `${mousePosition.x}px`,
        top: `${mousePosition.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {isVisible && (
        <motion.div
          initial={{ scale: 0.8, rotate: -2 }}
          animate={{ scale: 1, rotate: -2 }}
          transition={{ duration: 0.4 }}
          className="relative w-80 h-60 rounded-lg overflow-hidden shadow-2xl"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <img
            src={imageSrc}
            alt="Project preview"
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}
    </motion.div>
  );
}
