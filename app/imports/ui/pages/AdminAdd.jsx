import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import NumField from 'uniforms-semantic//NumField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';

import { Restaurants } from '../../api/restaurant/Restaurants';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  name: String,
  description: String,
  rating: String,
  location: String,
  phoneNumber: {
    type: String,
    required: false,
  },
  address: String,
  owner: String,
  logo: String,
  hours: String,
  website: String,
  menu: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  diet: String,
});

/** Renders the Page for adding a document. */
class AdminAdd extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { name, description, rating, location, phoneNumber, address, logo, hours, website, menu, image, diet } = data;
    const owner = Meteor.user().username;
    Restaurants.insert({
          name, address, hours, menu, phoneNumber, location, image,
          logo, website, description, rating, owner, diet },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Item added successfully', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
          <Grid container centered>
            <Grid.Row>
              <Grid.Column>
                <Header as="h2" textAlign="center">Add a Restaurant</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h4" textAlign="center">This adds a new restaurant to the restaurants which can be seen
                by the users.</Header>
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
                <LongTextField label='Restaurant Description:' name='description'
                               placeholder='Please enter professional and accurate description of this restaurant...'/>
              </Grid.Column>
            </Grid.Row>
            <HiddenField name='owner' value={Meteor.user().username}/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
          </Grid>
        </AutoForm>
    );
  }
}

export default AdminAdd;
