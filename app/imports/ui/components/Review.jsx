import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Comment, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
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
                <div>{this.props.review.stars} / 5<Icon name='star' /> <br /></div>
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
                    <Comment.Action>
                  <Link to={`/report/${this.props.review._id}`}> Report </Link>
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
  currentUser: Meteor.user() ? Meteor.user().username : '',
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Review);
