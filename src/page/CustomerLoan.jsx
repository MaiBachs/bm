import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import "./CustomerLoan.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import customerApi from "../apis/customerLoan.api";
import PopoverRepaid from "./PopoverRepaid";

function CustomerLoan({ children }) {
  const [cmnd, setCmnd] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [payment, setPayment] = useState(0);
  const queryClient = useQueryClient();

  const openPopover = (loan) => {
    setSelectedLoan(loan);
    setPayment(0);
    setShowPopover(true);
  };

  const closePopover = () => {
    setSelectedLoan(null);
    setShowPopover(false);
  };

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

  const handlePaymentChange = (e) => {
    const enteredPayment = parseFloat(e.target.value);

    if (enteredPayment > selectedLoan.repaid) {
      setPayment(selectedLoan.repaid);
    } else {
      setPayment(enteredPayment);
    }
  };

  const memoizedCustomerData = useMemo(() => {
    if (status === "success" && customer) {
      return customer.data;
    }
    return null;
  }, [status, customer]);

  const loanRepaidMutation = useMutation(
    (loanData) => customerApi.loanRepaid(loanData),
    {
      onSettled: () => {
        queryClient.invalidateQueries(["customerByCMND", cmnd]);
      },
    }
  );

  const handleLoanRepaid = async () => {
    if (selectedLoan && payment > 0 && payment) {
      let newStatus = selectedLoan.status;
      if (selectedLoan.repaid - payment <= 0) {
        newStatus = 0;
      }
      const currentDate = new Date();

      const updatedLoan = {
        ...selectedLoan,
        loanAmountRepaid: selectedLoan.loanAmountRepaid + payment,
        repaid: selectedLoan.repaid - payment,
        status: newStatus,
        payment: 0,
        updatedDate: currentDate.toISOString(),
      };

      await loanRepaidMutation.mutateAsync(updatedLoan);
      closePopover();
    }
  };

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
        <div className="bg-white shadow-lg p-4 mt-4">
          <h2 className="text-xl font-semibold">Kết quả tìm kiếm</h2>
          <ul className="list-disc pl-8">
            <li className="text-gray-700">
              Tên khách hàng: {memoizedCustomerData.fullName}
            </li>
            <li className="text-gray-700">
              Số chứng minh nhân dân: {memoizedCustomerData.cmnd}
            </li>
            <li className="text-gray-700">
              Email: {memoizedCustomerData.email}
            </li>
            <li className="text-gray-700">
              Ngày sinh: {memoizedCustomerData.dateOfBirth}
            </li>
            <li className="text-gray-700">
              Quê quán: {memoizedCustomerData.country}
            </li>
            <li className="text-gray-700">
              Giới tính: {memoizedCustomerData.sex === "M" ? "Nam" : "Nữ"}
            </li>
            {memoizedCustomerData.loans.length === 0 ? (
              <li className="text-gray-700">Vay nợ: 0</li>
            ) : (
              <>
                <li className="text-gray-700">Khoản vay:</li>
                <div className="border-t border-b border-gray-300 p-4 mt-4">
                  <ul className="list-disc pl-8">
                    {memoizedCustomerData.loans.map((loan, index) => (
                      <li key={index}>
                        <ul>
                          <li className="text-gray-700 mt-2">
                            Ngày vay nợ: {loan.loanTransactionDate}
                          </li>
                          <li className="text-gray-700">
                            Hạn trả: {loan.durationInYears}
                          </li>
                          <li className="text-gray-700">
                            Số tiền đã hoàn trả: {loan.loanAmountRepaid}
                          </li>
                          <li className="text-gray-700">
                            Số tiền đã vay: {loan.loanAmountTaken}
                          </li>
                          <li className="text-gray-700">
                            Còn nợ: {loan.repaid}
                          </li>
                          <li className="text-gray-700">
                            Ngày cập nhật mới nhất: {loan.updatedDate}
                          </li>
                        </ul>
                        <div className="flex flex-row">
                          <button
                            onClick={() => openPopover(loan)}
                            className="mt-3 mx-2 bg-blue-300 p-2 border rounded-xl"
                          >
                            Trả nợ
                          </button>
                          {selectedLoan === loan && (
                            <PopoverRepaid
                              show={showPopover}
                              handleLoanRepaid={handleLoanRepaid}
                            >
                              <ul>
                                <li className="text-gray-700 mt-2">
                                  Ngày vay nợ: {loan.loanTransactionDate}
                                </li>
                                <li className="text-gray-700">
                                  Hạn trả: {loan.durationInYears}
                                </li>
                                <li className="text-gray-700">
                                  Số tiền đã hoàn trả: {loan.loanAmountRepaid}
                                </li>
                                <li className="text-gray-700">
                                  Số tiền đã vay: {loan.loanAmountTaken}
                                </li>
                                <li className="text-gray-700">
                                  Còn nợ: {loan.repaid}
                                </li>
                                <li className="text-gray-700">
                                  Số tiền muốn trả:
                                  <input
                                    type="number"
                                    onChange={handlePaymentChange}
                                    className=" border rounded-sm border-black-400 border-spacing-3 mx-2"
                                  />
                                </li>
                                <li className="text-gray-700">
                                  Ngày cập nhật mới nhất: {loan.updatedDate}
                                </li>
                              </ul>
                              <div className="flex justify-between mt-4">
                                <button
                                  onClick={closePopover}
                                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                                >
                                  Hủy bỏ
                                </button>
                                <button
                                  onClick={handleLoanRepaid}
                                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                                >
                                  Xác nhận
                                </button>
                              </div>
                            </PopoverRepaid>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CustomerLoan;
