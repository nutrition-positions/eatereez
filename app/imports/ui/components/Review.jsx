import React from 'react';
import { Comment, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Review extends React.Component {
  render() {
    return (
        <Comment>
          <Comment.Avatar src='/images/default-user.png' />
            <Comment.Content>
              <Comment.Author as='a'>{this.props.review.title}</Comment.Author>
              <Comment.Metadata>
                <div>{this.props.review.stars} / 5<Icon name='star' /></div>
                <div>{this.props.review.createdAt} by {this.props.review.owner}</div>
              </Comment.Metadata>
              <Comment.Text>
                {this.props.review.description}
              </Comment.Text>
              <Comment.Actions>
                <Comment.Action></Comment.Action>
              </Comment.Actions>
            </Comment.Content>
        </Comment>
    );
  }
}

/** Require a document to be passed to this component. */
Review.propTypes = {
  review: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Review);
