import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import NumField from 'uniforms-semantic/NumField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';
import { Reviews } from '../../api/review/Reviews';

/** Create a schema to specify the structure of the data to appear in the form. */
const reviewSchema = new SimpleSchema({
  title: String,
  stars: Number,
  description: String,
  owner: String,
  createdAt: String,
});

/** Renders the Page for adding a document. */
class SubmitReview extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { title, stars, description, createdAt } = data;
    const owner = Meteor.user().username;
    Reviews.insert({ title, stars, description, owner, createdAt },
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
            <AutoForm ref={ref => { fRef = ref; }} schema={reviewSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='title'/>
                <NumField name='stars' decimal={true}/>
                <LongTextField name='description'/>
                <HiddenField name='createdAt' value={new Date()}/>
                <HiddenField name='owner'/>
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
