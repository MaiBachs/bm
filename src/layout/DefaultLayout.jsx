import React from "react";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

function DefaultLayout({ children }) {
  return (
    <div className="  ">
      <Header />
      <div className="grid grid-cols-5 gap-2 bg-white">
        <div className="col-span-1   ">
          <Sidebar />
        </div>
        <div className="col-span-4 p-2 m-1">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
