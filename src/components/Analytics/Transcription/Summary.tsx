import { useState, useEffect } from "react";
import axios from "axios";

const Summary = () => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.46:8000/api/summary",
        );
        setSummary(response.data.summary);
      } catch (err) {
        setError("Failed to fetch summary.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <textarea
        className="w-full h-[300px] bg-black/20 backdrop-blur-lg rounded-xl p-4 text-white/90 
                     focus:ring-2 focus:ring-primary/50 focus:outline-none
                     placeholder-white/30 resize-none"
        placeholder="Summary will appear here..."
        value={summary}
        readOnly
      />
    </div>
  );
};

export default Summary;
