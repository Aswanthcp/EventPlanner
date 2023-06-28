
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import AddEvent from "../../components/addEvent/addEvents";
const CreateEvent = () => {
  
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <AddEvent />
        
      </div>
    </div>
  );
};

export default CreateEvent;
