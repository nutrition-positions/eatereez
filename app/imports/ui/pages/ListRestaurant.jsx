import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Grid, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Restaurant from '../components/Restaurant';
import { Restaurants } from '../../api/restaurant/Restaurants';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListRestaurant extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container className="List-spacing">
          <Header as="h2" textAlign="center">List Restaurant</Header>
          <Grid columns={1} centered>
            {this.props.restaurants.map((restaurant, index) => <Restaurant key={index} restaurant={restaurant}/>)}
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListRestaurant.propTypes = {
  restaurants: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Restaurant');
  return {
    restaurants: Restaurants.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListRestaurant);
