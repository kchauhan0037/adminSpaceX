import "./App.css";
import React from "react";
import axios from "axios";
import AnalyticDashboard from "./AnalyticDashboard";
import LaunchBarChart from "./LaunchBarChart";
import LaunchTimeline from "./LaunchTimeline";
import LaunchpadMap from "./LaunchpadMap";
import TreeMenu from "./TreeMenu";

class App extends React.Component {
  state = {
    analyticdata: [],
    upcominglaunch: [],
    launchovertime: [],
    launchpads: [],
    selectedComponent: "Analytic Dashboard",
    userLoggedIn: false,
    showMenuDropdown: false,
  };

  componentDidMount() {
    axios
      .get("https://api.spacexdata.com/v3/launches/past")
      .then((response) => {
        this.setState({ analyticdata: response.data });
      });

    axios
      .get("https://api.spacexdata.com/v3/launches/upcoming")
      .then((response) => {
        this.setState({ upcominglaunch: response.data });
      });

    axios.get("https://api.spacexdata.com/v3/launches").then((response) => {
      this.setState({ launchovertime: response.data });
    });

    axios.get("https://api.spacexdata.com/v3/landpads").then((response) => {
      this.setState({ launchpads: response.data });
    });
  }

  handleMenuItemClick = (component) => {
    this.setState({ selectedComponent: component });
  };

  toggleMenuDropdown = () => {
    this.setState((prevState) => ({
      showMenuDropdown: !prevState.showMenuDropdown,
    }));
  };

  handleLogin = () => {
    this.setState({ userLoggedIn: true, showMenuDropdown: false });
  };

  handleLogout = () => {
    this.setState({ userLoggedIn: false, showMenuDropdown: false });
  };

  render() {
    const wrapper2Class =
      this.state.selectedComponent === "Analytic Dashboard" ? "full-width" : "";
    return (
      <>
        {console.log(this.state.analyticdata)}
        {console.log(this.state.upcominglaunch)}

        <nav id="topbar">
          <p id="webname">Space-X Data</p>
          <div id="topitems">
            {this.state.userLoggedIn && (
              <div id="userwrapper">
                <i class="fa-solid fa-user"></i> <span> User Name</span>
              </div>
            )}

            <div id="menueicon" onClick={this.toggleMenuDropdown}>
              <i className="fa-solid fa-bars"></i>
              {this.state.showMenuDropdown && (
                <div id="menu-dropdown">
                  {this.state.userLoggedIn ? (
                    <div onClick={this.handleLogout}>Logout</div>
                  ) : (
                    <div onClick={this.handleLogin}>Login</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>

        {!this.state.userLoggedIn && (
          <div id="loginalert">
            <h1>click above on the menu to login</h1>
          </div>
        )}

        {this.state.userLoggedIn && (
          <div id="container">
            <TreeMenu onMenuItemClick={this.handleMenuItemClick}></TreeMenu>

            <div id="wrapper2" className={wrapper2Class}>
              {this.state.selectedComponent === "Analytic Dashboard" && (
                <AnalyticDashboard
                  pastlaunches={this.state.analyticdata}
                  upcominglaunch={this.state.upcominglaunch}
                />
              )}

              {this.state.selectedComponent === "Launch Bar Chart" && (
                <LaunchBarChart
                  launchesData={this.state.launchovertime}
                  changeclass={this.state.selectedComponent}
                />
              )}

              {this.state.selectedComponent === "Launchpad Map" && (
                <LaunchpadMap
                  launchpads={this.state.launchpads}
                  changeclass={this.state.selectedComponent}
                />
              )}

              {this.state.selectedComponent === "Launch Timeline" && (
                <LaunchTimeline changeclass={this.state.selectedComponent} />
              )}

              <div
                id="graphicdetails"
                className={
                  this.state.selectedComponent !== "Analytic Dashboard"
                    ? "notdisplay"
                    : ""
                }
              >
                <LaunchpadMap
                  launchpads={this.state.launchpads}
                  changeclass={this.state.selectedComponent}
                />
                <LaunchBarChart launchesData={this.state.launchovertime} />
                <LaunchTimeline />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default App;
