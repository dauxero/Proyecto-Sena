import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Users from "./Users";
import Products from "./Products";
import Inventory from "./Inventory";

interface DashboardProps {
  role: string | null;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ role, onLogout }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-gray-800">
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <span className="text-white font-bold uppercase">Inventory App</span>
        </div>
        <nav className="mt-5">
          {role === "Administrator" && (
            <>
              <Link
                to="users"
                className="flex items-center mt-4 py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Manage Users
              </Link>
              <Link
                to="products"
                className="flex items-center mt-4 py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white"
              >
                Manage Products
              </Link>
            </>
          )}
          <Link
            to="inventory"
            className="flex items-center mt-4 py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            Inventory
          </Link>
          <button
            onClick={onLogout}
            className="flex items-center mt-4 py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white w-full text-left"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
        <div className="container mx-auto px-6 py-8">
          <Routes>
            {role === "Administrator" && (
              <>
                <Route path="users" element={<Users />} />
                <Route path="products" element={<Products />} />
              </>
            )}
            <Route path="inventory" element={<Inventory />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
