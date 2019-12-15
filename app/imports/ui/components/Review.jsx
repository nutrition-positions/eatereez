import React from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Comment, Rating } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, NavLink } from 'react-router-dom';
import { Reviews } from '../../api/review/Reviews';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Review extends React.Component {
  handleClick = () => Reviews.remove(this.props.review._id)

  render() {
    return (
        <Comment>
          <Comment.Avatar src='/images/default-user.png' />
            <Comment.Content>
              <Comment.Author>{this.props.review.title}</Comment.Author>
              <Comment.Metadata>
                <Rating icon='star' defaultRating={this.props.review.stars} maxRating={5} disabled />
                <div>{this.props.review.createdAt} by {this.props.review.owner}</div>
              </Comment.Metadata>
              <Comment.Text>
                {this.props.review.description}
              </Comment.Text>
              <Comment.Actions>
                {(this.props.review.owner === this.props.currentUser) ?
                    <Comment.Action onClick={this.handleClick}>
                  Delete
                </Comment.Action> : '' }
                {this.props.currentUser ?
                    <Comment.Action as={NavLink} to={`/report/${this.props.review._id}`}>
                  Report
                </Comment.Action> : '' }
              </Comment.Actions>
            </Comment.Content>
        </Comment>
    );
  }
}

/** Require a document to be passed to this component. */
Review.propTypes = {
  review: PropTypes.object.isRequired,
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const ReviewContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(Review);

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ReviewContainer);
