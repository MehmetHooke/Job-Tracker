export type Status =
  | "WISHLIST"
  | "APPLIED"
  | "INTERVIEW"
  | "OFFER"
  | "REJECTED";

export type Application = {
  id: string;
  company: string;
  role: string;
  status: Status;
  location?: string;
  source?: string;     
  link?: string;
  dateApplied: string;  
  notes?: string;
};