import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CollectionsBookmarkOutlinedIcon from "@mui/icons-material/CollectionsBookmarkOutlined";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "../../Redux/store";


const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const dispatchs = useDispatch();
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">CORDPANEl</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>

          <Link to="/application" style={{ textDecoration: "none" }}>
            <li>
              <InsertDriveFileOutlinedIcon className="icon" />

              <span>Profile</span>
            </li>
          </Link>
          <p className="title">EVENT MANAGEMENT</p>
          <Link to="/events" style={{ textDecoration: "none" }}>
            <li>
              <CollectionsBookmarkOutlinedIcon className="icon" />

              <span>Events</span>
            </li>
          </Link>
          <Link to="/Event-Orders" style={{ textDecoration: "none" }}>
            <li>
              <CollectionsBookmarkOutlinedIcon className="icon" />

              <span>Orders</span>
            </li>
          </Link>
          <Link to="/approval-booking-list" style={{ textDecoration: "none" }}>
            <li>
              <CollectionsBookmarkOutlinedIcon className="icon" />

              <span>ApprovedList</span>
            </li>
          </Link>
          <Link to="/nonapproval-booking-list" style={{ textDecoration: "none" }}>
            <li>
              <CollectionsBookmarkOutlinedIcon className="icon" />

              <span>Non ApprovedList</span>
            </li>
          </Link>
          <Link to="/paid-booking-list" style={{ textDecoration: "none" }}>
            <li>
              <CollectionsBookmarkOutlinedIcon className="icon" />

              <span>Paid Booking List</span>
            </li>
          </Link>
          {/* <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <li>
            <CreditCardIcon className="icon" />
            <span>Bookings</span>
          </li>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Delivery</span>
          </li> */}
          <li>
            <ExitToAppOutlinedIcon className="icon" />
            <span onClick={() => dispatchs(setLogout())}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
