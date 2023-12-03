import React from "react";
import AdminPanel from "./components/AdminPanel";

const page = async () => {
  return (
    <div className="h-screen w-screen p-10">
      <AdminPanel />
    </div>
  );
};

export default page;
