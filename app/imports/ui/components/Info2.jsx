import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Header, Grid, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Info2 extends React.Component {
  render() {
    return (
        <div className='landing-info2'>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column textAlign='center'>
                <Image size='large' src={'/images/campus 2.jpg'} centered rounded/>
              </Grid.Column>
              <Grid.Column>
                <Header as='h1'>
                  Help us grow as a community
                </Header>
                <Header as='h2'>
                  You can improve us by adding rating and adding comments to places you have been!<br/>
                  If you see any comments that contain bad language,
                  please use the report button underneath the comment. <br/>
                </Header>
                {this.props.currentUser !== '' ? ''
                    : <div>
                      <Header as='h2'>
                      You can only do this if you&apos;re logged in!<br/></Header>
                      <Header as='h2' inverted><Link color='light blue' to='/signin'>Click here to login</Link></Header>
                    </div>
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
    );
  }
}


/** Declare the types of all properties. */
Info2.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const Info2Container = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Info2);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(Info2Container);
