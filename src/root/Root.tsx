import { Navigation } from "../components/Layout/Navigation";
import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <Navigation />
        <div className="pt-16">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
