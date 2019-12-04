import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Item, Icon, Loader, Label } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Restaurants } from '/imports/api/restaurant/Restaurants';

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
          <Item.Group divided>
            <Item>
              <Item.Image src={this.props.restaurant.image} />

              <Item.Content>
                <Item.Header as='a'>{this.props.restaurant.name}</Item.Header>
                <Item.Meta>
                  {this.props.restaurant.rating}/5
                  <Icon color='yellow' name='star' />
                </Item.Meta>
                <Item.Description>{this.props.restaurant.description}</Item.Description>
                <Item.Extra>
                  <Label>IMAX</Label>
                  <Label icon='globe' content='Additional Languages' />
                </Item.Extra>
              </Item.Content>
            </Item>
          </Item.Group>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
RestaurantDetails.propTypes = {
  ready: PropTypes.bool.isRequired,
  restaurant: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
  export default withTracker(({ match }) => {
    // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
    const documentId = match.params._id;
    // Get access to Stuff documents.
    const subscription = Meteor.subscribe('Restaurants');
    return {
    doc: Restaurants.findOne(documentId),
    ready: subscription.ready(),
  };
  })(RestaurantDetails);
