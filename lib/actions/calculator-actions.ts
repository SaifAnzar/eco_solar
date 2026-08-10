"use server";

import { getSolarConfig, saveSolarConfig, SolarConfigOverride } from "@/lib/data-store";
import { revalidatePath } from "next/cache";

export async function getSolarConfigAction() {
  try {
    const config = getSolarConfig();
    return { success: true, data: config };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function saveSolarConfigAction(config: SolarConfigOverride) {
  try {
    saveSolarConfig(config);
    revalidatePath("/calculator");
    revalidatePath("/");
    return { success: true, message: "Solar config saved successfully!" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
