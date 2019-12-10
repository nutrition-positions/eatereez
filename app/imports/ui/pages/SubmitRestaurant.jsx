import React from 'react';
import { Grid, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import { Submits } from '/imports/api/submit/Submits';
import SimpleSchema from 'simpl-schema';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  submissionName: String,
  address: String,
  hours: String,
  phoneNumber: {
    type: String,
    required: false,
  },
  menu: {
    type: String,
    required: false,
  },
  logo: {
    type: String,
    required: false,
  },
  description: String,
  website: String,
  submittedAt: String,
});

/** Renders the Page for adding a document. */
class SubmitRestaurant extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { submissionName, address, hours, menu, phoneNumber, logo, website, description, submittedAt } = data;
    const submittedBy = Meteor.user().username;
    Submits.insert({
          submissionName, address, hours, menu, phoneNumber, logo, website, description, submittedAt, submittedBy },
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
                <Header as="h2" textAlign="center">Submit a Restaurant</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <Header as="h4" textAlign="center">Submit a request for us to add your favorite restaurant!</Header>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={3}>
              <Grid.Column>
                <TextField label='Restaurant Name:' name='submissionName'
                           placeholder='e.g. McRonalds'/>
              </Grid.Column>
              <Grid.Column>
                <TextField label='Restaurant Phone Number: (optional)' name='phoneNumber' required={false}
                           placeholder='e.g. 808-555-5555'/>
              </Grid.Column>
              <Grid.Column>
                <TextField label='Restaurant Hours:' name='hours'
                           placeholder='e.g. 08:00AM - 04:30PM'/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <TextField label='Restaurant Address:' name='address'
                           placeholder='e.g. 123 Manoa Lane'/>
              </Grid.Column>
              <Grid.Column>
                <TextField label='Restaurant Website:' name='website'
                           placeholder='e.g. www.McRonalds'/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <TextField label='Restaurant Menu: (optional)' name='menu' required={false}
                           placeholder='e.g. www.McRonalds.com/menu'/>
              </Grid.Column>
              <Grid.Column>
                <TextField label='Restaurant Logo: (optional)' name='logo' required={false}
                           placeholder='e.g. www.McRonalds/logo'/>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <LongTextField label='Restaurant Description:' name='description'
                               placeholder='Please enter professional and accurate description of this restaurant...'/>
              </Grid.Column>
            </Grid.Row>
            <HiddenField name='submittedAt' value={new Date()}/>
            <SubmitField value='Submit'/>
            <ErrorsField/>
          </Grid>
        </AutoForm>
    );
  }
}

export default SubmitRestaurant;
