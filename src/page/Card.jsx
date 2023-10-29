import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import cardApi from "../apis/card.api";

export default function Card() {
  const [lockedFalseData, setLockedFalseData] = useState([]);
  const [lockedTrueData, setLockedTrueData] = useState([]);

  const { data: lockedTrueDataTab, status: lockedTrueStatus } = useQuery(
    ["cardsLockedTrue"],
    () => {
      return cardApi.getCardList({ locked: true, page: 1, pageSize: 20 });
    }
  );

  const { data: lockedFalseDataTab, status: lockedFalseStatus } = useQuery(
    ["cardsLockedFalse"],
    () => {
      return cardApi.getCardList({ locked: false, page: 1, pageSize: 20 });
    }
  );

  useEffect(() => {
    if (lockedTrueStatus === "success" && lockedTrueDataTab) {
      setLockedTrueData(lockedTrueDataTab.data.creditCards);
    }
  }, [lockedTrueStatus, lockedTrueDataTab]);

  useEffect(() => {
    if (lockedFalseStatus === "success" && lockedFalseDataTab) {
      setLockedFalseData(lockedFalseDataTab.data.creditCards);
    }
  }, [lockedFalseStatus, lockedFalseDataTab]);

  const handleToggleLock = (card, isLocked) => {
    // Create a copy of the card with the updated locked state
    const updatedCard = { ...card, locked: isLocked };

    // Move the card between the two tables
    if (isLocked) {
      setLockedFalseData((prevData) =>
        prevData.filter((c) => c.id !== card.id)
      );
      setLockedTrueData((prevData) => [...prevData, updatedCard]);
    } else {
      setLockedTrueData((prevData) => prevData.filter((c) => c.id !== card.id));
      setLockedFalseData((prevData) => [...prevData, updatedCard]);
    }
  };

  return (
    <div className="mx-auto p-1 grid grid-cols-2 span-3 gap-4">
      {/* Bảng thẻ đã khóa */}
      <div className="col-span-1">
        <h2 className="font-bold text-lg mb-2">Thẻ đã khóa</h2>
        <table className="w-full bg-white border border-gray-200 rounded p-3">
          {/* Table header */}
          <thead>
            <tr>
              <th className="p-2 text-center">ID</th>
              <th className="p-2 text-center">Số thẻ</th>
              <th className="p-2 text-center">Giới hạn tối đa</th>
              <th className="p-2 text-center">Ngày hết hạn</th>
              <th className="p-2 text-center">Điểm tín dụng</th>
              <th className="p-2 text-center">Mở khóa</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {lockedTrueData.map((card) => (
              <tr key={card.id}>
                <td className="p-2 text-center">{card.id}</td>
                <td className="p-2 text-center">{card.ccNumber}</td>
                <td className="p-2 text-center">{card.maximumLimit}</td>
                <td className="p-2 text-center">{card.expiryDate}</td>
                <td className="p-2 text-center">{card.creditScore}</td>
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={card.locked}
                    onChange={() => handleToggleLock(card, false)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bảng thẻ đang sử dụng */}
      <div className="col-span-1">
        <h2 className="font-bold text-lg mb-2">Thẻ đang sử dụng</h2>
        <table className="w-full bg-white border border-gray-200 rounded p-3">
          {/* Table header */}
          <thead>
            <tr>
              <th className="p-2 text-center">ID</th>
              <th className="p-2 text-center">Số thẻ</th>
              <th className="p-2 text-center">Giới hạn tối đa</th>
              <th className="p-2 text-center">Ngày hết hạn</th>
              <th className="p-2 text-center">Điểm tín dụng</th>
              <th className="p-2 text-center">Khóa thẻ</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {lockedFalseData.map((card) => (
              <tr key={card.id}>
                <td className="p-2 text-center">{card.id}</td>
                <td className="p-2 text-center">{card.ccNumber}</td>
                <td className="p-2 text-center">{card.maximumLimit}</td>
                <td className="p-2 text-center">{card.expiryDate}</td>
                <td className="p-2 text-center">{card.creditScore}</td>
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={card.locked}
                    onChange={() => handleToggleLock(card, true)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
