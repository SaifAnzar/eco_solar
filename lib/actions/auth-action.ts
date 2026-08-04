"use server";

import { redirect } from "next/navigation";
import { createSession, deleteSession } from "../session";

export interface AuthActionState {
  error?: string;
}

/**
 * Login server action — validates credentials from env vars, creates session.
 */
export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase() ?? "";
  const password = (formData.get("password") as string | null) ?? "";

  const adminEmail = (process.env.ADMIN_EMAIL ?? "").toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD ?? "";

  if (!adminEmail || !adminPassword) {
    return { error: "Admin credentials are not configured on the server." };
  }

  if (email !== adminEmail || password !== adminPassword) {
    return { error: "Invalid email or password. Please try again." };
  }

  // Create JWT session cookie
  await createSession(email);

  // Redirect to admin dashboard
  redirect("/admin");
}

/**
 * Logout server action — clears the session cookie and redirects to login.
 */
export async function logoutAction(): Promise<void> {
  await deleteSession();
  redirect("/admin/login");
}
