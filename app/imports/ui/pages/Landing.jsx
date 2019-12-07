import React from 'react';
import { Header, Image, Input, Grid, Button } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {

  updateSearchName(event) {
    this.setState({ searchName: event.target.value });
  }

  render() {
    return (
        <Greet/>
    );
  }
}

class Greet extends React.Component {
  render() {
    return (
        <div className='eatereez-landing-background'>
          <Image
              className='eatereez-landing-logo'
              size='huge' src='images/eatereez-logo-text.png' centered/>
          <div className='landing-text'>
            <Grid stackable centered container columns={1}>
              <Grid.Column textAlign='center'>
                <Header as='h1' className='landing-text-color' textAlign='center'
                >Look for a place to eat here!<br/>You can go to list, or start by searching.</Header>
                <Grid centered columns={2}>
                  <Grid.Column>
                    <Button className='ui button' size='huge' floated='right'>Go to Restaurants List</Button>
                  </Grid.Column>
                  <Grid.Column>
                    <div className='ui input bordered'>
                      <Input
                          type='text'
                          size='big'
                          icon='search'
                          placeholder='Search...'
                          // onChange={Landing.updateSearchName.bind(this)}
                          // value={Landing.state.searchName}
                      />
                    </div>
                  </Grid.Column>
                </Grid>
              </Grid.Column>
            </Grid>
          </div>
        </div>
    );
  }
}

Landing.state = {
  searchName: '',
};

export default Landing;
