import { UseUser } from "../hooks/useUser";
import React from "react";

import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Welcome{user?.username ? `, ${user.username}` : ""}!
        </h1>
        <p className="text-gray-600 mb-6">
          {user
            ? "You are successfully logged in. Click below to go to your dashboard."
            : "Please log in to access your dashboard."}
        </p>

        {user && (
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-md hover:bg-blue-700 transition duration-300"
          >
            Go to Dashboard
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;
