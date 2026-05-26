import { useState, useEffect, useCallback } from "react";

interface UseTypewriterOptions {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}

export function useTypewriter({
  phrases,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseTime = 2000,
}: UseTypewriterOptions) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentPhrase = phrases[currentPhraseIndex];

  const type = useCallback(() => {
    if (isPaused) return;

    if (!isDeleting) {
      // Typing
      if (currentText.length < currentPhrase.length) {
        setCurrentText(currentPhrase.slice(0, currentText.length + 1));
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        setCurrentText(currentText.slice(0, -1));
      } else {
        // Finished deleting, move to next phrase
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }
  }, [currentText, currentPhrase, isDeleting, isPaused, pauseTime, phrases.length]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(type, speed);
    return () => clearTimeout(timer);
  }, [type, isDeleting, typingSpeed, deletingSpeed]);

  return { currentText, currentPhraseIndex };
}
