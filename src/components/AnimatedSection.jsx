import React, { useEffect, useRef, useState } from 'react';

const AnimatedSection = ({ children, className = '', delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // If the element is visible in the viewport, set isVisible to true
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing once visible to prevent re-triggering
          observer.unobserve(domRef.current);
        }
      });
    }, {
      threshold: 0.3 // Trigger when 30% of the item is visible
    });

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []); // Run once on mount

  return (
    <div
      ref={domRef}
      className={`
        transition-all duration-1000 ease-out 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
        ${className}
      `}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;