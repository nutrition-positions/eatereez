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
                    detials={'Monday-Friday: 10:00am-2:00pm'}
                    website={'http://eatereez.meteorapp.com/#/details/xdBAy8zeqTL74e3q6'}
                    position={{ lat: 21.2969, lng: -157.8171 }}/>
                <Marker
                    onClick={this.onMarkerClick}
                    name={'BA-LE'}
                    details={'Hours: 8:00am-4:30pm\n'}
                    website={'http://eatereez.meteorapp.com/#/details/ioNYaePPqrDQb6WWY'}
                    position={{ lat: 21.299160, lng: -157.819573 }}/>
                <Marker
                    onClick={this.onMarkerClick}
                    name={'Paradise Palms'}
                    details={'Hours: Monday-Friday: 8:00am-4:30pm'}
                    website={'http://eatereezapp.meteorapp.com/#/foodmap/'}
                    position={{ lat: 21.301150, lng: -157.815629 }}/>
                <Marker
                    name={'Da Spot'}
                    details={'Hours: Monday-Friday: 10:00am-2:00pm'}
                    onClick={this.onMarkerClick}
                    website={'http://eatereez.meteorapp.com/#/details/8ir63j3kv5nnDqJ8x'}
                    position={{ lat: 21.300925, lng: -157.819104 }}/>
                <Marker
                    name={'Govinda'}
                    onClick={this.onMarkerClick}
                    details={'Hours: Monday-Friday: 10:00am - 2:00pm'}
                    website={'http://eatereez.meteorapp.com/#/details/GPiXZX9FayNHprECt'}
                    position={{ lat: 21.298680, lng: -157.817510 }}/>
                <Marker
                    name={'Jamba Juice'}
                    details={'Hours: Monday-Thursday:7:00am - 5:00pm Friday: 7:00am-4:00pm'}
                    onClick={this.onMarkerClick}
                    website={'http://eatereez.meteorapp.com/#/details/YitXpm2nHzG5MTrAo'}
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
                    <a href={this.state.selectedPlace.website} target='_top'>More Info</a>
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
