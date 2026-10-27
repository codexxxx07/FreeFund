import { useEffect, useMemo, useState } from "react";

const DEFAULT_WORDS = ["Clarity", "Confidence", "Purpose", "Success"];
const TYPING_SPEED = 90;
const DELETING_SPEED = 60;
const PAUSE_AFTER_WORD = 900;
const PAUSE_BEFORE_DELETE = 800;

export default function TypewriterText({
  words = DEFAULT_WORDS,
  typingSpeed = TYPING_SPEED,
  deletingSpeed = DELETING_SPEED,
  pauseAfterWord = PAUSE_AFTER_WORD,
  pauseBeforeDelete = PAUSE_BEFORE_DELETE,
  className = "",
}) {
  const [displayText, setDisplayText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const currentWord = useMemo(() => words[wordIndex % words.length] || "", [words, wordIndex]);

  useEffect(() => {
    if (isPaused) {
      const pauseTimer = setTimeout(() => {
        setIsPaused(false);
        if (!isDeleting) {
          setIsDeleting(true);
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => prev + 1);
        }
      }, isDeleting ? pauseBeforeDelete : pauseAfterWord);
      return () => clearTimeout(pauseTimer);
    }

    if (isDeleting) {
      if (displayText === "") {
        setIsPaused(true);
        return;
      }
      const deleteTimer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
      return () => clearTimeout(deleteTimer);
    }

    if (displayText === currentWord) {
      setIsPaused(true);
      return;
    }

    const typeTimer = setTimeout(() => {
      setDisplayText((prev) => currentWord.slice(0, prev.length + 1));
    }, typingSpeed);

    return () => clearTimeout(typeTimer);
  }, [
    currentWord,
    displayText,
    deletingSpeed,
    isDeleting,
    isPaused,
    pauseAfterWord,
    pauseBeforeDelete,
    typingSpeed,
  ]);

  useEffect(() => {
    setDisplayText("");
    setIsDeleting(false);
    setIsPaused(false);
  }, [words]);

  return (
    <span className={`typewriter-animated ${className}`} aria-live="polite">
      <span className="typewriter-inner">
        <span>{displayText}</span>
        <span className="typewriter-cursor" aria-hidden="true" />
      </span>
    </span>
  );
}
