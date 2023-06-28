import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import "./style/dark.scss";
import React, { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { useSelector } from "react-redux";
import Signup from "./pages/signup/Signup";

import EventList from "./pages/evenlist/EventList";

import EditEvent from "./components/editEvents/EditEvent";
import Event from "./pages/event/CreateEvent";
import New from "./pages/coordinatorapplication/Profile";
import EditProfile from "./components/profileedit/EditProfile";
import CoordinatorClientList from "./pages/clientOrders/ClientOrders";
import CreateEvent from "./pages/event/CreateEvent";
import ApprovedEventListPage from "./pages/eventapprovallistPage/EventApprovalListPage";
import NonApprovedEventListPage from "./pages/eventapprovallistPage/NonApproveEventListPage";
import PaidEventListPage from "./pages/eventapprovallistPage/PaidEventList";

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const token = useSelector((state) => state.token);
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/cordinator-login" />;
    }
  };
  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Routes>
        <Route
          path="/cordinator-login"
          element={!token ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/cordinator-signup" element={<Signup />} />
        <Route path="/">
          <Route
            index
            element={token ? <Home /> : <Navigate to="/cordinator-login" />}
          />
        </Route>
        <Route path="/application">
          <Route
            index
            element={token ? <New /> : <Navigate to="/cordinator-login" />}
          />
        </Route>
        <Route path="/events">
          <Route
            index
            element={
              token ? <EventList /> : <Navigate to="/cordinator-login" />
            }
          />
        </Route>
        <Route
          path="/add-events"
          element={token ? <CreateEvent /> : <Navigate to="/cordinator-login" />}
        />
        <Route
          path="/Event-Orders"
          element={
            token ? (
              <CoordinatorClientList />
            ) : (
              <Navigate to="/cordinator-login" />
            )
          }
        />
        <Route
          path="/editEvents/:id"
          element={token ? <EditEvent /> : <Navigate to="/cordinator-login" />}
        />
        <Route
          path="/EditApplication"
          element={
            token ? <EditProfile /> : <Navigate to="/cordinator-login" />
          }
        />
        <Route
          path="/approval-booking-list"
          element={
            token ? <ApprovedEventListPage /> : <Navigate to="/cordinator-login" />
          }
        />
        <Route
          path="/nonapproval-booking-list"
          element={
            token ? <NonApprovedEventListPage /> : <Navigate to="/cordinator-login" />
          }
        />
        <Route
          path="/paid-booking-list"
          element={
            token ? <PaidEventListPage /> : <Navigate to="/cordinator-login" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
