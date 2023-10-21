import omitBy from "lodash/omitBy";
import isUndefined from "lodash/isUndefined";
import useQueryParams from "./useQueryParams";

export default function useQueryConfig() {
  const queryParams = useQueryParams();
  const queryConfig = omitBy(
    {
      page: queryParams.page || "1",
      pageSize: queryParams.pageSize || "20",
      locked: queryParams.locked,
    },
    isUndefined
  );
  return queryConfig;
}
