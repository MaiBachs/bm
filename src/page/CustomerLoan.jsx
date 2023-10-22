import React from "react";
import { Link } from "react-router-dom";
import "./CustomerLoan.css"

function CustomerLoan() {
  return <div>
    <div className="header-loan">
      <Link className="loan" to="/interest">Interest</Link>
      <Link className="loan">Customer loan</Link>
    </div>
    <div>Customer</div>
  </div>;
}

export default CustomerLoan;
