"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DYNAMIC_WORDS = [
  "Almost Zero.",
  "Zero with Solar.",
  "Save up to 90%.",
];

interface TypewriterHeadlineProps {
  words?: string[];
  typingSpeed?: number;
  backspaceSpeed?: number;
  pauseDuration?: number;
  highlightClassName?: string;
  textClassName?: string;
}

export const TypewriterHeadline: React.FC<TypewriterHeadlineProps> = ({
  words = DYNAMIC_WORDS,
  typingSpeed = 80,
  backspaceSpeed = 50,
  pauseDuration = 2000,
  highlightClassName = "text-emerald-500 font-extrabold",
  textClassName = "text-slate-900 dark:text-white",
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const targetWord = words[wordIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText !== targetWord) {
        timer = setTimeout(() => {
          setCurrentText(targetWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      if (currentText !== "") {
        timer = setTimeout(() => {
          setCurrentText(targetWord.slice(0, currentText.length - 1));
        }, backspaceSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }, 400);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, backspaceSpeed, pauseDuration]);

  return (
    <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] ${textClassName}`}>
      Cut Your Electricity Bill<br className="hidden sm:inline" /> to{" "}
      <span className={`inline-inline-block ${highlightClassName}`}>
        {currentText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.55,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="inline-block font-light ml-1 select-none"
          aria-hidden="true"
        >
          |
        </motion.span>
      </span>
    </h1>
  );
};

export default TypewriterHeadline;
