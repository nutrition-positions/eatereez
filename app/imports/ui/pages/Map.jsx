import React from 'react';
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import { Container, Grid } from 'semantic-ui-react';

const mapStyles = {
  width: '100%',
  height: '100%',
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
          <div className='map-spacing'>
          <Grid columns={1} bottom-padding='1080px' centered>
              <Map
                  /* eslint-disable-next-line react/prop-types */
                  google={this.props.google}
                  zoom={17}
                  style={mapStyles}
                  initialCenter={{
                    lat: 21.2969,
                    lng: -157.8171,
                  }}
              >
                  <Marker
                    onCLick={this.onMarkerClick}
                    name={'University of Hawaii at Manoa'}
                  />
                  <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                      onClose={this.onClose}
                  >
                      <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                      </div>
                  </InfoWindow>
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
