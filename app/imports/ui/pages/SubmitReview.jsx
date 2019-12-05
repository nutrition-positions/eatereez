import React from 'react';
import { Reviews, ReviewSchema } from '/imports/api/review/Reviews';
import { Grid, Segment, Header, Form } from 'semantic-ui-react';
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
                <Form.Input
                    label={`Rate out of 5 stars: ${rating} `}
                    min={0}
                    max={5}
                    name='stars'
                    onChange={this.handleChange}
                    step={100}
                    type='range'
                    value={rating}
                />
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
