import React from 'react';
import { Submits } from '/imports/api/submit/Submits.js';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  submissionName: String,
  location: String,
  hours: String,
  menu: String,
  submittedAt: String,
});

/** Renders the Page for adding a document. */
class SubmitRestaurant extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { submissionName, location, hours, menu, submittedAt } = data;
    const submittedBy = Meteor.user().username;
    Submits.insert({ submissionName, location, hours, menu, submittedAt, submittedBy },
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
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Submit a Restaurant</Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField label='Restaurant Name:' name='submissionName'/>
                <TextField label='Restaurant Location:' name='location'/>
                <TextField label='Restaurant Hours:' name='hours'/>
                <TextField label='Restaurant Menu:' name='menu'/>
                <HiddenField name='submittedAt' value={new Date()}/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default SubmitRestaurant;
