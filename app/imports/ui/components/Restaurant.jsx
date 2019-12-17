import React from 'react';
import { Header, Image, Grid, Divider, Rating, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Restaurant extends React.Component {
  render() {
    return (
        <div>
          <Segment raised>
          <Grid>
              <Grid.Column width={2}>
                <Grid.Row>
                  <Divider hidden />
                  <Image fluid src={this.props.restaurant.logo} />
                </Grid.Row>
              </Grid.Column>
            <Grid.Column width={7}>
              <Grid.Row>
                <Header as='h1'><Link color='black' to={`/details/${this.props.restaurant._id}`}>
                  {this.props.restaurant.name}</Link></Header>
              </Grid.Row>
              <Grid.Row>
                <Rating icon='star' defaultRating={this.props.restaurant.rating} maxRating={5} disabled />
              </Grid.Row>
              <Divider hidden />
              <Grid.Row>
              <Header as='h4' textAlign='left'>{this.props.restaurant.description.substring(0, 80)}...</Header>
              </Grid.Row>
            </Grid.Column>
              <Grid.Column width={3} >
                <Divider hidden />
                <Grid.Row>
                  <Header as='h4' textAlign='left'>Hours: </Header>
                </Grid.Row>
                <Grid.Row>
                  <Header disabled as='h4' textAlign='left'>{this.props.restaurant.hours}</Header>
                </Grid.Row>
                <Divider hidden />
                <Grid.Row>
                  <Header as='h4' textAlign='left'>Phone number: </Header>
                </Grid.Row>
                <Grid.Row>
                  <Header disabled as='h4' textAlign='left'>{this.props.restaurant.phoneNumber}</Header>
                </Grid.Row>
              </Grid.Column>
            <Grid.Column width={4}>
              <Divider hidden />
              <Grid.Row>
                <Header as='h4' textAlign='left'>Location: </Header>
              </Grid.Row>
              <Grid.Row>
                <Header disabled as='h4' textAlign='left'>{this.props.restaurant.location}</Header>
              </Grid.Row>
              <Divider hidden />
              <Grid.Row>
                <Header as='h4' textAlign='left'><Link color='black' to={`/details/${this.props.restaurant._id}`}>
                  More Info</Link></Header>
              </Grid.Row>
            </Grid.Column>
          </Grid>
          </Segment>
          <Divider hidden />
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Restaurant);
