import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Card, Comment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withTracker } from 'meteor/react-meteor-data';
import { Reviews } from '../../api/review/Reviews';
import { Reports } from '../../api/report/Report';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ReviewAdmin extends React.Component {
  handleClick = () => Reviews.remove(this.props.review._id)

  unreport = () => Reports.remove(this.props.report._id)

  render() {

    const filteredReview = Reviews.find({}, { _id: this.props.report.reviewId });

    return (
        <Card centered>
          <Card.Content>
            <Card.Header>
              {filteredReview.title}</Card.Header>
            <Card.Meta>{filteredReview.owner}</Card.Meta>
            <Card.Description>
              Rating: {filteredReview.stars} <br />
              Review description: {filteredReview.description} <br />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {filteredReview.createdAt}
          </Card.Content>
          <Card.Content>
            <Comment.Group>
              <Comment>
                <Comment.Avatar src='/images/default-user.png'/>
                <Comment.Content>
                  <Comment.Author as='a'>{this.props.report.title}</Comment.Author>
                  <Comment.Metadata>
                    <div>{this.props.report.createdAt} by {this.props.report.reporter}</div>
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
            <Button color='red'>
              <Button.Content onClick={this.handleClick}>Delete Reported Review </Button.Content>
            </Button>
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
export default withTracker(() => {
  const subscription2 = Meteor.subscribe('Reviews');
  return {
    review: Reviews.find({}).fetch(),
    ready: subscription2.ready(),
  };
})(ReviewAdmin);
