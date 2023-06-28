
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./style.scss";
import NonApprovalEventComponent from "../../components/booking/NonApprovalConponent";
const NonApprovedEventListPage = () => {

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <NonApprovalEventComponent />
        
      </div>
    </div>
  );
};

export default NonApprovedEventListPage;
