import React from 'react';
import { Button, Card, Comment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Reviews } from '../../api/review/Reviews';
import { Reports } from '../../api/report/Report';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ReviewAdmin extends React.Component {

  deleteReview = () => {
    Reports.remove(this.props.report._id);
    Reviews.remove(this.props.review[0]._id);
  }

  unreport = () => Reports.remove(this.props.report._id);

  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>
              <Link color='black' to={`/details/${this.props.review[0].restaurantId}`}>
                {this.props.review[0].title}
              </Link>
            </Card.Header>
            <Card.Meta><Comment.Avatar src='/images/default-user.png'/>{this.props.review[0].owner}</Card.Meta>
            <Card.Description>
              Rating: {this.props.review[0].stars} <br />
              Review description: {this.props.review[0].description} <br />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            Review made on {this.props.review[0].createdAt}
          </Card.Content>
          <Card.Content>
            <Comment.Group>
              <Comment>
                <Comment.Content>
                  <Comment.Author>{this.props.report.title}</Comment.Author>
                  <Comment.Metadata>
                    <div>Report made at {this.props.report.createdAt} by {this.props.report.reporter}</div>
                  </Comment.Metadata>
                  <Comment.Text>
                    {this.props.report.description}
                  </Comment.Text>
                  <Comment.Actions>
                    <Comment.Action onClick={this.unreport}>
                      Remove Report
                    </Comment.Action>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            </Comment.Group>
          </Card.Content>
          <Card.Content>
            <Button color='red' onClick={this.deleteReview}>Delete Offending Review </Button>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
ReviewAdmin.propTypes = {
  report: PropTypes.object.isRequired,
  review: PropTypes.array.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ReviewAdmin);
