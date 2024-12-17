
import QueryClientProvider from "@/components/QueryClientProvider";




export function Layout({ children }: React.PropsWithChildren) {




  return (
    <QueryClientProvider>
      
        <div
           style={{
            minHeight: "100vh",
            background: "linear-gradient(to bottom right, #111827, #6b21a8, #1e40af)",
            position: "relative",
          }}
        >
          

          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
        </div>
      
    </QueryClientProvider>
  );
}
