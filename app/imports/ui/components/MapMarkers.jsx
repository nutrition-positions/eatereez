import React from 'react';
import { Marker, InfoWindow, GoogleApiWrapper } from 'google-maps-react';

class MapMarkers extends React.Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) => this.setState({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true,
  });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  render() {
    return (
          <Marker
              onClick={this.onMarkerClick}
              name={'Kamitoku Ramen'}
              position={{ lat: 21.2969, lng: -157.8171 }}/>
    );
  }
}

export default MapMarkers;
