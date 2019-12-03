import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Loader } from 'semantic-ui-react';
import { Restaurants } from '/imports/api/restaurant/Restaurants';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Restaurant from '../components/Restaurant';
import { Reviews } from '../../api/review/Reviews';


/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class RestaurantDetails extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className='standard-height'>
        <Container height='500px'>
          {this.props.restaurants.filter((restaurants) => <Restaurant restaurant={restaurants}/>)}
        </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
RestaurantDetails.propTypes = {
  restaurants: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Restaurants');
 // const subscriptionReviews = Meteor.subscribe('Reviews'); have to add this being ready when reveiws are implemented
  return {
    restaurants: Restaurants.find({}).fetch(),
  //  reviews: Reviews.find({}).fetch(),
    ready: subscription.ready(),
  };
})(RestaurantDetails);
