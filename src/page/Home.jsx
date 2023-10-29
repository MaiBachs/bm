import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaMoneyCheckAlt, FaUserFriends } from "react-icons/fa";
import { AiFillIdcard } from "react-icons/ai";

function Home() {
  const [home, setHome] = useState({
    moneyExternalTransaction: 0,
    moneyInternalTransaction: 0,
    totalInternalTransaction: 0,
    totalExternalTransaction: 0,
    totalUser: 0,
    totalCard: 0,
    totalCardLocked: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:8084/api/home/api/home")
      .then((response) => {
        setHome(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="mx-auto bg-white">
      <div className="py-1 grid grid-cols-6 gap-3 mt-8">
        <div className="p-5 col-span-6 rounded-sm shadow-lg flex justify-center bg-gray-100">
          {" "}
          <FaUserFriends
            style={{ fontSize: 60, marginTop: -17, marginRight: 10 }}
          />
          <p>Tổng người dùng: {home.totalUser}</p>
        </div>
      </div>
      <div className="mt-3 p-1 grid grid-cols-6 gap-5 justify-center">
        <div className="col-span-2">
          <Link
            to="/InterbankTransactions"
            className="p-5 mt-3 rounded-sm shadow-lg flex justify-start bg-gray-100 no-underline"
          >
            Giao dịch liên ngân hàng: {home.totalExternalTransaction}
          </Link>
        </div>

        <div className="col-span-2">
          <Link
            to="/InternalTransactions"
            className="p-5 mt-3 rounded-sm shadow-lg flex justify-start bg-gray-100  no-underline"
          >
            Giao dịch nội bộ: {home.totalInternalTransaction}
          </Link>
        </div>
        <div className="col-span-2">
          <Link
            to=""
            className="p-5 mt-3 rounded-sm shadow-lg flex justify-start bg-gray-100 no-underline"
          >
            Thẻ khóa :{home.totalCardLocked}
          </Link>
        </div>
        <div className="col-span-2">
          <Link
            to=""
            className="p-5 mt-3 rounded-sm shadow-lg flex justify-start bg-gray-100 no-underline"
          >
            <FaMoneyCheckAlt
              style={{ fontSize: 40, marginTop: -7, marginRight: 10 }}
            />
            Tổng tiền GD LNH :
            {home.moneyExternalTransaction == null
              ? 0
              : home.moneyExternalTransaction.toLocaleString("en-US", {
                  style: "decimal",
                  useGrouping: true,
                })}
          </Link>
        </div>
        <div className="col-span-2">
          <Link
            to=""
            className="p-5 mt-3 rounded-sm shadow-lg flex justify-start bg-gray-100 no-underline"
          >
            <FaMoneyCheckAlt
              style={{ fontSize: 40, marginTop: -7, marginRight: 10 }}
            />
            Tổng tiền GD NB :
            {home.moneyInternalTransaction == null
              ? 0
              : home.moneyInternalTransaction.toLocaleString("en-US", {
                  style: "decimal",
                  useGrouping: true,
                })}
          </Link>
        </div>
        <div className="col-span-2">
          <Link
            to=""
            className="p-5 mt-3 rounded-sm shadow-lg flex justify-start bg-gray-100 no-underline"
          >
            <AiFillIdcard
              style={{ fontSize: 40, marginTop: -7, marginRight: 10 }}
            />
            Tổng số thẻ :{home.totalCard}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
