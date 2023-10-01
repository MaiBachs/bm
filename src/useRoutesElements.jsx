import { useRoutes } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Sidebar from "./component/Sidebar";

export default function useRoutesElements() {
  const routeElements = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
        </MainLayout>
      ),
    },
  ]);
  return routeElements;
}
