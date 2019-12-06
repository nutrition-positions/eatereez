import React from 'react';
import { Reviews } from '/imports/api/review/Reviews.js';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';

/** Create a schema to specify the structure of the data to appear in the form. */
const ReviewFormSchema = new SimpleSchema({
  title: String,
  rating: String,
  description: String,
  submittedAt: String,
});

/** Renders the Page for adding a document. */
class SubmitReview extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { title, rating, description, submittedAt } = data;
    const submittedBy = Meteor.user().username;
    Reviews.insert({ title, rating, description, submittedAt, submittedBy },
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
            <Header as="h2" textAlign="center">Submit a Review</Header>
            <AutoForm ref={ref => { fRef = ref; }}
                      schema={ReviewFormSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField label='Review Title:' name='title'/>
                <TextField label='Rating (From 1 to 5 stars):' name='description'/>
                <LongTextField label='Review Description:' name='hours'/>
                <TextField label='Review Menu: (optional)' name='menu'/>
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

export default SubmitReview;
