import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./style.scss";
import PaidEventListComponent from "../../components/booking/PaidEventComponet";
const PaidEventListPage = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <PaidEventListComponent />
      </div>
    </div>
  );
};

export default PaidEventListPage;
