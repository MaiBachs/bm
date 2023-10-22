import React from "react";
import { useQuery } from "@tanstack/react-query";
import cardApi from "../apis/card.api";

export default function Card() {
  const { data: lockedTrueData, status: lockedTrueStatus } = useQuery(
    ["cardsLockedTrue"],
    () => {
      return cardApi.getCardList({ locked: true, page: 1, pageSize: 20 });
    }
  );

  const { data: lockedFalseData, status: lockedFalseStatus } = useQuery(
    ["cardsLockedFalse"],
    () => {
      return cardApi.getCardList({ locked: false, page: 1, pageSize: 20 });
    }
  );

  if (lockedTrueStatus === "loading" || lockedFalseStatus === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="mx-auto p-1 grid grid-cols-2 span-3 gap-4">
      {lockedTrueData && (
        <div className="col-span-1">
          <h2 className="font-bold text-lg mb-2">Thẻ đã khóa</h2>
          <table className="w-full bg-white border border-gray-200 rounded p-3">
            <thead>
              <tr>
                <th className="p-2 text-center">ID</th>
                <th className="p-2 text-center">Số thẻ</th>
                <th className="p-2 text-center">Giới hạn tối đa</th>
                <th className="p-2 text-center">Ngày hết hạn</th>
                <th className="p-2 text-center">Điểm tín dụng</th>
              </tr>
            </thead>
            <tbody>
              {lockedTrueData.data.creditCards.map((card) => (
                <tr key={card.id}>
                  <td className="p-2 text-center">{card.id}</td>
                  <td className="p-2 text-center">{card.ccNumber}</td>
                  <td className="p-2 text-center">{card.maximumLimit}</td>
                  <td className="p-2 text-center">{card.expiryDate}</td>
                  <td className="p-2 text-center">{card.creditScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {lockedFalseData && (
        <div className="col-span-1">
          <h2 className="font-bold text-lg mb-2">Thẻ đang sử dụng</h2>
          <table className="w-full bg-white border border-gray-200 rounded p-3">
            <thead>
              <tr>
                <th className="p-2 text-center">ID</th>
                <th className="p-2 text-center">Số thẻ</th>
                <th className="p-2 text-center">Giới hạn tối đa</th>
                <th className="p-2 text-center">Ngày hết hạn</th>
                <th className="p-2 text-center">Điểm tín dụng</th>
              </tr>
            </thead>
            <tbody>
              {lockedFalseData.data.creditCards.map((card) => (
                <tr key={card.id}>
                  <td className="p-2 text-center">{card.id}</td>
                  <td className="p-2 text-center">{card.ccNumber}</td>
                  <td className="p-2 text-center">{card.maximumLimit}</td>
                  <td className="p-2 text-center">{card.expiryDate}</td>
                  <td className="p-2 text-center ">{card.creditScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
