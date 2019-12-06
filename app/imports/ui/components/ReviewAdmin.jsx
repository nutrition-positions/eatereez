import React from 'react';
import { Card, Button, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Reviews } from '../../api/review/Reviews';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RestaurantAdmin extends React.Component {

  handleClick = () => Reviews.remove(this.props.review._id);

  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header>
              {this.props.review.submissionName}</Card.Header>
            <Card.Meta>{this.props.review.reviewedBy}</Card.Meta>
            <Card.Description>
              Location: {this.props.review.location} <br />
              Hours: {this.props.review.hours} <br />
              Menu: {this.props.review.menu} <br />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {this.props.review.reviewedAt}
          </Card.Content>
          <Card.Content>
            <Button animated>
              <Button.Content visible>
              <Icon name='trash alternate' />
            </Button.Content>
              <Button.Content hidden onClick={this.handleClick}>Delete</Button.Content>
            </Button>
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
RestaurantAdmin.propTypes = {
  review: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RestaurantAdmin);
