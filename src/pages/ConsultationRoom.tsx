import { ClientPage } from "@/components/ClientPage";

import { Layout } from "@/components/Layout";
import QueryClientProvider from "@/components/QueryClientProvider";
import { Toaster } from "@/components/ui/toaster";
import { AppStateProvider } from "@/contexts/AppStateProvider";

// import { useEffect, useState } from "react";

function ConsultationRoom() {
  // const [websocketEnabled, setWebsocketEnabled] = useState<boolean>();
  // const [webrtcEnabled, setWebrtcEnabled] = useState<boolean>();
  // const [geminiApiKey, setGeminiApiKey] = useState<string>("");

  // useEffect(() => {
  //   const abort = new AbortController();
  //   fetch(`${import.meta.env.VITE_SERVER_URL}/`, {
  //     signal: abort.signal,
  //   })
  //     .then((response) => response.json())
  //     .then((json) => {
  //       setWebsocketEnabled(json?.["websocket-enabled"] ?? false);
  //       setWebrtcEnabled(json?.["webrtc-enabled"] ?? false);
  //       setGeminiApiKey(json?.["gemini-api-key"] ?? "");
  //     })
  //     .catch(() => {
  //       setWebsocketEnabled(false);
  //       setWebrtcEnabled(false);
  //       setGeminiApiKey("");
  //     });
  //   return () => abort.abort();
  // }, []);

  // if (websocketEnabled === undefined && webrtcEnabled === undefined) {
  //   return (
  //     <Layout>
  //       <div className="h-full flex items-center justify-center">
  //         <LoaderCircleIcon className="animate-spin" />
  //       </div>
  //     </Layout>
  //   );
  // }

  // if (!websocketEnabled && !webrtcEnabled) {
  //   return (
  //     <ErrorPage title="Missing configuration">
  //       The server is missing both <code>GEMINI_API_KEY</code> and{" "}
  //       <code>DAILY_API_KEY</code>.
  //     </ErrorPage>
  //   );
  // }

  return (
    <QueryClientProvider>
      <AppStateProvider
        geminiApiKey="AIzaSyD5VZcdyzSLiMVPSf_rgG7TWEVmfHsbAgc"
        webrtcEnabled={true}
        websocketEnabled={true}
      >
        <Layout>
          <div className="space-y-6  max-h-[500px] h-[400px]">
          <ClientPage  />
          <Toaster />
          </div>
        </Layout>
      </AppStateProvider>
    </QueryClientProvider>
  );
}

export default ConsultationRoom;
