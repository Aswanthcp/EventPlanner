import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import DailyRevenueGraph from "../../components/chart/daily/Daily";
import Month from "../../components/chart/monthly/Monthly";
import Weekly from "../../components/chart/weakly/weekly";
import Year from "../../components/chart/yearly/yearly";
import { useState } from "react";
import { coordinatorCount, coordinatoreventCount, coordinatoreventEarining } from "../../utils/Constants";
const Home = () => {
  

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="events"  url={coordinatoreventCount}/>
          <Widget type="order" url={coordinatorCount} />
          <Widget type="earning" url={coordinatoreventEarining} />
          {/* <Widget type="balance" /> */}
        </div>
        <div className="listContainer">
          <div className="listTitle">Total Packages</div>
          <div className="charts">
            <DailyRevenueGraph title="DAILY  BOOKING" aspect={2 / 1} />
            <Weekly title="WEEKLY  BOOKING" aspect={2 / 1} />
          </div>
          <div className="charts">
            <Month title="MONTHLY BOOKING" aspect={2 / 1} />
            <Year title="YEARLY BOOKNIG" aspect={2 / 1} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
