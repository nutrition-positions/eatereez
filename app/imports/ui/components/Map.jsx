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
                    name={'Kamitoku Ramen'}
                    details={'Hours may vary'}
                    website={'/#/details/GNDC8brjwEbpfJ29N'}
                    position={{ lat: 21.2969, lng: -157.8171 }}/>
                <Marker
                    onClick={this.onMarkerClick}
                    name={'BA-LE'}
                    details={'Hours: 8:00am-4:30pm\n'}
                    website={'/#/details/CGK5kJBeGzaBWSXAQ'}
                    position={{ lat: 21.299160, lng: -157.819573 }}/>
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Paradise Palms'}
                    position={{ lat: 21.301150, lng: -157.815629 }}/>
                <Marker
                    name={'Doner Shack'}
                    onClick={this.onMarkerClick}
                    website={'/#/details/Wxa6ZR28un5NCxpQr'}
                    position={{ lat: 21.298730, lng: -157.817520 }}/>
                <Marker
                    name={'Da Spot'}
                    details={'Hours: May vary'}
                    onClick={this.onMarkerClick}
                    website={'/#/details/GNDC8brjwEbpfJ29N'}
                    position={{ lat: 21.298232, lng: -157.820844 }}/>
                <Marker
                    name={'Jamba Juice'}
                    details={'Monday-Thursday: 7:00am-5:00pm \n' +
                    'Friday: 7:00am-4:00pm'}
                    onClick={this.onMarkerClick}
                    website={'/#/details/rNgatdfnZS4sBNkrd'}
                    position={{ lat: 21.299083, lng: -157.819079 }}
                />
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                  <div>
                    <h4>{this.state.selectedPlace.name}</h4>
                    <p>{this.state.selectedPlace.details}</p>
                    <a href={this.state.selectedPlace.website}>More Info</a>
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
