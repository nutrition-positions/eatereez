import React from 'react';
import { Feed, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Review extends React.Component {
  render() {
    return (
        <Feed.Event>
          <Feed.Content>
            <Feed.Summary>
              <a>{this.props.review.owner}</a>posted at
              <Feed.Date content={this.props.review.createdAt} />
              {this.props.review.title}
            </Feed.Summary>
            <Feed.Extra text>
              {this.props.review.description}
            </Feed.Extra>
            <Feed.Meta>
              <Feed.Like>
                {this.props.review.stars} / 5
                <Icon name='star' />
              </Feed.Like>
            </Feed.Meta>
          </Feed.Content>
        </Feed.Event>
    );
  }
}

/** Require a document to be passed to this component. */
Review.propTypes = {
  review: PropTypes.object,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Review);
