import React, { Component } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import "./App.css";

class LaunchpadMap extends Component {
  state = {
    launchpads: [],
  };

  componentDidMount() {
    axios
      .get("https://api.spacexdata.com/v3/launchpads")
      .then((response) => {
        const launchpads = response.data;
        this.setState({ launchpads });

        this.createMap(launchpads);
      })
      .catch((error) => {
        console.error("Error fetching launchpad data:", error);
      });
  }

  createMap = (launchpads) => {
    const center =
      launchpads.length > 0
        ? [launchpads[0].location.latitude, launchpads[0].location.longitude]
        : [39.8283, -98.5795];

    const map = L.map("map").setView(center, 3);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    launchpads.forEach((launchpad) => {
      const marker = L.marker(
        [launchpad.location.latitude, launchpad.location.longitude],
        {
          icon: L.divIcon({ className: "rocket-icon", html: "🚀" }),
        }
      ).addTo(map);
      marker.bindPopup(launchpad.location.name);
    });
  };

  render() {
    return (
      <div
        id="map"
        className={
          this.props.changeclass === "Launchpad Map" ? "full-width" : ""
        }
      ></div>
    );
  }
}

export default LaunchpadMap;
