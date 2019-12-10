import React from 'react';
import MapContainer from '../components/Map';
import { Grid } from 'semantic-ui-react';

export default class MapPage extends React.Component {
  render() {
    return (
        <div>
          <Grid>
            <MapContainer/>
            <Grid.Row/>
            <Grid.Row/>
          </Grid>
        </div>
    );
  }
}
