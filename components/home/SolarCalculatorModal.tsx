"use client";

import React from "react";
import { X, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SolarCalculator from "../calculator/SolarCalculator";

interface SolarCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SolarCalculatorModal({ isOpen, onClose }: SolarCalculatorModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-5xl bg-[#FAFAFA] border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white shrink-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-amber-50 border border-amber-200 text-amber-700">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-amber-700 font-bold">
                  PRAGATI ECOSOLAR SIZING ENGINE
                </span>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Odisha Solar Yield & PM Surya Ghar Estimator
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6">
            <SolarCalculator />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
