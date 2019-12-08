import React from 'react';
import { Grid, Header, Image, Loader, Icon, Segment, CommentGroup } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import NumField from 'uniforms-semantic/NumField';
import HiddenField from 'uniforms-semantic/HiddenField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import { Restaurants } from '../../api/restaurant/Restaurants';
import { Reviews } from '../../api/review/Reviews';
import Review from '../components/Review';

const formSchema = new SimpleSchema({
  title: String,
  description: String,
  stars: String,
  restaurantId: String,
  createdAt: Date,
  owner: String,
});

/** Renders the Page for editing a single document. */
class RestaurantDetails extends React.Component {

  submit(data, formRef) {
    const { title, description, stars, restaurantId, createdAt } = data;
    const owner = Meteor.user().username;
    Reviews.insert({ title, description, stars, restaurantId, owner, createdAt },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    let fRef = null;
    const filtered = this.props.reviews.filter((review) => (review.restaurantId === this.props.doc._id));
    return (
        <Grid container centered>
          <Grid.Row >
            <Grid.Column width={5}>
              <Image size='huge' src={this.props.doc.image} />
              <CommentGroup>
                {filtered.map((review, index) => <Review
                     key={index} review={filtered[index]}/>)}
              </CommentGroup>
              <Header as="h3" textAlign="center">Write a Review of {this.props.doc.name} </Header>
              <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
                <Segment>
                  <TextField name='title'/>
                  <NumField name='stars' range={5}/>
                  <LongTextField name='description'/>
                  <HiddenField name='owner' value={this.props.doc.owner}/>
                  <HiddenField name='restaurantId' value={this.props.doc._id}/>
                  <HiddenField name='createdAt' value={new Date().toDateString()}/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as='h1'>{this.props.doc.name}</Header>
              <Header as='h4'>{this.props.doc.description}</Header>
              <Header as='h4'>{this.props.doc.rating} / 5 <Icon name='star' /></Header>
              <Header as='h4'>Phone number: {this.props.doc.phoneNumber}</Header>
              <Header as='h4'>Address: {this.props.doc.address}</Header>
              <Header as='h3'>WE SHOULD MAKE A THING HERE THAT FORMATS THE MENU OF THE RESTAURANT NICELY.</Header>
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
