import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./CustomerLoan.css";
import { useQuery } from "@tanstack/react-query";
import customerApi from "../apis/customerLoan.api";

function CustomerLoan() {
  const [cmnd, setCmnd] = useState("");

  const { data: customer, status } = useQuery(
    ["customerByCMND", cmnd],
    () => customerApi.getFindcmnd(cmnd),
    {
      enabled: !!cmnd,
    }
  );
  const handleInputChange = (e) => {
    setCmnd(e.target.value);
  };
  const memoizedCustomerData = useMemo(() => {
    if (status === "success" && customer) {
      return customer.data;
    }
    return null;
  }, [status, customer]);

  console.log(customer);

  return (
    <div>
      <div className="header-loan">
        <Link className="loan" to="/interest">
          Interest
        </Link>
        <Link className="loan">Customer loan</Link>
      </div>
      <div className="mt-3">
        <form className="grid grid-cols-7">
          <div className="flex rounded-sm bg-white p-1 col-start-3 col-span-3">
            <input
              type="text"
              className="flex-grow border-red-500 bg-blue-100 px-3 py-2 text-black outline-none h-18"
              placeholder="Tìm kiếm"
              value={cmnd}
              onChange={handleInputChange}
            />
            <button className="flex-shrink-0 rounded-sm bg-blue-400 px-6 py-2 hover:opacity-90">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
      {memoizedCustomerData && (
        <div>
          <h2>Kết quả tìm kiếm</h2>
          <ul>
            <li>Tên khách hàng: {memoizedCustomerData.fullName}</li>
            <li>Số chứng minh nhân dân: {memoizedCustomerData.cmnd}</li>
            <li>Email: {memoizedCustomerData.email}</li>
            <li>Ngày sinh : {memoizedCustomerData.dateOfBirth}</li>
            <li>Quê quán : {memoizedCustomerData.country}</li>
            <li>
              Giới tính: {memoizedCustomerData.sex === "M" ? "Nam" : "Nữ"}
            </li>
            <li> Vay nợ</li>
            <li>
              {" "}
              Ngày vay nợ : {memoizedCustomerData.loans[0].loanTransactionDate}
            </li>
            <li> Hạn trả :{memoizedCustomerData.loans[0].durationInYears} </li>
            <li>
              {" "}
              Số tiền hoàn trả :{
                memoizedCustomerData.loans[0].loanAmountRepaid
              }{" "}
            </li>
            <li> Đã trả :{memoizedCustomerData.loans[0].loanAmountTaken} </li>
            <li> Được hoàn trả :{memoizedCustomerData.loans[0].repaid} </li>
            <li>
              {" "}
              Ngày cập nhật mới nhất :
              {memoizedCustomerData.loans[0].updatedDate}{" "}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomerLoan;
