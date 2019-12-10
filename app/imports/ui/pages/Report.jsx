import React from 'react';
import { Reports } from '../../api/report/Report';
import { Grid, Segment, Header, Container } from 'semantic-ui-react';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import 'uniforms-bridge-simple-schema-2'; // required for Uniforms

/** Create a schema to specify the structure of the data to appear in the form. */
const formSchema = new SimpleSchema({
  title: String,
  description: String,
  reporter: String,
  createdAt: String,
});

/** Renders the Page for adding a document. */
class Report extends React.Component {

  /** On submit, insert the data. */
  submit(data, formRef) {
    const { title, description } = data;
    const reporter = Meteor.user().username;
    Reports.insert({ title, description, reporter },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Notification sent!', 'success');
            formRef.reset();
          }
        });
  }

  /** Render the form. Use Uniforms: https://github.com/vazco/uniforms */
  render() {
    let fRef = null;
    const formStyle = { paddingTop: '20px', paddingBottom: '50px' };
    return (
        <div className='background'>
          <Container>
            <Grid container centered style={formStyle}>
              <Grid.Column>
                <Header as="h2" textAlign="center">Report Listing</Header>
                <AutoForm ref={ref => {
                  fRef = ref;
                }} schema={formSchema} onSubmit={data => this.submit(data, fRef)}>
                  <Segment>
                    <TextField name='title' placeholder='Reason for report.'/>
                    <LongTextField
                        name='description'
                        placeholder='More explanation as to why you&apos;re reporting.'/>
                    <SubmitField value='Submit'/>
                    <ErrorsField/>
                  </Segment>
                </AutoForm>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
    );
  }
}

// /** Require a document to be passed to this component. */
// Report.propTypes = {
//   stuff: PropTypes.object.isRequired,
// };

export default Report;
