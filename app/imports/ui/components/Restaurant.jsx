import React from 'react';
import { Header, Image, Grid, Divider, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Restaurant extends React.Component {
  render() {
    return (
        <div>
          <Grid>
            <Grid.Row >
              <Grid.Column width={5}>
                <a to={`/details/${this.props.restaurant._id}`}>
                  <Image size='large' centered src={this.props.restaurant.logo} />
                </a>
              </Grid.Column>
              <Grid.Column width={5}>
                <Header as='h1'><Link color='black' to={`/details/${this.props.restaurant._id}`}>
                  {this.props.restaurant.name}</Link></Header>
                <Header as='h4'>{this.props.restaurant.description}</Header>
                <Header as='h4'>{this.props.restaurant.rating} / 5
                  <Icon name='star' color='yellow' /></Header>
                <Header as='h4'>Phone number: {this.props.restaurant.phoneNumber}</Header>
                <Header as='h4'>Hours: {this.props.restaurant.hours}</Header>
                <Header as='h4'>Address: {this.props.restaurant.address}</Header>
                <Header as='h4'>Website URL: {this.props.restaurant.website}</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider/>
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
