import React from 'react';
import { Grid, Loader, Header } from 'semantic-ui-react';
import swal from 'sweetalert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField'; // required for Uniforms
import NumField from 'uniforms-semantic/NumField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Restaurants, RestaurantsSchema } from '../../api/restaurant/Restaurants';
import 'uniforms-bridge-simple-schema-2';

/** Renders the Page for editing a single document. */
class EditRestaurant extends React.Component {

  /** On successful submit, insert the data. */
  submit(data) {
    const { name, description, rating, location, phoneNumber, address, logo, hours, website,
      menu, image, diet, _id } = data;
    Restaurants.update(_id, { $set: { name, description, rating, location, phoneNumber, address, logo, hours, website,
        menu, image, diet } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Restaurant updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  renderPage() {
    return (
        <AutoForm schema={RestaurantsSchema} onSubmit={data => this.submit(data)} model={this.props.doc}>
        <Grid container centered>
              <Grid.Row>
                <Grid.Column>
                  <Header as="h1" textAlign="center">Edit {this.props.doc.name}</Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <TextField label='Restaurant Name:' name='name'
                             placeholder='McRonalds'/>
                </Grid.Column>
                <Grid.Column>
                  <TextField label='Restaurant Phone Number: (optional)' name='phoneNumber' required={false}
                             placeholder='808-555-5555'/>
                </Grid.Column>
                <Grid.Column>
                  <TextField label='Restaurant Hours:' name='hours'
                             placeholder='08:00AM - 04:30PM'/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <TextField label='Restaurant Location:' name='location'
                             placeholder='Paradise Palms'/>
                </Grid.Column>
                <Grid.Column>
                  <TextField label='Restaurant Address:' name='address'
                             placeholder='123 Manoa Lane'/>
                </Grid.Column>
                <Grid.Column>
                  <TextField label='Restaurant Website:' name='website'
                             placeholder='www.McRonalds.com'/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={3}>
                <Grid.Column>
                  <TextField label='Restaurant Logo:' name='logo'
                             placeholder='www.McRonalds.com/logo.jpg'/>
                </Grid.Column>
                <Grid.Column>
                  <TextField label='Restaurant Photo: (optional)' name='image' required={false}
                             placeholder='www.McRonalds.com/photo.jpg'/>
                </Grid.Column>
                <Grid.Column>
                  <TextField label='Restaurant Menu URL: (optional)' name='menu' required={false}
                             placeholder='www.McRonalds.com/menu'/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row columns={2}>
                <Grid.Column>
                  <NumField label='Rating' name='rating'
                            placeholder='A # 0 to 5'/>
                </Grid.Column>
                <Grid.Column>
                  <TextField label='Dietary options' name='diet' required={false}
                             placeholder='vegan or vegetarian'/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <LongTextField label='Restaurant Description:'
                                 name='description'
                                 placeholder='Please enter professional and accurate description of this restaurant..'/>
                </Grid.Column>
              </Grid.Row>
              <HiddenField name='owner'/>
              <SubmitField value='Submit'/>
              <ErrorsField/>
        </Grid>
        </AutoForm>
    );
  }
}

/** Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use. */
EditRestaurant.propTypes = {
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
})(EditRestaurant);
