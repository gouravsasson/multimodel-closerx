import { useState, useEffect } from "react";
import axios from "axios";

const Transcription = () => {
  const [transcription, setTranscription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTranscription = async () => {
      try {
        const response = await axios.get(
          "http://192.168.1.46:8000/api/transcription",
        );
        if (response.data && response.data.summary) {
          setTranscription(response.data.summary);
        } else {
          setError("Unexpected API response structure.");
        }
      } catch (err) {
        setError("Failed to fetch transcription.");
      } finally {
        setLoading(false);
      }
    };

    fetchTranscription();
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
        placeholder="Transcription will appear here.."
        value={transcription}
        readOnly
      />
    </div>
  );
};

export default Transcription;
