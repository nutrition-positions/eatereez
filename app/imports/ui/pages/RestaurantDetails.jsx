import React from 'react';
import { Grid, Header, Image, Loader, Rating, Segment, CommentGroup, Button, Icon,
  Modal, Message } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import 'uniforms-bridge-simple-schema-2';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SelectField from 'uniforms-semantic/SelectField';
import HiddenField from 'uniforms-semantic/HiddenField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import SimpleSchema from 'simpl-schema';
import { Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Restaurants } from '../../api/restaurant/Restaurants';
import { Reviews } from '../../api/review/Reviews';
import Review from '../components/Review';

const formSchema = new SimpleSchema({
  title: String,
  description: String,
  stars: {
    label: 'Rating',
    type: Number,
    allowedValues: [1, 2, 3, 4, 5],
    defaultValue: 1,
  },
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

  average() {
    const filtered = this.props.reviews.filter((review) => (review.restaurantId === this.props.doc.name));
    const amount = filtered.length;
    console.log(amount);
    const starList = filtered.map(o => o.stars);
    console.log(starList);
    const numList = starList.map(Number);
    const sum = numList.reduce((acc, val) => acc + val, 0);
    console.log(sum);
    return sum / amount;
  }

  removeRestaurant = () => {
    Restaurants.remove(this.props.doc._id);
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    let fRef = null;
    const filtered = this.props.reviews.filter((review) => (review.restaurantId === this.props.doc.name));
    return (
        <Grid container centered>
            <Grid.Column width={5}>
              <Image size='huge' src={this.props.doc.logo} />
              {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
                  <Segment>
                    <Header textAlign='center' as='h2'>Admin Options</Header>
                  <Header textAlign='center' as='h2'> <Link to={`/edit/${this.props.doc._id}`}>
                    Edit {this.props.doc.name}</Link></Header>
                    <Modal trigger={<Button animated color='red'>
                      <Button.Content visible>
                        <Icon name='trash alternate' />
                      </Button.Content>
                      <Button.Content hidden>Delete</Button.Content>
                    </Button>}>
                      <Modal.Header>Are you sure you wish to delete {this.props.doc.name}?</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          <Header as='h2'>
                          <Link to={'/food'} onClick={this.removeRestaurant}>Yes, delete this restaurant</Link>
                          </Header>
                          <Header as='h2'> If not, click outside of this pop-up.
                          </Header>
                        </Modal.Description>
                      </Modal.Content>
                    </Modal>
                  </Segment>
              ) : ''}
              <CommentGroup>
                {filtered.map((review, index) => <Review
                    key={index} review={filtered[index]} currentUser={this.props.currentUser}/>)}
              </CommentGroup>
              <Header as="h3" textAlign="center">Write a Review of {this.props.doc.name} </Header>
              {this.props.currentUser ? (
                  [<AutoForm ref={ref => { fRef = ref; }}
                             schema={formSchema}
                             key='submit-review'
                             onSubmit={data => this.submit(data, fRef)} >
                <Segment>
                  <TextField name='title'/>
                  <SelectField name='stars'/>
                  <LongTextField name='description'/>
                  <HiddenField name='owner' value={this.props.doc.owner}/>
                  <HiddenField name='restaurantId' value={this.props.doc.name}/>
                  <HiddenField name='createdAt' value={new Date().toDateString()}/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                </Segment>
              </AutoForm>]
              ) : <Segment><Header textAlign='center' as='h3'> <Link color='black' to={'/signin'}>
                Sign in</Link> or <Link to={'/signup'}>sign up </Link>to write a review</Header></Segment>}
            </Grid.Column>
            <Grid.Column width={10}>
              <Header as='h1'>{this.props.doc.name}</Header>
              <Rating icon='star' defaultRating={this.average()} maxRating={5} disabled />
              <p>{this.props.doc.description}</p>
              <Grid.Row>
                <Message
                    compact
                    header='Hours of Operation:'
                    content={this.props.doc.hours}
                />
                &nbsp;
                &emsp;
                &emsp;
                &emsp;
                &emsp;
                &emsp;
                &emsp;
                <Message
                    compact
                    float='right'
                    header='Location:'
                    content={this.props.doc.location}
                />
              </Grid.Row>
              <Grid.Row>
              <Message
                  compact
                  header='Phone Number:'
                  content={this.props.doc.phoneNumber}
              />
                &emsp;
                &emsp;
                &emsp;
                &emsp;
                &emsp;
                &emsp;
                &emsp;
                &emsp;
                &emsp;
                &emsp;
                &emsp;
                &emsp;
                <Message
                  compact
                  header='Address:'
                  content={this.props.doc.address}
              />
            </Grid.Row>
              <Image size='large' src={this.props.doc.menu}/>
              <Header as='h3'> <a href={this.props.doc.website}>
                {this.props.doc.name} Website</a></Header>
            </Grid.Column>
        </Grid>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
RestaurantDetails.propTypes = {
  doc: PropTypes.object,
  reviews: PropTypes.array,
  currentUser: PropTypes.string,
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
    currentUser: Meteor.user() ? Meteor.user().username : '',
    ready: subscription.ready() && subscriptionReviews.ready(),
  };
})(RestaurantDetails);
