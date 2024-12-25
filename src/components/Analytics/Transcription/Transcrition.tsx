interface TranscriptionProps {
  transcription: string;
}

const Transcription: React.FC<TranscriptionProps> = ({ transcription }) => {
  return (
    <div>
      <textarea
        className="w-full h-[300px] bg-black/20 backdrop-blur-lg rounded-xl p-4 text-white/90 
                     focus:ring-2 focus:ring-primary/50 focus:outline-none
                     placeholder-white/30 resize-none"
        placeholder=""
        value={transcription}
        readOnly
      />
    </div>
  );
};

export default Transcription;
