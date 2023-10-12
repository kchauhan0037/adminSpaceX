// // import React, { Component } from 'react';
// // import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// // import axios from 'axios';
// // import './App.css';

// // class LaunchpadMap extends Component {
// //   state = {
// //     launchpads: [],
// //     mapBounds: null,
// //   };

// //   componentDidMount() {
// //     axios
// //       .get('https://api.spacexdata.com/v3/landpads')
// //       .then((response) => {
// //         const launchpads = response.data;
// //         this.setState({ launchpads, mapBounds: this.calculateMapBounds(launchpads) });
// //       })
// //       .catch((error) => {
// //         console.error('Error fetching launchpad data:', error);
// //       });
// //   }

// //   calculateMapBounds = (launchpads) => {
// //     if (launchpads.length === 0) {
// //       return null;
// //     }

// //     const bounds = launchpads.map((launchpad) => [
// //       launchpad.location.latitude,
// //       launchpad.location.longitude,
// //     ]);

// //     return bounds;
// //   };

// //   render() {
// //     const { launchpads, mapBounds } = this.state;

// //     return (
// //       <MapContainer
// //         bounds={mapBounds}
// //         style={{ width: '400px', height: '400px' }} // Apply inline styles
// //       >
// //         <TileLayer
// //   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
// //   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// //   onError={(e) => {
// //     console.log('Error loading map tiles:', e);
// //   }}
// // />

// //         {launchpads.map((launchpad) => (
// //           <Marker
// //             key={launchpad.id}
// //             position={[
// //               launchpad.location.latitude,
// //               launchpad.location.longitude,
// //             ]}
// //           >
// //             <Popup>{launchpad.location.name}</Popup>
// //           </Marker>
// //         ))}
// //       </MapContainer>
// //     );
// //   }
// // }

// // export default LaunchpadMap;



import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './App.css';
class LaunchpadMap extends Component {
  render() {
    return (
        <div id='mapwrapper' className={this.props.changeclass === 'Launchpad Map' ? "full-width" : ""} >
            <MapContainer
        center={[34.632093, -120.610829]}
        zoom={8}
        style={{ width: '100%', height: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={[34.632093, -120.610829]}>
          <Popup>
            Example Launchpad
          </Popup>
        </Marker>
      </MapContainer>
        </div>
      
    );
  }
}

export default LaunchpadMap;

 

