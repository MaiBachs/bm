import { useRoutes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./page/Home";
import Card from "./page/Card";
import InterbankTransactions from "./page/InterbankTransactions";
import InternalTransactions from "./page/InternalTransactions";
import StockChart from "./page/StockChart";
import Header from "./component/Header";
import Login from "./page/Login";
import Register from "./page/Register";

export default function useRoutesElements() {
  const routeElements = useRoutes([
    {
      path: "/",
      element: (
        <DefaultLayout>
          <Home />
        </DefaultLayout>
      ),
    },
    {
      path: "/card",
      element: (
        <DefaultLayout>
          <Card />
        </DefaultLayout>
      ),
    },
    {
      path: "/interbanktransactions",
      element: (
        <DefaultLayout>
          <InterbankTransactions />
        </DefaultLayout>
      ),
    },
    {
      path: "/internaltransactions",
      element: (
        <DefaultLayout>
          <InternalTransactions />
        </DefaultLayout>
      ),
    },
    {
      path: "/stockchart",
      element: (
        <DefaultLayout>
          <StockChart />
        </DefaultLayout>
      ),
    },
    {
      path: "/login",
      element: (
        <Header>
          <Login />
        </Header>
      ),
    },
    {
      path: "/register",
      element: (
        <Header>
          <Register />
        </Header>
      ),
    },
  ]);
  return routeElements;
}
