import React from "react";

const Popover = ({ show, onClose, children, loan }) => {
  //   if (!show) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
      <div className="absolute w-90% bg-white p-4 shadow-lg rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default Popover;
