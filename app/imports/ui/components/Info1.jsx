import React from 'react';
import { Grid, Header, Icon, Container } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Info1 extends React.Component {

  handleOnClick() {
    this.props.history.push({ pathname: '/food', state: '', filterDiet: 'vegetarian' });
  }

  render() {
    return (
        <div>
          <Container className='landing-info1'>
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
                  <Link to='/food'>
                    <Icon size='huge' name='food' color='orange'/>
                    <Header as='h2' textAlign='center'>
                      Hungry for something particular? We have search options that will help find what you need!
                    </Header>
                  </Link>
                </Grid.Column>
                <Grid.Column textAlign='center'>
                    <Icon size='huge' name='leaf' color='green'
                          style={{ cursor: 'pointer' }} onClick={this.handleOnClick.bind(this)}/>
                    <Header as='h2' textAlign='center'
                            style={{ cursor: 'pointer' }} onClick={this.handleOnClick.bind(this)}>
                      Vegetarian or vegan? No problem!
                      We will find the restaurants for your diet.
                    </Header>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Info1.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Info1);
