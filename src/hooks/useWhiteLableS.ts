import { create } from "zustand";

interface WhitelableState {
  response: any; // Replace `any` with the actual type if known
  setResponse: (response: any) => void; // Replace `any` with the actual type if known
  resetResponse: () => void;
}

const useWhitelableStore = create<WhitelableState>((set) => ({
  response: null, // Initial state for the response object
  setResponse: (response) => set({ response }), // Setter to update the response object
  resetResponse: () => set({ response: null }), // Method to reset the response
}));

export default useWhitelableStore;
