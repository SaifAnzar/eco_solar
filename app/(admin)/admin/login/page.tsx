"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/actions/auth-action";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, {});

  return (
    <div className="admin-login-root">
      {/* Background */}
      <div className="admin-login-bg" />

      <div className="admin-login-card">
        {/* Official White Brand Logo & Header */}
        <div className="admin-login-header">
          <div className="flex justify-center mb-3">
            <img
              src="/logo-white.png"
              alt="Pragati EcoSolar"
              className="h-12 w-auto object-contain"
            />
          </div>
          <h1 className="admin-login-title">Admin Panel</h1>
          <p className="admin-login-subtitle">Pragati EcoSolar — Secure Access</p>
        </div>

        {/* Form */}
        <form action={formAction} className="admin-login-form">
          <div className="admin-field">
            <label htmlFor="email" className="admin-label">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="admin@pragatiecosolar.in"
              className="admin-input"
            />
          </div>

          <div className="admin-field">
            <label htmlFor="password" className="admin-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              placeholder="••••••••••••"
              className="admin-input"
            />
          </div>

          {state?.error && (
            <div className="admin-error" role="alert">
              <svg viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="admin-login-btn"
          >
            {isPending ? (
              <>
                <span className="admin-spinner" />
                Signing in…
              </>
            ) : (
              "Sign In to Admin Panel"
            )}
          </button>
        </form>

        <p className="admin-login-footer">
          Restricted access · Pragati EcoSolar © {new Date().getFullYear()}
        </p>
      </div>

      <style>{`
        .admin-login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0A0F1E;
          position: relative;
          overflow: hidden;
          font-family: var(--font-sans, system-ui, sans-serif);
        }
        .admin-login-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(245,158,11,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(16,185,129,0.08) 0%, transparent 60%);
        }
        .admin-login-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 420px;
          margin: 1rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 2.5rem;
          backdrop-filter: blur(20px);
          box-shadow: 0 25px 60px rgba(0,0,0,0.5);
        }
        .admin-login-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .admin-login-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #F9FAFB;
          margin: 0.5rem 0 0.25rem;
          letter-spacing: -0.02em;
        }
        .admin-login-subtitle {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.45);
          margin: 0;
        }
        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .admin-field {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }
        .admin-label {
          font-size: 0.8rem;
          font-weight: 600;
          color: rgba(255,255,255,0.6);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .admin-input {
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: #F9FAFB;
          font-size: 0.95rem;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .admin-input::placeholder { color: rgba(255,255,255,0.25); }
        .admin-input:focus {
          border-color: #F59E0B;
          box-shadow: 0 0 0 3px rgba(245,158,11,0.15);
        }
        .admin-error {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          border-radius: 10px;
          padding: 0.75rem 1rem;
          color: #FCA5A5;
          font-size: 0.875rem;
        }
        .admin-login-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
          color: #0A0F1E;
          font-weight: 700;
          font-size: 0.95rem;
          font-family: inherit;
          border: none;
          border-radius: 10px;
          padding: 0.875rem 1.5rem;
          cursor: pointer;
          transition: opacity 0.2s, transform 0.15s;
          margin-top: 0.25rem;
        }
        .admin-login-btn:hover:not(:disabled) { opacity: 0.9; transform: translateY(-1px); }
        .admin-login-btn:disabled { opacity: 0.6; cursor: not-allowed; }
        .admin-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(10,15,30,0.3);
          border-top-color: #0A0F1E;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          flex-shrink: 0;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .admin-login-footer {
          text-align: center;
          margin-top: 1.5rem;
          font-size: 0.75rem;
          color: rgba(255,255,255,0.2);
        }
      `}</style>
    </div>
  );
}
