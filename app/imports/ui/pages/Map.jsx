import React from 'react';
import { Grid } from 'semantic-ui-react';


class Map extends React.Component {
  render() {
    return (
        <Grid verticalAlign='middle' textAlign='center' container>
          <Grid.Column>
            <h1>Locate a Restaurant</h1>
            <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3717.35615228837!2d-157.819300484469!3d21.296938985853675!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c006d989580d855%3A0xac63f2de838ed2f4!2sUniversity%20of%20Hawai%CA%BBi%20at%20M%C4%81noa!5e0!3m2!1sen!2sus!4v1574316698442!5m2!1sen!2sus"
    width="1000" height="800" frameBorder="0" allowFullScreen=""/>
          </Grid.Column>
        </Grid>
    );
  }
}

export default Map;
