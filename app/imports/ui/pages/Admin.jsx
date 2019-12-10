import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import RestaurantAdmin from '/imports/ui/components/RestaurantAdmin';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ReviewAdmin from '../components/ReviewAdmin';
import { Submits } from '../../api/submit/Submits';
import { Reports } from '../../api/report/Report';
import { Reviews } from '../../api/review/Reviews';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Admin extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Submitted Restaurants</Header>
          <Card.Group>
            {this.props.submits.map((submit, index) => <RestaurantAdmin
                key={index}
                submit={submit}/>)}
          </Card.Group>
          <Header as="h2" textAlign="center">Reported Reviews</Header>
          <Card.Group>{this.props.reports.map((report, index) => <ReviewAdmin
              key={index}
              report={report}
              review={this.props.reviews.filter((review) => (review._id === report.reviewId))}/>)}</Card.Group>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Admin.propTypes = {
  submits: PropTypes.array.isRequired,
  reports: PropTypes.array.isRequired,
  reviews: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('SubmitsAdmin');
  const subscription2 = Meteor.subscribe('Reports');
  const subscription3 = Meteor.subscribe('Reviews');
  return {
    submits: Submits.find({}).fetch(),
    reports: Reports.find({}).fetch(),
    reviews: Reviews.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready() && subscription3.ready(),
  };
})(Admin);
