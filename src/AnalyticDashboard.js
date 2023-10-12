import react from "react";

class AnalyticDashboard extends react.Component {
  render() {
    return (
      <>
        <div id="analyticboard">
          <h3>Launch Dashboard</h3>
          <div id="upcomig">
            {" "}
            <b>UPCOMING LAUNCH :</b>
            <p>{this.props.upcominglaunch.length}</p>{" "}
          </div>
          <div id="past">
            {" "}
            <b>PAST LAUNCH :</b>
           <p>{this.props.pastlaunches.length}</p>{" "}
          </div>
          <div id="totallauches">
            {" "}
            <b>TOTAL LAUNCH :</b>
            <p>
              {this.props.upcominglaunch.length +
                this.props.pastlaunches.length}
            </p>
          </div>
        </div>
      </>
    );
  }
}

export default AnalyticDashboard;
