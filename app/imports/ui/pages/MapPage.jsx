import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import Map from '../components/Map';

export default class MapPage extends React.Component {
  render() {
    return (
        <div>
          <Grid.Row>
            <Header as='h1' textAlign='center'>Map</Header>
            <Map/>
            <h1>Description goes here maybe</h1>
          </Grid.Row>
        </div>
    );
  }
}
