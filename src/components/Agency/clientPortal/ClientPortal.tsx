import React, { useState, useEffect } from "react";
import axios from "axios";
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
import { axiosConfig } from "@/pages/auth/axiosConfig";

export default function ClientPortal() {
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [clients, setClients] = useState<Client[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statCardData, setStatCardData] = useState<any>(null); // New state for statCard data
  const [totalPages, setTotalPages] = useState<number>(1);
  const { searchTerm, filteredClients, handleSearch } =
    useClientSearch(clients);

  // Fetch clients from API
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("/agency/list/", axiosConfig); // Replace with your API endpoint
        if (response.data.success) {
          const clientData = response.data.response.map((item: any) => ({
            id: item.id.toString(),
            first_name: item.ghl_name || item.company_name,
            company_name: item.company_name,
            email: "N/A", // Add email if available
            phone: "N/A", // Add phone if available
            credits: parseFloat(item.credit),
            balance: 0, // Add balance if available
            minutesUsed: 0, // Add minutes used if available
            agents: 0, // Add agents count if available
            price: parseFloat(item.credit_price),
            status: item.is_suspended ? "Suspended" : "Active",
            schema_name: item.schema_name || "",
          }));
          setClients(clientData);
        } else {
          toast.error("Failed to load clients. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching clients:", error);
        toast.error("An error occurred while fetching client data.");
      }
    };

    fetchClients();
  }, []);

  useEffect(() => {
    const fetchStatCardData = async () => {
      try {
        const response = await axios.get("/agency/analytics/", axiosConfig); // Replace with your API endpoint for statcard data
        if (response.data.success) {
          setStatCardData(response.data.response);
        } else {
          toast.error("Failed to load statcard data. Please try again.");
        }
      } catch (error) {
        console.error("Error fetching statcard data:", error);
        toast.error("An error occurred while fetching statcard data.");
      }
    };

    fetchStatCardData();
  }, []);

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

    toast.success(`${formData.company_name} has been added successfully!`, {
      duration: 4000,
      style: {
        background: "#2D2B3F",
        color: "#fff",
        border: "1px solid #3D3B54",
      },
      icon: "🎉",
    });
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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
          {statCardData && (
            <>
              <StatCard
                icon={Users}
                value={`${statCardData?.total_sub_agency}`}
                // value="347"
                label="Total Clients"
                change={12.5}
              />
              <StatCard
                icon={CreditCard}
                value={`${clients
                  .reduce((sum, client) => sum + client.credits, 0)
                  .toFixed(2)}`}
                label="Total Credits"
                change={8.2}
              />
              <StatCard
                icon={Activity}
                value={`${statCardData?.total_agents}`}
                // value="8748"
                label="Active Agents"
                change={15.8}
              />
              <StatCard
                icon={BarChart2}
                value="99.9%"
                label="System Health"
                change={0.2}
              />
            </>
          )}
        </div>

        <div className="mb-8">
          <SearchBar value={searchTerm} onChange={handleSearch} />
        </div>

        <div className="space-y-6">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              name={client.first_name}
              id={client.id}
              credits={client.credits}
              balance={client.balance}
              minutesUsed={client.minutesUsed}
              agents={client.agents}
              price={client.price}
              status={client.status}
              schema_name={client.schema_name}
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
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg text-white
                       flex items-center space-x-2 transition-all disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg text-white
                       flex items-center space-x-2 transition-all disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
