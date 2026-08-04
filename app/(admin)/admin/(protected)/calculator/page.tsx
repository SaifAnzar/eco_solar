import type { Metadata } from "next";
import { getSolarConfig } from "@/lib/data-store";
import { CalculatorConfigEditor } from "@/components/admin/CalculatorConfigEditor";

export const metadata: Metadata = { title: "Calculator Config" };

export const dynamic = "force-dynamic";

export default async function AdminCalculatorPage() {
  const config = getSolarConfig();

  return (
    <div className="admin-page">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Calculator Configuration</h1>
        <p className="admin-page-subtitle">
          Edit all solar pricing, generation, and equipment parameters. Changes take effect immediately on the public calculator.
        </p>
      </div>

      <CalculatorConfigEditor initialConfig={config} />
    </div>
  );
}
