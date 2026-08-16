"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { X, Send, Sparkles, CheckCheck } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

const WhatsAppIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.707 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

export default function WhatsAppWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const rawPhone = SITE_CONFIG.contact.whatsapp.replace(/\+/g, "");

  // Auto-hide widget completely on all admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useEffect(() => {
    if (isOpen) {
      setHasOpened(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen]);

  const quickPills = [
    { label: "☀️ Solar Calculator", text: "Hi, I want to calculate solar savings for my property." },
    { label: "⚡ PM Surya Ghar Subsidy", text: "Hi, I have a question regarding PM Surya Ghar subsidy in Odisha." },
    { label: "🏢 Commercial Inquiry", text: "Hi, I am interested in commercial rooftop solar EPC installation." },
    { label: "📋 Book Site Visit", text: "Hi, I would like to book a free solar site visit." },
  ];

  const handleSendToWhatsApp = (textToSend?: string) => {
    const text = textToSend || message;
    const defaultMsg = text.trim()
      ? text.trim()
      : "Hi, I am interested in Pragati EcoSolar rooftop solar services.";

    const encoded = encodeURIComponent(defaultMsg);
    const whatsappUrl = `https://wa.me/${rawPhone}?text=${encoded}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendToWhatsApp();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Trigger Launcher Button */}
      {!isOpen && (
        <div className="relative group">
          {/* Subtle pulse aura ring when un-opened */}
          {!hasOpened && (
            <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-75 animate-ping pointer-events-none" />
          )}

          {/* Notification Dot Badge */}
          {!hasOpened && (
            <span className="absolute -top-1 -right-1 z-20 bg-amber-500 text-slate-900 text-[10px] font-extrabold w-5 h-5 rounded-full border-2 border-white flex items-center justify-center shadow-md animate-bounce">
              1
            </span>
          )}

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open WhatsApp Support Chat"
            className="relative z-10 p-3.5 sm:p-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
          </button>
        </div>
      )}

      {/* In-App Interactive WhatsApp Popup Card */}
      {isOpen && (
        <div className="w-[340px] max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Authentic WhatsApp Green Header */}
          <div className="bg-[#075E54] text-white p-4 flex items-center justify-between border-b border-emerald-900">
            <div className="flex items-center gap-3">
              {/* Support Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/30 p-1 flex items-center justify-center shrink-0">
                  <img
                    src="/logo.png"
                    alt="Pragati EcoSolar"
                    className="w-full h-full object-contain"
                  />
                </div>
                {/* Online Dot */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#25D366] rounded-full border-2 border-[#075E54]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1">
                  <span>Pragati EcoSolar</span>
                  <Sparkles className="w-3 h-3 text-amber-300" />
                </h3>
                <p className="text-[11px] text-emerald-200 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] inline-block animate-pulse" />
                  <span>Typically replies in minutes</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body with Soft Pattern Styling */}
          <div className="bg-[#e5ddd5]/40 p-4 space-y-3 text-xs overflow-y-auto max-h-[310px] min-h-[220px]">
            {/* Header Badge */}
            <div className="text-center">
              <span className="text-[10px] text-slate-600 bg-white/90 px-2.5 py-1 rounded-full font-mono border border-slate-200 shadow-2xs">
                Official WhatsApp Channel
              </span>
            </div>

            {/* Welcome Bubble */}
            <div className="bg-white p-3.5 rounded-2xl rounded-tl-xs shadow-sm border border-slate-200/80 space-y-1.5 max-w-[90%]">
              <div className="text-[10px] font-bold text-[#075E54] font-mono flex items-center justify-between">
                <span>Pragati Solar Team</span>
                <CheckCheck className="w-3.5 h-3.5 text-[#34B7F1]" />
              </div>
              <p className="text-slate-800 leading-relaxed text-xs">
                Hello! 👋 Welcome to Pragati EcoSolar. How can we help you with your solar project today?
              </p>
              <div className="text-[9px] text-slate-400 text-right pt-0.5 font-mono">
                Just now
              </div>
            </div>

            {/* Quick Inquiry Pills */}
            <div className="pt-2 space-y-1.5">
              <span className="text-[10px] font-bold font-mono text-slate-600 uppercase tracking-wider block">
                Quick Options:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPills.map((pill, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setMessage(pill.text);
                      inputRef.current?.focus();
                    }}
                    className="text-[11px] bg-white hover:bg-emerald-50 text-slate-800 hover:text-[#075E54] px-3 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-300 font-semibold shadow-2xs transition-all text-left"
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Input Bar */}
          <div className="p-3 bg-[#f0f0f0] border-t border-slate-200 flex items-center gap-2">
            <input
              ref={inputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2 text-xs bg-white border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#075E54] text-slate-900 placeholder:text-slate-400"
            />
            <button
              onClick={() => handleSendToWhatsApp()}
              className="p-2.5 bg-[#128C7E] hover:bg-[#075E54] text-white rounded-full shadow-md transition-all shrink-0 active:scale-95"
              aria-label="Send via WhatsApp"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
