import { useRoutes } from "react-router-dom";
import MainLayout from "./component/MainLayout";

import DefaultLayout from "./layout/DefaultLayout";

export default function useRoutesElements() {
  const routeElements = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <DefaultLayout />
        </MainLayout>
      ),
    },
  ]);
  return routeElements;
}
