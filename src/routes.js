import * as React from "react";
import { useRoutes } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Schema
// import {useQuery} from "@apollo/client"
// import {GET_USER_LOGIN} from "../src/Schema/user"

//Page
import Layout from "./Layout/Layout";
import Dashboard from "./Pages/Dashboard";
import StorageRoom from "./Pages/StorageRoom";
import RawMaterial from "./Pages/RawMaterial";
import RawMaterialRoom from "./Component/StorageRoom/RawMaterialRoom";
import Product from "./Pages/Product";
import User from "./Pages/User";
import UserActions from "./Pages/UserActions"
import SystemSetting from "./Pages/SystemSetting";
import Report from "./Pages/Report";
import Supplies from "./Pages/Supplies";
import Sales from "./Pages/Sales";
import Production from "./Pages/Production";
import ProductCategories from "./Component/Product/ProductCategories";
import RawMaterialCategory from "./Component/RawMaterial/RawMaterialCategory";
import Purchase from "./Component/StorageRoom/Purchase";
import RoomDetail from "./Component/StorageRoom/RoomDetail";
import Customer from "./Component/Sales/Customer";
import Login from "./Pages/Login";
import Page404 from "./Pages/Page404";
import ForgotPasswork from "./Pages/ForgotPasswork";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";
import PrintInvoice from "./Component/Sales/PrintInvoice";
import ProductDetails from "./Component/Product/ProductDetails";
import Role from "./Component/Setting/Role";
import PurchaseMaterial from "./Component/PurchaseRawMaterial/PurchaseMaterial";
import Unit from "./Component/Setting/Unit";
import ViewVoid from "./Component/Sales/ViewVoid";

export default function Router({ prefersDarkMode, setPrefersDarkMode }) {

  //Apollo
  const { state } = useContext(AuthContext);
  const { user } = state;

  // console.log(state,'state')

  // const [systemSettingPath, setSystemSettingPath] = React.useState('')
  // const [reportPath, setreportPath] = React.useState('')

  const LoginPage = useRoutes([
    { path: "", element: <Login /> },
    { path: "login", element: <Login /> },
    { path: "forgotpassword", element: <ForgotPasswork /> },
    // { path: "*" , element: <Page404 /> },
  ]);

  const Content = useRoutes([
    {
      path: "/",
      element: (
        <Layout
          to="/dashboard"
          prefersDarkMode={prefersDarkMode}
          setPrefersDarkMode={setPrefersDarkMode}
        />
      ),
      children: [
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "dashboard", element: <Dashboard /> },

        { path: "storage-room", element: <StorageRoom /> },
        { path: "storage-room/roomdetail", element: <RoomDetail /> },
        { path: "storage-room/purchase", element: <Purchase /> },
        { path: "storage-room/raw-material", element: <RawMaterialRoom /> },
       
        
        { path: "purchase-material", element: <PurchaseMaterial />},

        { path: "raw-material", element: <RawMaterial /> },
        { path: "raw-material/categories", element: <RawMaterialCategory /> },

        { path: "product", element: <Product /> },
        { path: "product/categories", element: <ProductCategories /> },
        { path: "product/details", element: <ProductDetails /> },

        { path: "sales", element: <Sales /> },
        { path: "sales/void", element: <ViewVoid /> },
        { path: "sales/print", element: <PrintInvoice /> },

        { path: "customer", element: <Customer /> },
        { path: "production", element: <Production /> },
        { path: "supplies", element: <Supplies /> },
        { path: "user", element: <User /> },
        { path: "action", element: <UserActions /> },
        { path: "report", element: <Report /> },
        { path: "system-setting", element: <SystemSetting /> },
        { path: "system-setting/role", element: <Role /> },
        { path: "system-setting/unit", element: <Unit /> },

        { path: "*", element: <Page404 /> },
      ],
    },
  ]);

  if (user) {
    return Content;
  } else {
    return LoginPage;
  }
}
