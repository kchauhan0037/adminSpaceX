import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const LaunchTimeline = ({ changeclass }) => {
  const [launchData, setLaunchData] = useState([]);
  const [displayedLaunches, setDisplayedLaunches] = useState([]);

  useEffect(() => {
    axios.get("https://api.spacexdata.com/v3/launches").then((response) => {
      setLaunchData(response.data);
    });
  }, []);

  useEffect(() => {
    if (launchData.length > 0) {
      setDisplayedLaunches(launchData);
    }
  }, [launchData]);

  const getLaunchYear = (launchDate) => {
    return new Date(launchDate).getFullYear();
  };

  const uniqueYears = [
    ...new Set(
      launchData.map((launch) => getLaunchYear(launch.launch_date_utc))
    ),
  ];

  return (
    <div
      className={
        changeclass === "Launch Timeline" ? "full-width" : "launch-timeline"
      }
    >
      {uniqueYears.map((year) => (
        <div key={year} className="timeline-year">
          {year}
          <div className="timeline-events">
            {displayedLaunches
              .filter(
                (launch) => getLaunchYear(launch.launch_date_utc) === year
              )
              .map((launch) => (
                <div key={launch.flight_number} className="timeline-event">
                  <div className="timeline-line">
                    <div className="timeline-icon">🚀</div>
                  </div>
                  <div className="timeline-details">
                    <div className="timeline-date">
                      {launch.launch_date_utc}
                    </div>
                    <h3>{launch.mission_name}</h3>
                    <p>{launch.details}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LaunchTimeline;
