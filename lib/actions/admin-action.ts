"use server";

import { redirect } from "next/navigation";
import { getSession } from "../session";
import {
  getAllLeads,
  deleteLead,
  getSolarConfig,
  saveSolarConfig,
  type SolarConfigOverride,
} from "../data-store";

/**
 * Guard: Throws redirect to login if not authenticated.
 */
async function requireAdmin() {
  const session = await getSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

// ─────────────────────────────────────────────────────────────────────────────
// Leads Actions
// ─────────────────────────────────────────────────────────────────────────────

export async function getLeadsAction() {
  await requireAdmin();
  return getAllLeads();
}

export async function deleteLeadAction(
  _prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  await requireAdmin();
  const leadId = formData.get("leadId") as string;
  if (!leadId) return { success: false, message: "Lead ID is required." };

  const deleted = deleteLead(leadId);
  return deleted
    ? { success: true, message: `Lead ${leadId} deleted successfully.` }
    : { success: false, message: `Lead ${leadId} not found.` };
}

// ─────────────────────────────────────────────────────────────────────────────
// Solar Config Actions
// ─────────────────────────────────────────────────────────────────────────────

export async function getSolarConfigAction(): Promise<SolarConfigOverride> {
  await requireAdmin();
  return getSolarConfig();
}

export async function saveSolarConfigAction(
  _prevState: { success: boolean; message: string },
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  await requireAdmin();

  try {
    // Parse all scalar fields
    const config: SolarConfigOverride = {
      panelWp: Number(formData.get("panelWp")),
      panelUnitRate: Number(formData.get("panelUnitRate")),
      roofAreaPerKw: Number(formData.get("roofAreaPerKw")),
      residentialBenchmarkRate: Number(formData.get("residentialBenchmarkRate")),
      commercialBenchmarkRate: Number(formData.get("commercialBenchmarkRate")),
      gridTariffRate: Number(formData.get("gridTariffRate")),
      defaultPsh: Number(formData.get("defaultPsh")),
      performanceRatio: Number(formData.get("performanceRatio")),
      subsidyTier1Kw: Number(formData.get("subsidyTier1Kw")),
      subsidyTier1Amount: Number(formData.get("subsidyTier1Amount")),
      subsidyTier2Kw: Number(formData.get("subsidyTier2Kw")),
      subsidyTier2Amount: Number(formData.get("subsidyTier2Amount")),
      subsidyTier3PlusAmount: Number(formData.get("subsidyTier3PlusAmount")),
      stateSubsidyTier1Kw: Number(formData.get("stateSubsidyTier1Kw")),
      stateSubsidyTier1Amount: Number(formData.get("stateSubsidyTier1Amount")),
      stateSubsidyTier2Kw: Number(formData.get("stateSubsidyTier2Kw")),
      stateSubsidyTier2Amount: Number(formData.get("stateSubsidyTier2Amount")),
      stateSubsidyTier3PlusAmount: Number(formData.get("stateSubsidyTier3PlusAmount")),
      // Equipment bands come as a JSON string from the hidden input
      equipmentBands: JSON.parse(formData.get("equipmentBands") as string),
    };

    // Basic validation
    const numericFields = [
      "panelWp", "panelUnitRate", "roofAreaPerKw",
      "residentialBenchmarkRate", "commercialBenchmarkRate",
      "gridTariffRate", "defaultPsh", "performanceRatio",
      "subsidyTier1Kw", "subsidyTier1Amount", "subsidyTier2Kw",
      "subsidyTier2Amount", "subsidyTier3PlusAmount",
      "stateSubsidyTier1Kw", "stateSubsidyTier1Amount", "stateSubsidyTier2Kw",
      "stateSubsidyTier2Amount", "stateSubsidyTier3PlusAmount",
    ] as const;

    for (const field of numericFields) {
      if (isNaN(config[field]) || config[field] < 0) {
        return { success: false, message: `Invalid value for ${field}.` };
      }
    }

    if (!Array.isArray(config.equipmentBands) || config.equipmentBands.length === 0) {
      return { success: false, message: "Equipment bands must be a non-empty array." };
    }

    saveSolarConfig(config);
    return { success: true, message: "Solar calculator configuration saved successfully!" };
  } catch (err) {
    console.error("[Admin] saveSolarConfigAction error:", err);
    return { success: false, message: "Failed to save configuration. Please check the values." };
  }
}
