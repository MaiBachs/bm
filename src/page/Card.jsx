import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import cardApi from "../apis/card.api";

export default function Card() {
  const [lockedFalseData, setLockedFalseData] = useState([]);
  const [lockedTrueData, setLockedTrueData] = useState([]);

  const { data: lockedTrueDataTab, status: lockedTrueStatus } = useQuery(
    ["cardLockedTrue"],
    () => {
      return cardApi.getCardList({ locked: true, page: 1, pageSize: 20 });
    }
  );

  const { data: lockedFalseDataTab, status: lockedFalseStatus } = useQuery(
    ["cardLockedFalse"],
    () => {
      return cardApi.getCardList({ locked: false, page: 1, pageSize: 20 });
    }
  );
  const sortCardsById = (cards) => {
    return cards.slice().sort((a, b) => a.id - b.id);
  };

  useEffect(() => {
    if (lockedTrueStatus === "success" && lockedTrueDataTab) {
      setLockedTrueData(sortCardsById(lockedTrueDataTab.data.creditCards));
    }
  }, [lockedTrueStatus, lockedTrueDataTab]);

  useEffect(() => {
    if (lockedFalseStatus === "success" && lockedFalseDataTab) {
      setLockedFalseData(sortCardsById(lockedFalseDataTab.data.creditCards));
    }
  }, [lockedFalseStatus, lockedFalseDataTab]);

  const handleToggleLock = (card, isLocked) => {
    const updateCard = { ...card, locked: isLocked };
    if (isLocked) {
      setLockedFalseData((prevData) =>
        sortCardsById(prevData.filter((c) => c.id !== card.id))
      );
      setLockedTrueData((prevData) => sortCardsById([...prevData, updateCard]));
    } else {
      setLockedTrueData((prevData) =>
        sortCardsById(prevData.filter((c) => c.id !== card.id))
      );
      setLockedFalseData((prevData) =>
        sortCardsById([...prevData, updateCard])
      );
    }
    if (isLocked) {
      cardApi.getCardLockDetail(card.id);
    } else {
      cardApi.getCardUnLockDetail(card.id);
    }
  };

  return (
    <div className="mx-auto p-1 grid grid-cols-2 span-3 gap-4">
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
              <th className="p-2 text-center">Mở khóa</th>
            </tr>
          </thead>
          <tbody>
            {lockedTrueData.map((card) => (
              <tr key={card.id}>
                <td className="p-2 text-center">{card.id}</td>
                <td className="p-2 text-center">{card.ccNumber}</td>
                <td className="p-2 text-center">{card.maximumLimit}</td>
                <td className="p-2 text-center">{card.expiryDate}</td>
                <td className="p-2 text-center">{card.creditScore}</td>
                <td className="p-2 text-center">
                  <button 
                    style={{backgroundColor: "green", color:"white", width:  60, height: 30, borderRadius: 3}}
                    checked={card.locked}
                    onClick={() => handleToggleLock(card, false)}
                  >Unlock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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
              <th className="p-2 text-center">Khóa thẻ</th>
            </tr>
          </thead>
          <tbody>
            {lockedFalseData.map((card) => (
              <tr key={card.id}>
                <td className="p-2 text-center">{card.id}</td>
                <td className="p-2 text-center">{card.ccNumber}</td>
                <td className="p-2 text-center">{card.maximumLimit}</td>
                <td className="p-2 text-center">{card.expiryDate}</td>
                <td className="p-2 text-center">{card.creditScore}</td>
                <td className="p-2 text-center">
                  <button
                    style={{backgroundColor: "red", color:"white", width:  60, height: 30, borderRadius: 3}}
                    checked={card.locked}
                    onClick={() => handleToggleLock(card, true)}
                  >Lock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
