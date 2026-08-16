"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function WhatsAppFloating() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(true);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const rawPhone = SITE_CONFIG.contact.whatsapp.replace(/\+/g, "");
  const whatsappUrl = `https://wa.me/${rawPhone}?text=Hi%2C%20I%20am%20interested%20in%20Pragati%20EcoSolar%20services.`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 pointer-events-none">
      {/* Interactive Container */}
      <div className="flex items-center gap-3 pointer-events-auto relative">
        
        {/* Tooltip / Speech Bubble */}
        {showTooltip && (
          <div className="bg-slate-900 text-white px-3.5 py-2 rounded-2xl shadow-xl border border-slate-800 flex items-center gap-2 animate-fade-in text-xs font-semibold whitespace-nowrap">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-400 transition-colors"
            >
              Need Help? <span className="text-emerald-400 font-bold">Chat with us</span>
            </a>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowTooltip(false);
              }}
              className="p-1 hover:bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors ml-1"
              aria-label="Close tooltip"
            >
              <X className="w-3 h-3" />
            </button>
            {/* Arrow pointing right */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-y-[6px] border-y-transparent border-l-[6px] border-l-slate-900" />
          </div>
        )}

        {/* Floating WhatsApp Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative group p-3.5 sm:p-4 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shrink-0"
        >
          {/* Subtle Pulse Animation Aura */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-60 animate-ping pointer-events-none group-hover:hidden" />
          
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.99c-.002 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662a11.87 11.87 0 005.707 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>

      </div>
    </div>
  );
}
