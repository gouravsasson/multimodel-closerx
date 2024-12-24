import React, { useState } from "react";
import {
  Users,
  CreditCard,
  Activity,
  BarChart2,
  PlusCircle,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";

import { StatCard } from "./StatCard";
import { ClientCard } from "./ClientCard";
import { AddClientModal } from "./AddClientModal";
import { SearchBar } from "./SearchBar";
import { useClientSearch } from "./useClientSearch";
import Client from "./types/client";

const initialClients: Client[] = [
  {
    id: "mlxZfM0VXQtAGJX8YN1q",
    name: "Bigphilanthropy",
    companyName: "Bigphilanthropy Inc",
    email: "contact@bigphilanthropy.com",
    phone: "+1234567890",
    credits: 0,
    balance: 5,
    minutesUsed: 0,
    agents: 2,
    price: 0.5,
    status: "Active",
  },
  {
    id: "TE123456789",
    name: "Tech Solutions Inc",
    companyName: "Tech Solutions Inc",
    email: "info@techsolutions.com",
    phone: "+1987654321",
    credits: 100,
    balance: 75,
    minutesUsed: 25,
    agents: 5,
    price: 0.75,
    status: "Active",
  },
];

export default function ClientPortal() {
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>(initialClients);
  const { searchTerm, filteredClients, handleSearch } =
    useClientSearch(clients);

  const handleAddClient = (
    formData: Omit<
      Client,
      | "id"
      | "credits"
      | "balance"
      | "minutesUsed"
      | "agents"
      | "price"
      | "status"
    >
  ) => {
    const newClient: Client = {
      ...formData,
      id: `CL${Date.now()}`,
      credits: 0,
      balance: 0,
      minutesUsed: 0,
      agents: 0,
      price: 0.5,
      status: "Active",
    };

    setClients((prev) => [...prev, newClient]);
    setIsAddClientOpen(false);

    toast.success(`${formData.companyName} has been added successfully!`, {
      duration: 4000,
      style: {
        background: "#2D2B3F",
        color: "#fff",
        border: "1px solid #3D3B54",
      },
      icon: "🎉",
    });
  };

  return (
    <div className="min-h-screen bg-transparent">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold mb-1 text-white">
              Client Portal
            </h1>
            <p className="text-[#8B8A9B]">Managing {clients.length} clients</p>
          </div>
          <button
            onClick={() => setIsAddClientOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-purple-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <PlusCircle className="w-5 h-5" />
            Add Client
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={Users}
            value={`${clients.length}`}
            label="Total Clients"
            change={12.5}
          />
          <StatCard
            icon={CreditCard}
            value="157.3K"
            label="Total Credits"
            change={8.2}
          />
          <StatCard
            icon={Activity}
            value="1,234"
            label="Active Agents"
            change={15.8}
          />
          <StatCard
            icon={BarChart2}
            value="99.9%"
            label="System Health"
            change={0.2}
          />
        </div>

        <div className="mb-8">
          <SearchBar value={searchTerm} onChange={handleSearch} />
        </div>

        <div className="space-y-6">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              name={client.companyName}
              id={client.id}
              credits={client.credits}
              balance={client.balance}
              minutesUsed={client.minutesUsed}
              agents={client.agents}
              price={client.price}
              status={client.status}
            />
          ))}
          {filteredClients.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[#8B8A9B]">
                No clients found matching your search.
              </p>
            </div>
          )}
        </div>
      </div>

      <AddClientModal
        isOpen={isAddClientOpen}
        onClose={() => setIsAddClientOpen(false)}
        onSubmit={handleAddClient}
      />
    </div>
  );
}
