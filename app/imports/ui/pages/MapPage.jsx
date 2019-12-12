import React from 'react';
import { Grid, Header, Container } from 'semantic-ui-react';
import Map from '../components/Map';

export default class MapPage extends React.Component {
  render() {
    return (
        <div>
          <Grid.Row>
            <Header as='h1' textAlign='center'>Map</Header>
            <Map/>
            <Container>
              <Header as='h1' textAlign='left'>How to</Header>
              <p>&apos;Map&apos; shows the location of the current Resaurants at University of Hawaii Manoa!</p>
              <ul>
                <li>Red markers: indicate the location of restaurants. Clicking on the marker will display information
                  on the Restaurant. You can click on the name of a restaurant and be taken to the restaurants page
                  for more information.</li>
                <li>Green marker: indicates your current location.</li>
              </ul>
            </Container>
          </Grid.Row>
        </div>
    );
  }
}
