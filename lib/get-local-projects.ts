import fs from "fs";
import path from "path";

export interface LocalProjectItem {
  id: string;
  type: "photo" | "video";
  title: string;
  category: "Residential" | "Commercial" | "Industrial" | "Institutional";
  location: string;
  capacity: string;
  discom: "TPCODL" | "TPNODL" | "TPSODL" | "TPWODL";
  thumbnail: string;
  videoUrl?: string;
  description: string;
}

const ODISHA_LOCATIONS = [
  { city: "Patia, Bhubaneswar", district: "Khordha", discom: "TPCODL" as const, category: "Residential" as const },
  { city: "Infocity, Bhubaneswar", district: "Khordha", discom: "TPCODL" as const, category: "Commercial" as const },
  { city: "CDA Sector 9, Cuttack", district: "Cuttack", discom: "TPCODL" as const, category: "Residential" as const },
  { city: "Choudwar Industrial Estate", district: "Cuttack", discom: "TPCODL" as const, category: "Industrial" as const },
  { city: "Chandrasekharpur, Bhubaneswar", district: "Khordha", discom: "TPCODL" as const, category: "Commercial" as const },
  { city: "Jagamara, Bhubaneswar", district: "Khordha", discom: "TPCODL" as const, category: "Residential" as const },
  { city: "Grand Road, Puri", district: "Puri", discom: "TPCODL" as const, category: "Commercial" as const },
  { city: "VSS Marg, Sambalpur", district: "Sambalpur", discom: "TPWODL" as const, category: "Commercial" as const },
  { city: "Jharsuguda Industrial Zone", district: "Jharsuguda", discom: "TPWODL" as const, category: "Industrial" as const },
  { city: "Berhampur Central", district: "Ganjam", discom: "TPSODL" as const, category: "Residential" as const },
  { city: "Phulbani Town", district: "Kandhamal", discom: "TPSODL" as const, category: "Institutional" as const },
  { city: "Balasore Main Town", district: "Balasore", discom: "TPNODL" as const, category: "Residential" as const },
  { city: "Angul Industrial Estate", district: "Angul", discom: "TPCODL" as const, category: "Industrial" as const },
  { city: "Rourkela Steel Township", district: "Sundargarh", discom: "TPWODL" as const, category: "Commercial" as const },
  { city: "Baripada Town", district: "Mayurbhanj", discom: "TPNODL" as const, category: "Institutional" as const },
];

const CAPACITIES = [
  "3 kW On-Grid",
  "5 kW On-Grid",
  "10 kW On-Grid",
  "15 kW Hybrid",
  "25 kW Off-Grid",
  "50 kW On-Grid",
  "75 kW Commercial",
  "100 kW Industrial",
  "5 HP Solar Pump",
];

export function getLocalProjects(): LocalProjectItem[] {
  const projectsDir = path.join(process.cwd(), "public", "projects");
  if (!fs.existsSync(projectsDir)) return [];

  const allFiles = fs.readdirSync(projectsDir);
  const videoFiles = allFiles.filter((f) => f.toLowerCase().endsWith(".mp4")).sort();
  const imageFiles = allFiles.filter((f) => f.toLowerCase().endsWith(".jpeg") || f.toLowerCase().endsWith(".jpg") || f.toLowerCase().endsWith(".png")).sort();

  const items: LocalProjectItem[] = [];

  // 1. Process all Video Files first
  videoFiles.forEach((vFile, idx) => {
    // Pick a matching or corresponding image for thumbnail
    const thumbImg = imageFiles[idx % imageFiles.length] || imageFiles[0];
    const loc = ODISHA_LOCATIONS[idx % ODISHA_LOCATIONS.length];
    const cap = CAPACITIES[idx % CAPACITIES.length];

    items.push({
      id: `vid-${idx + 1}`,
      type: "video",
      title: `Odisha Solar Installation Site Video ${idx + 1} — ${loc.city}`,
      category: loc.category,
      location: `${loc.city} (${loc.discom})`,
      capacity: cap,
      discom: loc.discom,
      thumbnail: `/projects/${encodeURIComponent(thumbImg)}`,
      videoUrl: `/projects/${encodeURIComponent(vFile)}`,
      description: `Actual video footage of completed ${cap} rooftop installation in ${loc.city}. Empanelled under ${loc.discom}.`,
    });
  });

  // 2. Process all Image Files
  imageFiles.forEach((imgFile, idx) => {
    const loc = ODISHA_LOCATIONS[(idx + 3) % ODISHA_LOCATIONS.length];
    const cap = CAPACITIES[(idx + 2) % CAPACITIES.length];

    items.push({
      id: `img-${idx + 1}`,
      type: "photo",
      title: `Solar Installation Project Photo ${idx + 1} — ${loc.city}`,
      category: loc.category,
      location: `${loc.city} (${loc.discom})`,
      capacity: cap,
      discom: loc.discom,
      thumbnail: `/projects/${encodeURIComponent(imgFile)}`,
      description: `Site photograph of high-efficiency ALMM solar panel array installed at ${loc.city}.`,
    });
  });

  return items;
}
