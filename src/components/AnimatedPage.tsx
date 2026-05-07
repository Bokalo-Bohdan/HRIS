import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedPageProps {
  children: React.ReactNode;
  pageKey: string;
}

export const AnimatedPage: React.FC<AnimatedPageProps> = ({ children, pageKey }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40},
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
      );
    }
  }, [pageKey]); 

  return <div ref={containerRef}>{children}</div>;
};