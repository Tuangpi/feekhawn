import { useState } from "react";
import "./dashboard.css";

const Dashboard = () => {
  const d = new Date();
  const month12 = [
    { id: "0", name: "January" },
    { id: "1", name: "February" },
    { id: "2", name: "March" },
    { id: "3", name: "April" },
    { id: "4", name: "May" },
    { id: "5", name: "June" },
    { id: "6", name: "July" },
    { id: "7", name: "August" },
    { id: "8", name: "September" },
    { id: "9", name: "October" },
    { id: "10", name: "November" },
    { id: "11", name: "December" },
  ];
  const month = useState(month12[d.getMonth()-1].name + " " + d.getFullYear());
  return (
    <div className="card">
      <div className="dash-board-title">Welcome to Fee Khawn Admin</div>
      <div className="dash-board">Statistics for {month}</div>
      <div className="Grid__Container">
        {/* <Link to="/users"> */}
        {/* <div className="Stat__Card_1 Stat__Card">
          <div className="Stat__Container">
            <div className="Stat__Title">Users</div>
            <div className="Stat__Content">23</div>
          </div>
        </div> */}
        {/* </Link> */}
        {/* <Link to="/customers"> Stat__Card_5 Stat__Card*/}
        <div className="Stat__Card_1 Stat__Card">
          <div className="Stat__Container">
            <div className="Stat__Title">Customers</div>
            <div className="Stat__Content">62</div>
          </div>
        </div>
        {/* </Link>
  <Link to="/Invoices"> */}
        <div className="Stat__Card_2 Stat__Card">
          <div className="Stat__Container">
            <div className="Stat__Title">Bill Pe</div>
            <div className="Stat__Content">20</div>
          </div>
        </div>
        {/* </Link> */}
        <div className="Stat__Card_3 Stat__Card">
          <div className="Stat__Container">
            <div className="Stat__Title">Bill Pelo</div>
            <div className="Stat__Content">2</div>
          </div>
        </div>
        <div className="Stat__Card_6 Stat__Card">
          <div className="Stat__Container">
            <div className="Stat__Title">Khawnchhuah</div>
            <div className="Stat__Content"><span className="rs">Rs:</span> 62,156 /-</div>
          </div>
        </div>
        <div className="Stat__Card_4 Stat__Card">
          <div className="Stat__Container">
            <div className="Stat__Title">Khawnbak</div>
            <div className="Stat__Content"><span className="rs">Rs:</span> 490 /-</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
