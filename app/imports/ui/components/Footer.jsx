import React from 'react';
import { Grid, List, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { marginTop: '0px', paddingTop: '0px', paddingBottom: '15px' };
    return (
        <footer>
          <div style={divStyle} className="footer-green-background">
            <Grid container columns="two">
              <Grid.Column>
                A Nutrition Positions Project
                <hr/>
                <List>
                  <List.Item>University of Hawaii</List.Item>
                  <List.Item>Honolulu, HI 96822</List.Item>
                  <List.Item>Home Page: </List.Item>
                  <List.Item>
                    <a href="https://nutrition-positions.github.io">https://nutrition-positions.github.io</a>
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
                Missing Something?
                <hr/>
                <List>
                  <List.Item>Can&apos;t find a eatery you know is around?</List.Item>
                  <List.Item>Send it to our admins to be added to the site: </List.Item>
                  <List.Item><Button className="ui green button" as={NavLink} activeClassName="active"
                                     exact to="/submit">Submit A Restaurant</Button></List.Item>
                </List>
              </Grid.Column>
            </Grid>
          </div>
        </footer>
    );
  }
}

export default Footer;
