import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="mx-auto bg-white">
      <div className="py-1 grid grid-cols-6 gap-3 mt-8">
        <div className="p-5 col-span-6 rounded-sm shadow-lg flex justify-center bg-gray-100">
          {" "}
          Tổng giao dịch :
        </div>
      </div>
      <div className="mt-3 p-1 grid grid-cols-6 gap-5 justify-center">
        <div className="col-span-2">
          <Link
            to="/InterbankTransactions"
            className="p-5 mt-3 rounded-sm shadow-lg flex justify-start bg-gray-100"
          >
            Giao dịch liên ngân hàng :{" "}
          </Link>
        </div>

        <div className="col-span-2">
          <Link
            to="/InternalTransactions"
            className="p-5 mt-3 rounded-sm shadow-lg flex justify-start bg-gray-100"
          >
            Giao dịch nội bộ :{" "}
          </Link>
        </div>
        <div className="col-span-2">
          <Link
            to=""
            className="p-5 mt-3 rounded-sm shadow-lg flex justify-start bg-gray-100"
          >
            Lãi suất :{" "}
          </Link>
        </div>
        <div className="col-span-2">
          <Link
            to="/card"
            className="p-5 mt-3 rounded-sm shadow-lg flex justify-start bg-gray-100"
          >
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Thẻ mới : 10 </th>
                </tr>
              </thead>
              <tbody>
                {Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={index}>
                      <td>Do Duc Dien</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
