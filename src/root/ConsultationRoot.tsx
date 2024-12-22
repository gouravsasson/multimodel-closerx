import { Outlet } from "react-router-dom";
import { Navigation } from "./../components/Layout/Navigation";

function ConsultationRoot() {
  return (
    <div className="flex flex-col h-screen">
      
      <div className="sticky top-0 left-0 right-0 z-50 h-16">
        <Navigation />
      </div>

      
      <div className="flex-1 overflow-hidden"> 
        <Outlet />
      </div>
    </div>
  );
}

export default ConsultationRoot;
