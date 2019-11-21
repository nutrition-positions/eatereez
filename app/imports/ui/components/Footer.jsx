import React from 'react';
import { Grid, List } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { marginTop: '0px', paddingTop: '0px', paddingBottom: '15px' };
    return (
        <footer>
          <div style={divStyle} className="footer-green-background">
            <Grid textAlign='center' container columns="three">
              <Grid.Column>
              </Grid.Column>
              <Grid.Column>
                A Nutrition Positions Project
                <hr/>
                <List>
                  <List.Item>University of Hawaii</List.Item>
                  <List.Item>Honolulu, HI 96822</List.Item>
                  <List.Item>
                    <a href="https://nutrition-positions.github.io">https://nutrition-positions.github.io</a>
                  </List.Item>
                </List>
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
            </Grid>
          </div>
        </footer>
    );
  }
}

export default Footer;
