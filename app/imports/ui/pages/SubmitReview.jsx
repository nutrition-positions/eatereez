import React from 'react';
import { Reviews } from '/imports/api/review/Reviews';
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
import PropTypes from 'prop-types';
import SimpleSchema from 'simpl-schema';

const formSchema = new SimpleSchema({
  title: String,
  description: String,
  stars: String,
  restaurantId: String,
  createdAt: Date,
  owner: String,
});

/** Renders the Page for adding a document. */
class SubmitReview extends React.Component {

  /** On submit, insert the data. */
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

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Write a Review of {} </Header>
            <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
              <Segment>
                <TextField name='title'/>
                <TextField name='stars'/>
                <LongTextField name='description'/>
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

SubmitReview.propTypes = {
  owner: PropTypes.string.isRequired,
  restaurantId: PropTypes.string.isRequired,
};

export default SubmitReview;
