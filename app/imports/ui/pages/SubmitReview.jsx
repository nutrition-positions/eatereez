import React from 'react';
import { Stuffs } from '/imports/api/stuff/Stuff';
import { Grid, Segment, Header, Dropdown } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms
import SimpleSchema from 'simpl-schema';

/** Create a schema to specify the structure of the data to appear in the form. */
const reviewSchema = new SimpleSchema({
  title: String,
  stars: Number,
  description: String,
});

/** Renders the Page for adding a document. */
class SubmitReview extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { title, stars, description } = data;
    const owner = Meteor.user().username;
    Stuffs.insert({ title, stars, description, owner },
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
                <Dropdown text='Rating'>
                  <Dropdown.Menu>
                    <Dropdown.Item text='5 Stars' />
                    <Dropdown.Item text='4 Stars' />
                    <Dropdown.Item text='3 Stars' />
                    <Dropdown.Item text='2 Stars' />
                    <Dropdown.Item text='1 Stars' />
                  </Dropdown.Menu>
                </Dropdown>
                <LongTextField name='description'/>
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
