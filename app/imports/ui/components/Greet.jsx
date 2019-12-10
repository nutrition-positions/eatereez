import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Button, Grid, Header, Image, Input, Loader } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import LandingSearch from './LandingSearch';

class Greet extends React.Component {

  render() {
    return (this.props.currentUser !== 'undefined') ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    const buttonStyle = { width: '260px', height: '36px' };
    return (
        <div className='eatereez-landing-background'>
          <Image
              className='eatereez-landing-logo'
              size='huge' src='images/eatereez-logo-text.png' centered/>
             {this.props.currentUser === '' ? ''
             : <Header as='h1' className='landing-text-color' textAlign='center'
                 >Hello, {this.props.currentUser}.</Header>}
          <div className='landing-padding-top'>
            <Grid stackable centered container columns={1}>
              <Grid.Column textAlign='center'>
                <Header as='h1' className='landing-text-color' textAlign='center'
                >Look for a place to eat here!<br/>You can go to list, or start by searching.</Header>
                <Grid centered columns={2}>
                  <Grid.Column>
                    <Button as={NavLink} activeClassName="" exact to="/food"
                            style={buttonStyle}
                            className='ui button' floated='right'>Go to Restaurants List</Button>
                  </Grid.Column>
                  <Grid.Column>
                    <div className='ui input bordered'>
                      <LandingSearch/>
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

/** Declare the types of all properties. */
Greet.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const GreetContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Greet);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(GreetContainer);


