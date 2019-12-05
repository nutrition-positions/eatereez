import React from 'react';
import { Reviews, ReviewSchema } from '/imports/api/review/Reviews';
import { Grid, Segment, Header, Dropdown } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Renders the Page for adding a document. */
class SubmitReview extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { title, rating, review, restaurantId, createdAt } = data;
    const owner = Meteor.user().username;
    Reviews.insert({ title, rating, review, restaurantId, owner, createdAt },
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
            <AutoForm ref={ref => { fRef = ref; }} schema={ReviewSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='title'/>
                <Dropdown text='rating'>
                  <Dropdown.Menu>
                    <Dropdown.Item text='5 Stars' />
                    <Dropdown.Item text='4 Stars' />
                    <Dropdown.Item text='3 Stars' />
                    <Dropdown.Item text='2 Stars' />
                    <Dropdown.Item text='1 Stars' />
                  </Dropdown.Menu>
                </Dropdown>
                <LongTextField name='review'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' value={this.props.owner}/>
                <HiddenField name='restaurantId' value={this.props.restaurantId}/>
                <HiddenField name='createdAt' value={new Date()}/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}

export default SubmitReview;