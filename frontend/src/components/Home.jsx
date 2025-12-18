import React from "react";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex gap-5">
      <div
        className="w-32 h-15 bg-amber-400 text-slate-700 rounded-md flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/admin")}
      >
        Admin
      </div>
      <div
        className="w-32 h-15 bg-amber-400 text-slate-700 rounded-md flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/login")}
      >
        Login
      </div>
    </div>
  );
}

export default Home;
