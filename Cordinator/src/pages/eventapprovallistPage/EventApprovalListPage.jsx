
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import ApprovalEventComponent from "../../components/booking/ApprovalCompenent";
import "./style.scss";
const ApprovedEventListPage = ({approval}) => {

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <ApprovalEventComponent  approval={approval}/>
        
      </div>
    </div>
  );
};

export default ApprovedEventListPage;
