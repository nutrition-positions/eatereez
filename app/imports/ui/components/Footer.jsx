import React from 'react';
import { Grid, List, Item } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { marginTop: '20px', paddingTop: '15px', paddingBottom: '15px' };
    return (
        <footer>
          <div style={divStyle} className="landing-green-background">
            <Grid container columns="two">
              <Grid.Column>
                The Eatereez Project
                <hr/>
                <List>
                  <List.Item>University of Hawaii</List.Item>
                  <List.Item>Honolulu, HI 96822</List.Item>
                  <List.Item><a href="https://nutrition-positions.github.io">Eatereez Project Page</a></List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                Missing Something?
                <hr/>
                  Can&apos;t find a eatery you know is around? <br />
                  Send it to our admins to be added to the site: <br />
                  <Item style={{ color: 'light blue' }} as={NavLink} activeClassName="active"
                        exact to="/admin">Submit Restaurant Page</Item>
              </Grid.Column>
            </Grid>
          </div>
        </footer>
    );
  }
}

export default Footer;
