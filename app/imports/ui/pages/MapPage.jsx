import React from 'react';
import Map from '../components/Map';
import { Grid } from 'semantic-ui-react';

export default class MapPage extends React.Component {
  render() {
    return (
        <div>
          <Grid.Row>
            <iframe width='600px' height='600px' src={Map}></iframe>
          </Grid.Row>
        </div>
    );
  }
}
