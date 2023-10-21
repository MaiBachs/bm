import React from "react";
import useQueryConfig from "../hooks/useQueryConfig";
import useQueryParams from "../hooks/useQueryParams";
import { useQuery } from "@tanstack/react-query";
import cardApi from "../apis/card.api";

export default function Card() {
  const queryConfig = useQueryConfig();
  const queryParams = useQueryParams();
  const { data } = useQuery({
    queryKey: ["card", queryParams],
    queryFn: () => {
      return cardApi.getCardList(queryParams);
    },
    keepPreviousData: true,
    staleTime: 3 * 60 * 1000,
    onSuccess: (fetchedData) => {
      console.log("Data fetched successfully: ", fetchedData);
    },
  });
  return <div>Card</div>;
}
