import { useState, useMemo } from "react";
import { Client } from "../types/client";

export function useClientSearch(clients: Client[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return clients;

    return clients.filter(
      (client) =>
        client.name.toLowerCase().includes(term) ||
        client.companyName.toLowerCase().includes(term) ||
        client.email.toLowerCase().includes(term) ||
        client.phone.includes(term)
    );
  }, [clients, searchTerm]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  return {
    searchTerm,
    filteredClients,
    handleSearch,
  };
}
