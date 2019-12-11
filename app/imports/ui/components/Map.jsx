import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
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
          <Grid centered>
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
                    position={{ lat: 21.2969, lng: -157.8171 }}/>
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
