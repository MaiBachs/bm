import React from "react";
import "./Sidebar.css"
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return <div className="wrapper">
    <div>
      <NavLink  exact to="/home" activeClassName="activeClicked" className="title">
        <h5>Trang chú</h5>
      </NavLink>
    </div>
    <div>
      <h5 className="title">Biểu đồ chứng khoán</h5>
    </div>
    <div>
      <h5 className="title">Giao dịch nội bộ</h5>
    </div>
    <div>
      <h5 className="title">Giao dịch liên ngân hàng</h5>
    </div>
  </div>;
}

export default Sidebar; 
