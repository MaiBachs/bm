import { useRoutes } from "react-router-dom";
import DefaultLayout from "./layout/DefaultLayout";
import Home from "./page/Home";
import Card from "./page/Card";
import Interest from "./page/Interest";
import CustomerLoan from "./page/CustomerLoan";
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
      path: "/interest",
      element: (
        <DefaultLayout>
          <Interest />
        </DefaultLayout>
      ),
    },
    {
      path: "/customer-loan",
      element: (
        <DefaultLayout>
          <CustomerLoan />
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
