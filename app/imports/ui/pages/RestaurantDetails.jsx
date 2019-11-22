import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Card, Image, Icon, Header, Loader } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/Stuff';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

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
          <Header as="h2" textAlign="center">Restaurant Details</Header>
          <Card>
            <Image
                src='https://cblproperty.blob.core.windows.net/production/assets/blt2cdb66fcae2f05ae-1004px-Panda_Express.svg.png' wrapped ui={false} />
          <Card.Content>
            <Card.Header>Panda Express</Card.Header>
            <Card.Meta>
              <span>10:00 AM - 4:30 PM</span>
            </Card.Meta>
            <Card.Description>
              Panda Express is a fast food restaurant chain which serves American Chinese cuisine.
              With over 2,200 locations, it is the largest Asian segment restaurant chain in the United States,
              where it was founded and is mainly located.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name='star' />
              3.5/5
            </a>
          </Card.Content>
        </Card>
          <Card>
            <Card.Content>
              <Card.Header>I like Pandas</Card.Header>
              <Card.Meta>
                <span>4 stars</span>
              </Card.Meta>
              <Card.Description>
                Pandas are my favorite animal cuz they are so cute.  Who knew they could be so tasty?
              </Card.Description>
            </Card.Content>
          </Card>
        </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
RestaurantDetails.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(RestaurantDetails);
