"use server";

import prisma from "@/lib/prisma";
import { PartnershipType, ApplicationStatus } from "@prisma/client";

export interface FranchiseInput {
  type: "FRANCHISE";
  fullName: string;
  phone: string;
  email: string;
  district: string;
  notes?: string;
  showroomSpaceSqFt?: string;
  investmentCapacity?: string;
  businessExperience?: string;
}

export interface DealershipInput {
  type: "DEALERSHIP";
  fullName: string;
  phone: string;
  email: string;
  district: string;
  notes?: string;
  businessName?: string;
  gstin?: string;
  interestedProducts?: string[];
}

export type CreatePartnershipInput = FranchiseInput | DealershipInput;

export async function createPartnershipApplication(input: CreatePartnershipInput) {
  try {
    const application = await prisma.partnershipApplication.create({
      data: {
        type: input.type as PartnershipType,
        fullName: input.fullName,
        phone: input.phone,
        email: input.email,
        district: input.district,
        notes: input.notes,
        ...(input.type === "FRANCHISE"
          ? {
              showroomSpaceSqFt: input.showroomSpaceSqFt,
              investmentCapacity: input.investmentCapacity,
              businessExperience: input.businessExperience,
            }
          : {
              businessName: input.businessName,
              gstin: input.gstin,
              interestedProducts: input.interestedProducts ?? [],
            }),
      },
    });

    return { success: true, data: application };
  } catch (error: any) {
    console.error("[Partnership Action Error]:", error);
    return { success: false, error: error.message || "Failed to submit application" };
  }
}

export async function getPartnershipApplications(type?: PartnershipType) {
  try {
    const applications = await prisma.partnershipApplication.findMany({
      where: type ? { type } : undefined,
      orderBy: { createdAt: "desc" },
    });
    return { success: true, data: applications };
  } catch (error: any) {
    console.error("[Get Partnerships Error]:", error);
    return { success: false, error: error.message || "Failed to fetch applications" };
  }
}

export async function updatePartnershipStatusAction(id: string, status: ApplicationStatus) {
  try {
    const updated = await prisma.partnershipApplication.update({
      where: { id },
      data: { status },
    });
    return { success: true, data: updated };
  } catch (error: any) {
    console.error("[Update Partnership Status Error]:", error);
    return { success: false, error: error.message || "Failed to update status" };
  }
}

export async function deletePartnershipApplicationAction(id: string) {
  try {
    await prisma.partnershipApplication.delete({
      where: { id },
    });
    return { success: true };
  } catch (error: any) {
    console.error("[Delete Partnership Error]:", error);
    return { success: false, error: error.message || "Failed to delete application" };
  }
}
