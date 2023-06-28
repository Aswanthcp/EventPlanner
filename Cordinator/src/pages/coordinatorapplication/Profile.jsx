// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "../../utils/axios";
// import { getCordinators } from "../../utils/Constants";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import "./new.scss";
// import ProfileComponent from "../../components/profile/Profilecomponent";

// const New = ({ inputs, title }) => {
//   const [info, setInfo] = useState({});
//   const cord = useSelector((state) => state.cord);
//   const token = useSelector((state) => state.token);

//   const getCordinator = async () => {
//     const cordID = cord.id;
//     try {
//       const response = await axios.get(`${getCordinators}${cordID}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log(response.data);
//       setInfo(response.data);
//     } catch (error) {
//       if (
//         error.response &&
//         error.response.status >= 400 &&
//         error.response.status <= 500
//       ) {
//         console.log(error.response.data.message);
//       }
//     }
//   };

//   useEffect(() => {
//     getCordinator();
//   }, []);

//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="top">
//           <h1 className="title">PROFILE</h1>
//         </div>
//         <div className="bottom">
//           <div className="left">
//             <div style={{ color: "red" }}>
//               <Link
//                 to="/EditApplication"
//                 style={{ textDecoration: "none", color: "green" }}
//               >
//                 <EditOutlinedIcon />
//               </Link>
//             </div>
//           </div>
//           <div className="right">
//             <ProfileComponent
//               username={info?.username}
//               email={info?.email}
//               phone_number={info?.phone_number}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default New;
import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import React, { useEffect, useState } from "react";
import "./new.scss";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import axios from "../../utils/axios";
import { Link, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  cordinatorEvents,
  getCordinators,
  geteventURL,
  venderURL,
} from "../../utils/Constants";
import { useSelector } from "react-redux";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ProfileComponent from "../../components/profile/Profilecomponent";
const ProfilePage = ({ inputs, title }) => {
  const [info, setInfo] = useState();
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    currentPage: 1,
    totalPages: 1,
    results: [],
  });
  const cord = useSelector((state) => state.cord);
  const token = useSelector((state) => state.token);
  const getUsersList = () => {
    axios
      .get(`${cordinatorEvents}${cord.id}?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setPagination(data);
      })
      .catch(handleError);
  };

  const handleError = (error) => {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : "Network error. Please try again later.";
    toast.error(errorMessage, {
      position: "top-right",
    });
  };
  const getvenderinator = async () => {
    const cordID = cord.id;
    axios
      .get(
        `${getCordinators}${cordID}`,
        { cordID: cordID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setInfo(response.data);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          console.log(error.response.data.message);
        }
      });
  };
  useEffect(() => {
    getvenderinator();
    getUsersList();
  }, []);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1 className="title">PROFILE</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <div style={{ color: "red" }}>
              <Link
                to="/EditApplication"
                style={{ textDecoration: "none", color: "green" }}
              >
                <EditOutlinedIcon />
              </Link>
            </div>
          </div>
          <div className="right">
            <ProfileComponent
              username={info?.username}
              imageUrl={info?.imageUrl}
              email={info?.email}
              phone_number={info?.phone_number}
            />
          </div>
        </div>
        <div className="bottom">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell">ID</TableCell>
                  <TableCell className="tableCell">EVENT NAME</TableCell>
                  <TableCell className="tableCell">CAPACITY</TableCell>
                  <TableCell className="tableCell">LOCATION</TableCell>
                  <TableCell className="tableCell">PRICE</TableCell>
                  <TableCell className="tableCell">ACTIVE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pagination.results.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="tableCell">{row.id}</TableCell>
                    <TableCell>
                      <Link to={`/editEvents/${row.id}`}>
                        <div className="cellWrapper">
                          <img
                            src={
                              row.imageUrl
                                ? row.imageUrl
                                : "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            }
                            alt="image-item"
                            className="image"
                          />
                          {row.event.name}
                        </div>
                      </Link>
                    </TableCell>
                    <TableCell className="tableCell">{row.capacity}</TableCell>
                    <TableCell className="tableCell">{row.location}</TableCell>
                    <TableCell className="tableCell">{row.price}</TableCell>
                    <TableCell className="tableCell">
                      {row.is_active ? "Active" : "Disactivate"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
