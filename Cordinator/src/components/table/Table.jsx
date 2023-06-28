import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { cordinatorEvents } from "../../utils/Constants";
import { useSelector } from "react-redux";
const List = () => {
  const token = useSelector((state) => state.token);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const cord = useSelector((state) => state.cord);
  const [event, setEvents] = useState([]);
  const getEvents = async () => {
    const cordID = cord.id;
    axios
      .get(
        `${cordinatorEvents}${cordID}`,
        { cordID: cordID },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setEvents(response.data);
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
    getEvents();
  }, []);
  return (
    <div className="bottomevent">
      {event ? (
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">ID</TableCell>
                <TableCell className="tableCell">EVENT NAME</TableCell>
                <TableCell className="tableCell">DATE AVIALIABLE</TableCell>
                <TableCell className="tableCell">CAPACITY</TableCell>
                <TableCell className="tableCell">STATUS</TableCell>
                <TableCell className="tableCell"></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {event?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="tableCell">{row.id}</TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      <img
                        src="https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                        alt=""
                        className="image"
                      />
                      {row.event.name}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">
                    {row.event.date_available}
                  </TableCell>
                  <TableCell className="tableCell">{row.capacity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ""
      )}
    </div>
  );
};

export default List;
