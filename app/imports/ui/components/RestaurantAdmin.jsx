import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { NavLink, withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RestaurantAdmin extends React.Component {
  render() {
    return (
        <Card centered>
          <Card.Content>
            <Card.Header as={NavLink} activeClassName="active" exact to="/restaurant" key='restaurant'>
              {this.props.submit.submissionName}</Card.Header>
            <Card.Meta>{this.props.submit.submittedBy}</Card.Meta>
            <Card.Description>
              Location: {this.props.submit.location} <br />
              Hours: {this.props.submit.hours} <br />
              Menu: {this.props.submit.menu} <br />
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            {this.props.submit.submittedAt}
          </Card.Content>
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
RestaurantAdmin.propTypes = {
  submit: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RestaurantAdmin);
