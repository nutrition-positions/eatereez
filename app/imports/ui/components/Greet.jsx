import React from 'react';
import { Button, Grid, Header, Image, Input } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

class Greet extends React.Component {
  render() {
    const buttonStyle = { width: '260px', height: '51px' };
    return (
        <div className='eatereez-landing-background'>
          <Image
              className='eatereez-landing-logo'
              size='huge' src='images/eatereez-logo-text.png' centered/>
          {/* {console.log(`this.props.currentUser = ${this.props.currentUser}`)} */}
          {/*   {this.props.currentUser === '' ? '' */}
          {/*   : <Header as='h1' className='landing-text-color' textAlign='center' */}
          {/*       >Hello, {Meteor.user()}.</Header>} */}
          <div className='landing-padding-top'>
            <Grid stackable centered container columns={1}>
              <Grid.Column textAlign='center'>
                <Header as='h1' className='landing-text-color' textAlign='center'
                >Look for a place to eat here!<br/>You can go to list, or start by searching.</Header>
                <Grid centered columns={2}>
                  <Grid.Column>
                    <Button as={NavLink} activeClassName="" exact to="/food"
                            style={buttonStyle}
                            className='ui button' size='huge' floated='right'>Go to Restaurants List</Button>
                  </Grid.Column>
                  <Grid.Column>
                    <div className='ui input bordered'>
                      <Input
                          type='text'
                          size='big'
                          icon='search'
                          placeholder='Search...'
                          style={buttonStyle}
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

export default Greet;
