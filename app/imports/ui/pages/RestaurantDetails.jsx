import React from 'react';
import { Feed, Grid, Header, Image, Loader, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Restaurants } from '../../api/restaurant/Restaurants';
import { Reviews } from '../../api/review/Reviews';
import 'uniforms-bridge-simple-schema-2';
import Review from '../components/Review';

/** Renders the Page for editing a single document. */
class RestaurantDetails extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <Grid container centered>
          <Grid.Row >
            <Grid.Column width={5}>
              <Image size='huge' src={this.props.doc.image} />
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as='h1'>{this.props.doc.name}</Header>
              <Header as='h4'>{this.props.doc.description}</Header>
              <Header as='h4'>{this.props.doc.rating} / 5 <Icon name='star' /></Header>
              <Header as='h4'>Phone number: {this.props.doc.phoneNumber}</Header>
              <Header as='h4'>Address: {this.props.doc.address}</Header>
              <Feed>
               /** {_.filter(this.props.reviews.map((review, index) => <Review key={index} review={review}
                                                                            restaurantId={this.props.doc._id}/>), (review) => review.restaurantId === this.props.doc._id)}
              **/
                {this.props.reviews.map((review, index) => <Review key={index} review={review}
                                                                   restaurantId={this.props.doc._id}/>)}
              </Feed>
              <Header as='h3'><Link color='black' to={`/submit-review/${this.props.doc._id}`}>
                Submit a review...</Link></Header>
            </Grid.Column>
          </Grid.Row></Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
RestaurantDetails.propTypes = {
  doc: PropTypes.object,
  reviews: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Restaurant');
  const subscriptionReviews = Meteor.subscribe('Reviews');
  return {
    doc: Restaurants.findOne(documentId),
    reviews: Reviews.find({}).fetch(),
    ready: subscription.ready() && subscriptionReviews.ready(),
  };
})(RestaurantDetails);
