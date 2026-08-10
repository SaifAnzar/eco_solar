"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const DYNAMIC_WORDS = [
  "On-Grid, Off-Grid & Hybrid Solutions.",
  "Powering Homes & Businesses.",
  "PM Surya Ghar Subsidy Authorized.",
  "Save Up to 90% Electricity Bills.",
];

interface TypewriterHeadlineProps {
  prefixText?: string;
  words?: string[];
  typingSpeed?: number;
  backspaceSpeed?: number;
  pauseDuration?: number;
  highlightClassName?: string;
  textClassName?: string;
}

export const TypewriterHeadline: React.FC<TypewriterHeadlineProps> = ({
  prefixText = "Odisha's Trusted Solar EPC Partner — ",
  words = DYNAMIC_WORDS,
  typingSpeed = 80,
  backspaceSpeed = 40,
  pauseDuration = 2200,
  highlightClassName = "text-emerald-600 font-extrabold",
  textClassName = "text-slate-900",
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
        }, 300);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, wordIndex, words, typingSpeed, backspaceSpeed, pauseDuration]);

  return (
    <div className="min-h-[140px] sm:min-h-[160px] lg:min-h-[180px] flex flex-col justify-start">
      <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.18] ${textClassName}`}>
        {prefixText}
        <span className={`inline ${highlightClassName}`}>
          {currentText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{
              duration: 0.55,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            className="inline-block font-light text-emerald-600 ml-1 select-none"
            aria-hidden="true"
          >
            |
          </motion.span>
        </span>
      </h1>
    </div>
  );
};

export default TypewriterHeadline;
