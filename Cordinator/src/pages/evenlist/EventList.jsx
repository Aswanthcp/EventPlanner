

// import "./eventlist.scss";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import axios from "../../utils/axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import Button from "@mui/material/Button";
// import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
// import { Link, useNavigate } from "react-router-dom";
// import { cordinatorEvents } from "../../utils/Constants";
// import { experimentalStyled as styled } from "@mui/material/styles";

// const EventList = () => {
//   const [page, setPage] = useState(1);
//   const token = useSelector((state) => state.token);
//   const user = useSelector((state) => state.cord);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();
//   const [pagination, setPagination] = useState({
//     hasNextPage: false,
//     hasPrevPage: false,
//     currentPage: 1,
//     totalPages: 1,
//     results: [],
//   });

//   const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//     ...theme.typography.body2,
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   }));

//   const getEventList = () => {
//     axios
//       .get(`${cordinatorEvents}${user.id}?page=${page}`, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then(({ data }) => {
//         console.log(data);
//         setPagination(data);
//       })
//       .catch(handleError);
//   };

//   const handleError = (error) => {
//     const errorMessage =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : "Network error. Please try again later.";
//     toast.error(errorMessage, {
//       position: "top-right",
//     });
//   };

//   useEffect(() => {
//     getEventList();
//   }, [page]);

//   const nextPage = () => {
//     setPage((prevPage) => prevPage + 1);
//   };

//   const prePage = () => {
//     setPage((prevPage) => prevPage - 1);
//   };

//   return (
//     <div className="lists">
//       <Sidebar />
//       <div className="ListsContainer">
//         <Navbar />
//         <div className="bottom">
//           <h1 className="title">ITEMS LIST</h1>
//           <>
//             <div className="datatableTitle">
//               Add New Events
//               <Link to="/add-Items">
//                 <button className="link" onClick="">
//                   Add New
//                 </button>
//               </Link>
//             </div>

//             <div className="search">
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="input-search"
//               />
//               <SearchOutlinedIcon className="search-icon" />
//             </div>
//             <TableContainer component={Paper}>
//               <Table sx={{ minWidth: 650 }} aria-label="user table">
//                 <TableHead>
//                   <TableRow>
//                     <TableCell className="tableCell">ID</TableCell>
//                     <TableCell className="tableCell">EVENT NAME</TableCell>
//                     {/* <TableCell className="tableCell">DATE AVIALIABLE</TableCell> */}
//                     <TableCell className="tableCell">CAPACITY</TableCell>
//                     <TableCell className="tableCell">LOCATION</TableCell>
//                     <TableCell className="tableCell">PRICE</TableCell>
//                     <TableCell className="tableCell">ACTIVE</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {pagination.results.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={6}>
//                         There are no Coordinators Events
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     pagination?.results.map((row) => (
//                       <TableRow key={row.id}>
//                         <TableCell className="tableCell">{row.id}</TableCell>
//                         <TableCell>
//                           <Link
//                             to={`/items/${row.item_type?.item_type}/${row.id}`}
//                           >
//                             <div className="cellWrapper">
//                               <img
//                                 src={
//                                   row.imageUrl
//                                     ? row.imageUrl
//                                     : "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
//                                 }
//                                 alt="image-item"
//                                 className="image"
//                               />
//                               {row.event.name}
//                             </div>
//                           </Link>
//                         </TableCell>
//                         <TableCell className="tableCell">
//                           {row.capacity}
//                         </TableCell>
//                         <TableCell className="tableCell">{row.location}</TableCell>
//                         <TableCell className="tableCell">{row.price}</TableCell>
//                         <TableCell className="tableCell">{row.is_active?"Active":"Disactivate"}</TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//             <div className="pagination">
//               {pagination.hasPrevPage && (
//                 <Button onClick={prePage} variant="outlined">
//                   Previous
//                 </Button>
//               )}
//               {pagination.hasNextPage && (
//                 <Button onClick={nextPage} variant="outlined">
//                   Next
//                 </Button>
//               )}
//             </div>
//             <ToastContainer position="top-right" />
//           </>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventList;
import "./eventlist.scss";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { cordinatorEvents } from "../../utils/Constants";
import { styled } from "@mui/material/styles";

const EventList = () => {
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.cord);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    hasNextPage: false,
    hasPrevPage: false,
    currentPage: 1,
    totalPages: 1,
    results: [],
  });
  const [searchInput, setSearchInput] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const getEventList = () => {
    axios
      .get(`${cordinatorEvents}${user.id}?page=${page}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        console.log(data);
        setPagination(data);

        // Filter results based on search input
        const filtered = data.results.filter((row) =>
          row.event.name.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredResults(filtered);
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

  useEffect(() => {
    getEventList();
  }, [page, searchInput]);

  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prePage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  };

  return (
    <div className="lists">
      <Sidebar />
      <div className="ListsContainer">
        <Navbar />
        <div className="bottom">
          <h1 className="title">ITEMS LIST</h1>
          <>
            <div className="datatableTitle">
              Add New Events
              <Link to="/add-events">
                <button className="link" onClick="">
                  Add New
                </button>
              </Link>
            </div>

            <div className="search">
              <input
                type="text"
                placeholder="Search"
                className="input-search"
                value={searchInput}
                onChange={handleSearchChange}
              />
              <SearchOutlinedIcon className="search-icon" />
            </div>
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
                  {filteredResults.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6}>
                        There are no Coordinators Events
                      </TableCell>
                    </TableRow>
                  ) : (
                    (filteredResults.length > 0 ? filteredResults : pagination.results).map((row) => (
                      <TableRow key={row.id}>
                        <TableCell className="tableCell">{row.id}</TableCell>
                        <TableCell>
                          <Link
                            to={`/editEvents/${row.id}`}
                          >
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
                        <TableCell className="tableCell">
                          {row.capacity}
                        </TableCell>
                        <TableCell className="tableCell">{row.location}</TableCell>
                        <TableCell className="tableCell">{row.price}</TableCell>
                        <TableCell className="tableCell">{row.is_active?"Active":"Disactivate"}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <div className="pagination">
            <Button
              variant="contained"
              color="primary"
              onClick={prePage}
              disabled={!pagination.hasPrevPage}
            >
              Previous
            </Button>
            <span>
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <Button
              variant="contained"
              color="primary"
              onClick={nextPage}
              disabled={!pagination.hasNextPage}
            >
              Next
            </Button>
          </div>
            <ToastContainer position="top-right" />
          </>
        </div>
      </div>
    </div>
  );
};

export default EventList;
