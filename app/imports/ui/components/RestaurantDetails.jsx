import React from 'react';
import { Header, Image, Grid, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class RestaurantDetails extends React.Component {
  render() {
    return (
        <Grid.Row >
          <Grid.Column width={5}>
            <Image size='large' src={this.props.restaurant.logo} />
          </Grid.Column>
          <Grid.Column width={5}>
            <Header as='h1'>{this.props.restaurant.name}</Header>
            <Header as='h4'>{this.props.restaurant.description}</Header>
            <Header as='h4'>{this.props.restaurant.rating} / 55
              <Icon name='star' color='yellow' />
          </Header>
            <Header as='h4'>Phone number: {this.props.restaurant.phoneNumber}</Header>
            <Header as='h4'>Address: {this.props.restaurant.address}</Header>
          </Grid.Column>
        </Grid.Row>
    );
  }
}

/** Require a document to be passed to this component. */
RestaurantDetails.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(RestaurantDetails);
