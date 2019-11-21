import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return (
        <div className='eatereez-landing-background'>
          <div className='eatereez-landing-text'>
            <Grid className='eatereez-landing-text' container stackable centered columns={3}>
              <Grid.Column textAlign='center'>
                <Icon size='huge' name='building outline' inverted/>
                <Header as='h1' inverted>Find your Grind</Header>
                <Header as='h3' inverted>
                  Here in Hawaii, we got the food for you.
                  We have a list of food that you can browse through.
                  Find restaurants that others enjoyed
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Icon size='huge' name='map outline' inverted/>
                <Header as='h1' inverted>Find your Restaurant</Header>
                <Header as='h3' inverted>
                  We will have a map to a restaurant that is close to you!
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Icon size='huge' name='calendar plus' inverted/>
                <Header as='h1' inverted>Can&apos;t find your restaraunt?</Header>
                <Header as='h3' inverted>
                  We allow you to add your favorite restaurant to the list for others to find or,
                  if you want your restaurant to the list, click here.
                </Header>
              </Grid.Column>
            </Grid>
          </div>
        </div>
    );
  }
}

export default Landing;
