"use client";

import React, { useState, useEffect } from "react";
import { FolderKanban, Plus, Trash2, Edit3, CheckCircle2, X, MapPin, Loader2 } from "lucide-react";
import { getProjects, upsertProject, deleteProject } from "@/lib/actions/admin-actions";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [form, setForm] = useState({
    id: "",
    title: "10 kW Commercial Solar Installation",
    clientType: "Commercial",
    district: "Bhubaneswar (Khordha)",
    systemSizeKw: 10,
    systemType: "On-Grid",
    imageUrl: "/images/project1.jpg",
    testimonial: "Excellent EPC execution and fast DISCOM net metering approval!",
    clientName: "Hotel Swosti Plaza",
    status: "PUBLISHED",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    const res = await getProjects();
    if (res.success) {
      setProjects(res.data || []);
    }
    setLoading(false);
  };

  const handleOpenAddModal = () => {
    setForm({
      id: "",
      title: "5 kW Residential Rooftop Solar",
      clientType: "Residential",
      district: "Patia, Bhubaneswar",
      systemSizeKw: 5,
      systemType: "On-Grid",
      imageUrl: "/images/project-default.jpg",
      testimonial: "Zero electricity bill after installing 5kW solar!",
      clientName: "Dr. K. C. Mohanty",
      status: "PUBLISHED",
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (proj: any) => {
    setForm({
      id: proj.id,
      title: proj.title,
      clientType: proj.clientType,
      district: proj.district,
      systemSizeKw: proj.systemSizeKw,
      systemType: proj.systemType || "On-Grid",
      imageUrl: proj.imageUrl || "/images/project-default.jpg",
      testimonial: proj.testimonial || "",
      clientName: proj.clientName || "",
      status: proj.status || "PUBLISHED",
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project portfolio item?")) return;
    const res = await deleteProject(id);
    if (res.success) {
      fetchProjects();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const res = await upsertProject(form);
    if (res.success) {
      setMessage("Project saved successfully!");
      setIsModalOpen(false);
      fetchProjects();
    } else {
      setMessage("Error saving project.");
    }
    setSaving(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-purple-700 font-bold">MODULE 4</span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">Projects Portfolio Manager</h1>
          <p className="text-xs text-slate-600 mt-1">
            Manage completed solar installation site photos, client testimonials, system sizes (kW), and Odisha district locations.
          </p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Completed Project</span>
        </button>
      </div>

      {message && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs font-bold shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Grid Section */}
      {loading ? (
        <div className="p-12 text-center text-xs font-mono text-slate-500 flex items-center justify-center gap-2">
          <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
          Loading project portfolio...
        </div>
      ) : projects.length === 0 ? (
        <div className="p-12 text-center text-xs font-mono text-slate-500 bg-white rounded-2xl border border-slate-200 space-y-3">
          <p>No completed projects added yet.</p>
          <button
            onClick={handleOpenAddModal}
            className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl inline-block"
          >
            Add First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div key={proj.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {proj.clientType} · {proj.systemType}
                  </span>
                  <span className="text-xs font-mono font-extrabold text-amber-600">
                    {proj.systemSizeKw} kW
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{proj.title}</h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{proj.district}</span>
                </div>

                {proj.testimonial && (
                  <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    &ldquo;{proj.testimonial}&rdquo;
                  </p>
                )}

                {proj.clientName && (
                  <div className="text-[11px] font-bold text-slate-800">— {proj.clientName}</div>
                )}
              </div>

              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] font-mono font-bold text-slate-400">{proj.status}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(proj)}
                    className="p-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="p-1.5 bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-lg font-bold text-slate-900">
                {form.id ? "Edit Project Portfolio" : "Add Completed Project"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-slate-700 font-bold uppercase mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. 10 kW Commercial Solar Installation"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans text-xs font-bold"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">Client Category</label>
                  <select
                    value={form.clientType}
                    onChange={(e) => setForm({ ...form, clientType: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Institutional">Institutional</option>
                    <option value="Agricultural">Agricultural</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">System kW Size</label>
                  <input
                    type="number"
                    step="0.5"
                    required
                    value={form.systemSizeKw}
                    onChange={(e) => setForm({ ...form, systemSizeKw: Number(e.target.value) })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">District / Location</label>
                  <input
                    type="text"
                    required
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    placeholder="e.g. Patia, Bhubaneswar (Khordha)"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold uppercase mb-1">System Architecture</label>
                  <select
                    value={form.systemType}
                    onChange={(e) => setForm({ ...form, systemType: e.target.value })}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans"
                  >
                    <option value="On-Grid">On-Grid</option>
                    <option value="Off-Grid">Off-Grid</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Solar Pump">Solar Pump</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold uppercase mb-1">Client Name (Optional)</label>
                <input
                  type="text"
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  placeholder="e.g. Hotel Swosti Plaza / Mr. Swain"
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold uppercase mb-1">Client Testimonial (Optional)</label>
                <textarea
                  rows={2}
                  value={form.testimonial}
                  onChange={(e) => setForm({ ...form, testimonial: e.target.value })}
                  placeholder="Write client feedback quote..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-sans"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
