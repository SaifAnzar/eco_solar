import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const SESSION_DURATION_MS = 8 * 60 * 60 * 1000; // 8 hours

function getSecretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET environment variable is not set.");
  }
  return new TextEncoder().encode(secret);
}

export interface SessionPayload {
  email: string;
  role: "admin";
  expiresAt: number;
}

/**
 * Creates an encrypted JWT session cookie for the admin user.
 */
export async function createSession(email: string): Promise<void> {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const payload: SessionPayload = { email, role: "admin", expiresAt };

  const token = await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(new Date(expiresAt))
    .sign(getSecretKey());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(expiresAt),
    path: "/",
  });
}

/**
 * Reads and verifies the session JWT from cookies.
 * Returns the payload if valid, null otherwise.
 */
export async function getSession(): Promise<SessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;

    const { payload } = await jwtVerify(token, getSecretKey());

    // Validate shape
    if (
      typeof payload.email !== "string" ||
      typeof payload.expiresAt !== "number" ||
      payload.role !== "admin"
    ) {
      return null;
    }

    if (Date.now() > payload.expiresAt) {
      return null;
    }

    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

/**
 * Deletes the session cookie (logout).
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

/**
 * Reads session from the raw cookie header string (for use in middleware).
 * Returns the payload if valid, null otherwise.
 */
export async function getSessionFromCookieHeader(
  cookieHeader: string
): Promise<SessionPayload | null> {
  try {
    // Parse cookie header manually
    const pairs = cookieHeader.split(";").map((c) => c.trim());
    let token: string | undefined;
    for (const pair of pairs) {
      const idx = pair.indexOf("=");
      if (idx === -1) continue;
      const name = pair.slice(0, idx).trim();
      if (name === SESSION_COOKIE) {
        token = pair.slice(idx + 1).trim();
        break;
      }
    }
    if (!token) return null;

    const { payload } = await jwtVerify(token, getSecretKey());
    if (
      typeof payload.email !== "string" ||
      typeof payload.expiresAt !== "number" ||
      payload.role !== "admin"
    ) {
      return null;
    }
    if (Date.now() > (payload.expiresAt as number)) return null;
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}
