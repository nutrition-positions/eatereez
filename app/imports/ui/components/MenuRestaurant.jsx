import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MenuRestaurant extends React.Component {
  render() {
    return (
        <Header>I tried</Header>
        {(this.props.menu.subheader[0] !== undefined) ? (
            <Segment attached>
              <Header textAlign='center'>{this.props.menu.restaurantName} Menu</Header>
        </Segment>
        ) : ''}
    );
  }
}

/** Require a document to be passed to this component. */
MenuRestaurant.propTypes = {
  menu: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MenuRestaurant);
