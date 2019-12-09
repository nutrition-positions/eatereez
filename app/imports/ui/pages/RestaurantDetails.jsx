import React from 'react';
import { Grid, Loader, Header, Image, Container, Icon } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Restaurants } from '../../api/restaurant/Restaurants';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

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
          <Grid.Row>
            <Grid.Column>
            <Header as="h2" textAlign="center">{this.props.doc.name}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
              <Container>
            <Image size='small' src={this.props.doc.logo}/>
              </Container>
            </Grid.Column>
            <Grid.Column width={12}>
            <Header as='h4'>{this.props.doc.description}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header as='h4'>{this.props.doc.rating} / 5
                <Icon name='star' color='yellow' />
            </Header>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header as='h4'>{this.props.doc.phoneNumber}</Header>
            </Grid.Column>
            <Grid.Column width={4}>
              <Header as='h4'>{this.props.doc.hours}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as='h4'>Website URL: {this.props.doc.website}</Header>
            </Grid.Column>
            <Grid.Column width={6}>
              <Header as='h4'>Menu URL: {this.props.doc.menu}</Header>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={4}>
            </Grid.Column>
            <Grid.Column width={12}>
              <Header as='h4'>Address: {this.props.doc.address}</Header>
            </Grid.Column>
          </Grid.Row>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
RestaurantDetails.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Restaurant');
  return {
    doc: Restaurants.findOne(documentId),
    ready: subscription.ready(),
  };
})(RestaurantDetails);
