"use client";

import React, { useState, useEffect } from "react";
import { Loader2, CheckCircle2, AlertTriangle, MapPin, Zap } from "lucide-react";
import {
  fetchPincodeDetails,
  PincodeDetails,
  ALL_ODISHA_DISTRICTS,
  DISCOM_DESCRIPTIONS,
  DiscomCode,
  mapDistrictToDiscom,
} from "@/lib/pincode";

export interface ServiceCheckProps {
  initialPincode?: string;
  onPincodeVerified?: (details: PincodeDetails) => void;
  className?: string;
}

export default function ServiceCheck({
  initialPincode = "751024",
  onPincodeVerified,
  className = "",
}: ServiceCheckProps) {
  const [pincode, setPincode] = useState<string>(initialPincode);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [details, setDetails] = useState<PincodeDetails | null>(null);
  const [manualDistrict, setManualDistrict] = useState<string>("Khordha");
  const [manualDiscom, setManualDiscom] = useState<DiscomCode>("TPCODL");
  const [showFallback, setShowFallback] = useState<boolean>(false);

  useEffect(() => {
    const clean = pincode.trim();

    if (clean.length === 6 && /^\d{6}$/.test(clean)) {
      let isMounted = true;
      setIsLoading(true);
      setShowFallback(false);

      fetchPincodeDetails(clean).then((res) => {
        if (!isMounted) return;
        setIsLoading(false);
        setDetails(res);

        if (res.success) {
          setShowFallback(false);
          if (onPincodeVerified) onPincodeVerified(res);
        } else {
          setShowFallback(true);
          // Apply fallback
          const mapped = mapDistrictToDiscom(manualDistrict, "Odisha");
          const fallbackDetails: PincodeDetails = {
            success: true,
            pincode: clean,
            district: manualDistrict,
            state: "Odisha",
            discom: mapped.discom,
            discomCode: mapped.discomCode,
            isOdisha: true,
          };
          if (onPincodeVerified) onPincodeVerified(fallbackDetails);
        }
      });

      return () => {
        isMounted = false;
      };
    } else {
      setDetails(null);
      setIsLoading(false);
      setShowFallback(false);
    }
  }, [pincode]);

  const handleManualDistrictChange = (dist: string) => {
    setManualDistrict(dist);
    const mapped = mapDistrictToDiscom(dist, "Odisha");
    setManualDiscom(mapped.discomCode);

    const fallbackDetails: PincodeDetails = {
      success: true,
      pincode: pincode.length === 6 ? pincode : "751024",
      district: dist,
      state: "Odisha",
      discom: mapped.discom,
      discomCode: mapped.discomCode,
      isOdisha: true,
    };
    setDetails(fallbackDetails);
    if (onPincodeVerified) onPincodeVerified(fallbackDetails);
  };

  const handleManualDiscomChange = (discomKey: DiscomCode) => {
    setManualDiscom(discomKey);
    const fallbackDetails: PincodeDetails = {
      success: true,
      pincode: pincode.length === 6 ? pincode : "751024",
      district: manualDistrict,
      state: "Odisha",
      discom: DISCOM_DESCRIPTIONS[discomKey] || "Odisha DISCOM Utility",
      discomCode: discomKey,
      isOdisha: true,
    };
    setDetails(fallbackDetails);
    if (onPincodeVerified) onPincodeVerified(fallbackDetails);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-xs font-mono uppercase tracking-wider text-slate-600 font-semibold flex justify-between items-center">
        <span className="flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>Odisha Pincode Verification</span>
        </span>
        {details?.discomCode && (
          <span className="text-[11px] font-mono text-emerald-700 font-bold uppercase">
            {details.discomCode}
          </span>
        )}
      </label>

      {/* Input container with inline loader */}
      <div className="relative">
        <input
          type="text"
          maxLength={6}
          value={pincode}
          onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
          placeholder="Enter 6-digit Pincode (e.g. 751024)"
          className="w-full pl-4 pr-10 py-3 bg-[#FAFAFA] border border-slate-200 rounded-xl text-sm font-mono text-slate-900 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all shadow-sm"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
          {isLoading ? (
            <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
          ) : details?.success ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <span className="text-[10px] font-mono text-slate-400">IN</span>
          )}
        </div>
      </div>

      {/* Active Green Badge */}
      {details?.success && !showFallback && (
        <div className="p-3 bg-emerald-50/90 border border-emerald-200/90 rounded-xl flex items-start space-x-2.5 text-emerald-900 text-xs shadow-sm">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-semibold block text-emerald-950">
              Service Available: {details.district}, {details.state}
            </span>
            <span className="text-[11px] text-emerald-800 flex items-center gap-1 mt-0.5 font-mono">
              <Zap className="w-3 h-3 text-amber-500 shrink-0" />
              Serviced by <strong>{details.discom}</strong>
            </span>
          </div>
        </div>
      )}

      {/* Fallback Manual Selection Alert */}
      {showFallback && (
        <div className="p-3.5 bg-amber-50 border border-amber-200/80 rounded-xl text-amber-900 text-xs space-y-2.5 font-sans shadow-sm">
          <div className="flex items-start space-x-2 text-amber-800 font-medium">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Could not verify pincode &quot;{pincode}&quot; via Postal API. Select your Odisha District manually to continue calculation:
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            <div>
              <label className="block text-[10px] font-mono text-amber-900 uppercase font-semibold mb-1">
                Select District:
              </label>
              <select
                value={manualDistrict}
                onChange={(e) => handleManualDistrictChange(e.target.value)}
                className="w-full text-xs p-2 bg-white border border-amber-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              >
                {ALL_ODISHA_DISTRICTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-amber-900 uppercase font-semibold mb-1">
                DISCOM Utility:
              </label>
              <select
                value={manualDiscom}
                onChange={(e) => handleManualDiscomChange(e.target.value as DiscomCode)}
                className="w-full text-xs p-2 bg-white border border-amber-300 rounded-lg text-slate-900 focus:outline-none focus:ring-1 focus:ring-amber-500 font-mono"
              >
                <option value="TPCODL">TPCODL (Central Odisha)</option>
                <option value="TPNODL">TPNODL (North Odisha)</option>
                <option value="TPSODL">TPSODL (South Odisha)</option>
                <option value="TPWODL">TPWODL (West Odisha)</option>
                <option value="OTHER">Other / State DISCOM</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
