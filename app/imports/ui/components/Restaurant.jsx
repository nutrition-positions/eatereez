import React from 'react';
import { Header, Image, Grid, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Restaurant extends React.Component {
  render() {
    const resStyle = { paddingTop: '60px' };
    return (
        <div className={resStyle} >
        <Grid.Row >
          <Grid.Column width={5}>
            <Image size='large' src={this.props.restaurant.image} />
          </Grid.Column>
          <Grid.Column width={5}>
            <Header as='h1'>{this.props.restaurant.name}</Header>
            <Header as='h4'>{this.props.restaurant.description}</Header>
            <Header as='h4'>{this.props.restaurant.rating} / 5 <Icon color='yellow' name='star' /></Header>
            <Header as='h4'>Phone number: {this.props.restaurant.phoneNumber}</Header>
            <Header as='h4'>Address: {this.props.restaurant.address}</Header>
            <Header as='h5'><Link to={`/details/${this.props.restaurant._id}`}>More...</Link></Header>
          </Grid.Column>
        </Grid.Row>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
Restaurant.propTypes = {
  restaurant: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(Restaurant);
