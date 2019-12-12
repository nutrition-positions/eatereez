import React from 'react';
import { Header, Image, Grid, Divider, Rating, Label, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class MenuDetails extends React.Component {
  render() {
    return (
        <div>
          <Segment raised>

          </Segment>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
MenuDetails.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MenuDetails);
