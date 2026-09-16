"use server";

import { getSolarConfigAsync, saveSolarConfig, SolarConfigOverride } from "@/lib/data-store";
import { revalidatePath } from "next/cache";

export async function getSolarConfigAction() {
  try {
    const config = await getSolarConfigAsync();
    return { success: true, data: config };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function saveSolarConfigAction(config: SolarConfigOverride) {
  try {
    await saveSolarConfig(config);
    revalidatePath("/calculator");
    revalidatePath("/");
    revalidatePath("/admin/calculator");
    return { success: true, message: "Solar config saved successfully to PostgreSQL database!" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
