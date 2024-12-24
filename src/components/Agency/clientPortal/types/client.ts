export interface Client {
  id: string;
  name: string;
  companyName: string;
  email: string;
  phone: string;
  credits: number;
  balance: number;
  minutesUsed: number;
  agents: number;
  price: number;
  status: "Active" | "Inactive";
}
