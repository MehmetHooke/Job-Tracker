import type { Application } from "../types/application";

export const mockApplications: Application[] = [
  {
    id: crypto.randomUUID(),
    company: "Google",
    role: "Frontend Engineer",
    status: "APPLIED",
    dateApplied: new Date().toISOString(),
    location: "Remote",
    source: "LinkedIn",
  },
  {
    id: crypto.randomUUID(),
    company: "Amazon",
    role: "React Developer",
    status: "INTERVIEW",
    dateApplied: new Date(Date.now() - 86400000 * 3).toISOString(),
    location: "Berlin",
    source: "Referral",
  },
    {
    id: crypto.randomUUID(),
    company: "Firebase",
    role: "React Native Developer",
    status: "OFFER",
    dateApplied: new Date(Date.now() - 86400000 * 3).toISOString(),
    location: "Berlin",
    source: "Referral",
  },
];
