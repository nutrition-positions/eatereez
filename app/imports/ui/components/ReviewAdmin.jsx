import React from 'react';
import { Comment, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Reviews } from '../../api/review/Reviews';
import { Reports } from '../../api/report/Report';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class reportAdmin extends React.Component {
  handleClick = () => Reviews.remove(this.props.review._id)

  unreport = () => Reports.remove(this.props.report._id)

  render() {
    return (
        <Comment>
          <Comment.Avatar src='/images/default-user.png' />
          <Comment.Content>
            <Comment.Author as='a'>{this.props.report.title}</Comment.Author>
            <Comment.Metadata>
              <div>{this.props.report.stars} / 5<Icon name='star' /></div>
              <div>{this.props.report.createdAt} by {this.props.report.owner}</div>
            </Comment.Metadata>
            <Comment.Text>
              {this.props.report.description}
            </Comment.Text>
            <Comment.Actions>
                  <Comment.Action onClick={this.handleClick}>
                    Delete
                  </Comment.Action>
              <Comment.Action onClick={this.unreport}>
                Un-Report
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
    );
  }
}

/** Require a document to be passed to this component. */
reportAdmin.propTypes = {
  report: PropTypes.object.isRequired,
  review: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(reportAdmin);
