"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { X, Send, Sparkles, User, Phone, MapPin, CheckCircle2, Bot, Loader2, MessageSquare } from "lucide-react";
import { useSiteSettings } from "@/components/common/SiteSettingsContext";
import { SITE_CONFIG } from "@/config/site";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  time: string;
  showLeadForm?: boolean;
}

export default function LiveChatWidget() {
  const pathname = usePathname();
  const { settings } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);

  const phone = settings.contactPhone || SITE_CONFIG.contact.phone;

  // Hide live chat widget completely on admin panel routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "Hello! 👋 Welcome to Pragati EcoSolar. Need help calculating your solar savings or checking government subsidy eligibility?",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Lead Form State inside Chat
  const [showInlineLeadForm, setShowInlineLeadForm] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadPincode, setLeadPincode] = useState("");
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat thread
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showInlineLeadForm]);

  // Listen for global "open-live-chat" event from Navbar or CTAs
  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    };

    window.addEventListener("open-live-chat", handleOpenChat);
    return () => window.removeEventListener("open-live-chat", handleOpenChat);
  }, []);

  const handleToggleOpen = () => {
    if (!isOpen) {
      setUnreadCount(0);
    }
    setIsOpen(!isOpen);
  };

  const quickPrompts = [
    { label: "Calculate Solar Cost", query: "What is the cost of rooftop solar installation?" },
    { label: "PM Surya Ghar Subsidy", query: "Tell me about PM Surya Ghar subsidy rules in Odisha" },
    { label: "Speak to an Expert", query: "I want to speak with a solar engineer for site visit", triggerLead: true },
    { label: "Commercial Solar", query: "Tell me about commercial & industrial solar EPC options" },
  ];

  const handleSendMessage = async (customText?: string, triggerLeadPrompt = false) => {
    const text = customText || inputValue;
    if (!text.trim()) return;

    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: text.trim(),
      time,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInputValue("");
    setIsTyping(true);

    if (triggerLeadPrompt || text.toLowerCase().includes("expert") || text.toLowerCase().includes("visit") || text.toLowerCase().includes("quote")) {
      setShowInlineLeadForm(true);
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const data = await res.json();
      setIsTyping(false);

      if (data.reply) {
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.reply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, botMsg]);
      }

      if (data.isLeadPrompt) {
        setShowInlineLeadForm(true);
      }
    } catch (err) {
      console.error("LiveChat API Error:", err);
      setIsTyping(false);
      const fallbackMsg: Message = {
        id: `bot-err-${Date.now()}`,
        sender: "bot",
        text: `Thank you for reaching out! You can also reach our engineering office directly at ${phone}.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || !leadPhone.trim()) return;

    setIsSubmittingLead(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadData: {
            fullName: leadName.trim(),
            mobileNumber: leadPhone.trim(),
            pincode: leadPincode.trim() || "751024",
            message: "Captured via In-App Live Chat Lead Form",
          },
        }),
      });

      const data = await res.json();
      setIsSubmittingLead(false);
      setLeadSubmitted(true);
      setShowInlineLeadForm(false);

      const botMsg: Message = {
        id: `bot-lead-${Date.now()}`,
        sender: "bot",
        text: data.reply || `Thank you, ${leadName}! Your callback request has been saved. Our team will contact you shortly.`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      setIsSubmittingLead(false);
      console.error("Lead submission error:", err);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Trigger Launcher Button */}
      {!isOpen && (
        <div className="relative group">
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 z-20 bg-amber-500 text-slate-900 text-[10px] font-extrabold w-5.5 h-5.5 rounded-full border-2 border-white flex items-center justify-center shadow-md animate-bounce">
              {unreadCount}
            </span>
          )}

          <button
            onClick={handleToggleOpen}
            aria-label="Open Live Chat Support"
            className="p-3.5 sm:p-4 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border border-slate-700 relative"
          >
            <span className="absolute -inset-1 rounded-full bg-emerald-500/30 opacity-75 animate-ping pointer-events-none" />
            <MessageSquare className="w-6 h-6 text-emerald-400" />
          </button>
        </div>
      )}

      {/* Responsive In-App Chat Modal Window Card */}
      {isOpen && (
        <div className="w-80 md:w-96 max-h-[550px] h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Chat Header */}
          <div className="bg-slate-900 text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 border border-emerald-500/40 p-1 flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-emerald-400" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-900 animate-pulse" />
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1">
                  <span>Pragati Solar Advisor</span>
                  <Sparkles className="w-3 h-3 text-amber-400" />
                </h3>
                <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  <span>Online | Instant Support</span>
                </p>
              </div>
            </div>

            <button
              onClick={handleToggleOpen}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Minimize Chat Window"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-3.5 space-y-3 bg-slate-50 text-xs overflow-y-auto">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                    m.sender === "user"
                      ? "bg-emerald-600 text-white rounded-tr-xs"
                      : "bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs"
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <span className="text-[9px] text-slate-400 font-mono mt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white p-3 rounded-2xl rounded-tl-xs border border-slate-200/80 w-fit text-slate-400">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            {/* Quick Action Suggestion Chips */}
            <div className="pt-2 space-y-1.5">
              <span className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-wider block">
                Suggested Topics:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(item.query, item.triggerLead)}
                    className="text-[10px] sm:text-[11px] bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-300 font-semibold shadow-2xs transition-all text-left"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Inline Lead Capture Form */}
            {showInlineLeadForm && !leadSubmitted && (
              <div className="bg-white border border-emerald-200 rounded-2xl p-3.5 space-y-2.5 shadow-sm text-xs mt-2">
                <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Request Solar Callback</span>
                  </span>
                  <span className="text-[9px] text-emerald-700 font-mono bg-emerald-50 px-1.5 py-0.5 rounded font-bold">
                    FREE CONSULTATION
                  </span>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name *"
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="Mobile Number *"
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Odisha Pin Code (e.g. 751024)"
                      value={leadPincode}
                      onChange={(e) => setLeadPincode(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingLead}
                    className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs disabled:opacity-50"
                  >
                    {isSubmittingLead ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Submit Callback Request</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              placeholder="Ask about solar cost, subsidy, net-metering..."
              className="flex-1 px-3.5 py-2 text-xs bg-slate-100 border border-slate-200 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-900 placeholder:text-slate-400"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className="p-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-emerald-400 rounded-full shadow transition-all shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
