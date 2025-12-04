import { lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout"; // Import the layout
import PrivateRoute from "./PrivateRoute";

const FrontPage = lazy(() => import("../pages/auth/FrontPage"));
const Login = lazy(() => import("../pages/auth/Login"));
const Details = lazy(() => import("../pages/auth/Details"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const LeadManagement = lazy(() => import("../pages/admin/LeadManagement"));
const AddLead = lazy(() => import("../pages/admin/AddLead"));

function Router() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/"  Component={FrontPage} />
          <Route path="/login" Component={Login} />
            <Route path="/Details" Component={Details} />
          <Route element={<PrivateRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/dashboard" Component={Dashboard} />
              <Route path="/lead-management" Component={LeadManagement} />
              <Route path="/add-lead" Component={AddLead} />
            </Route>
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
