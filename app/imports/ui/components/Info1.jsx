import React from 'react';
import { Grid, Header, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Info1 extends React.Component {
  render() {
    return (
        <div className='landing-info1'>
          <Header size='huge' textAlign='center'>
            We find the places to eat here at University of Hawaii at Manoa!
          </Header>
          <Grid className='landing-info1-title'>
            <Grid.Row columns={3} divided={true}>
              <Grid.Column textAlign='center'>
                <Link to='/map'>
                <Icon size='huge' name='map' color='blue'/>
                <Header as='h2' textAlign='center' className='landing-info1-title'>
                  Find what you want to eat and discovery new places!
                </Header>
                </Link>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Icon size='huge' name='food' color='orange'/>
                <Header as='h2' textAlign='center'>
                  Hungry for something particular? We have search options that will help find what you need!
                </Header>
              </Grid.Column>
              <Grid.Column textAlign='center'>
                <Icon size='huge' name='leaf' color='green'/>
                <Header as='h2' textAlign='center'>
                  Vegetarian or vegan? No problem!
                  We will find the restaurants for your diet.
                </Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}

export default Info1;
