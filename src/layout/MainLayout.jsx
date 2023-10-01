import React from "react";
import Sidebar from "../component/Sidebar";

export default function MainLayout({ children }) {
  return (
    <div>
      <Sidebar/>
      {children}
    </div>
  );
}