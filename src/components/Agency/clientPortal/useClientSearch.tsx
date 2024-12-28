
import { useState, useMemo } from "react";
import { Client } from "../types/client";

export function useClientSearch(clients: Client[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredClients = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return clients;

    return clients.filter((client) => {
      const first_name = client.first_name?.toLowerCase() || "";
      const company_name = client.company_name?.toLowerCase() || "";
      const email = client.email?.toLowerCase() || "";
      const phone = client.phone || "";

      return (
        first_name.includes(term) ||
        company_name.includes(term) ||
        email.includes(term) ||
        phone.includes(term)
      );
    });
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
export default useClientSearch;
