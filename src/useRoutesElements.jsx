import { useRoutes } from "react-router-dom";
import MainLayout from "./component/MainLayout";
import Sidebar from "./component/Sidebar";

export default function useRoutesElements() {
  const routeElements = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <Sidebar />
        </MainLayout>
      ),
    },
  ]);
  return routeElements;
}
