import { useState, useEffect, useRef } from "react";

interface UseAnimatedCounterOptions {
  start?: number;
  end: number;
  duration?: number;
  increment?: number;
  prefix?: string;
  suffix?: string;
}

export function useAnimatedCounter({
  start = 0,
  end,
  duration = 2000,
  increment = 1,
  prefix = "",
  suffix = "",
}: UseAnimatedCounterOptions) {
  const [count, setCount] = useState(start);
  const [isAnimating, setIsAnimating] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            setIsAnimating(true);
            animateCount();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCount = () => {
    const startTime = Date.now();
    const diff = end - start;

    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(start + diff * easeOutQuart);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(end);
        setIsAnimating(false);
        // Continue incrementing slowly after initial animation
        startSlowIncrement();
      }
    };

    requestAnimationFrame(step);
  };

  const startSlowIncrement = () => {
    const interval = setInterval(() => {
      setCount((prev) => prev + increment);
    }, 5000 + Math.random() * 3000); // Random interval between 5-8 seconds

    return () => clearInterval(interval);
  };

  const formattedCount = `${prefix}${count.toLocaleString("pt-BR")}${suffix}`;

  return { count, formattedCount, isAnimating, elementRef };
}
