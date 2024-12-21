
import QueryClientProvider from "@/components/QueryClientProvider";




export function Layout({ children }: React.PropsWithChildren) {




  return (
    <QueryClientProvider>
      
        <div
           style={{
          
            minWidth: "100vh",
            background: "linear-gradient(to bottom right, #111827, #6b21a8, #1e40af)",
            position: "relative",
          }}
          className=" h-full"
        >
          

          <main className="px-4 p-4 h-full">
            {children}
          </main>
        </div>
      
    </QueryClientProvider>
  );
}
