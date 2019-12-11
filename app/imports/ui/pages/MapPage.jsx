import React from 'react';
import Map from '../components/Map';
import { Grid, Header } from 'semantic-ui-react';
import Footer from '../components/Footer';

export default class MapPage extends React.Component {
  render() {
    return (
        <div>
          <Grid.Row>
            <Header as='h1' textAlign='center'>Work?</Header>
            <Map/>
            <h1>IM BETTER THAN YOU</h1>
          </Grid.Row>
        </div>
    );
  }
}
