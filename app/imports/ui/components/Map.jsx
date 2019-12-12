import React from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Container, Grid } from 'semantic-ui-react';

const mapStyles = {
  height: '500px',
};

export class MapContainer extends React.Component {
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
        <Container>
          <div id='map-spacing'>
            <Grid centered>
              <Map
                  /* eslint-disable-next-line react/prop-types */
                  google={this.props.google}
                  zoom={16}
                  style={mapStyles}
                  initialCenter={{
                    lat: 21.299630,
                    lng: -157.817488,
                  }}
              >
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Panda Express'}
                    position={{ lat: 21.2969, lng: -157.8171 }}/>
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                  <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                  </div>
                </InfoWindow>
                <Marker position={{ lat: 21.299160, lng: -157.819573 }}/>
                <Marker position={{ lat: 21.301150, lng: -157.815629 }}/>
                <Marker position={{ lat: 21.300737, lng: -157.819030 }}/>
                <Marker position={{ lat: 21.300737, lng: -157.819030 }}/>
                <Marker position={{ lat: 21.298232, lng: -157.820844 }}/>
              </Map>
            </Grid>
          </div>
        </Container>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCXbqUp69744PLBpEcJ_5uaclmQcNYzIHQ',
})(MapContainer);
