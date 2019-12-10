import React from 'react';
import { Header, Image, Grid, Divider, Icon, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';


/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Restaurant extends React.Component {
  render() {
    return (
        <div>
          <Grid>
              <Grid.Column container width={2} floated='center'>
                <Grid.Row>
                <Image fluid left src={this.props.restaurant.logo} />
                </Grid.Row>
              </Grid.Column>
            <Grid.Column width={6}>
              <Grid.Row>
                <Header as='h1' centered><Link color='black' to={`/details/${this.props.restaurant._id}`}>
                  {this.props.restaurant.name}</Link></Header>
              </Grid.Row>
              <Grid.Row>
                <Label as='h4' floated='left'>
                  Rating
                  <Label.Detail>{this.props.restaurant.rating} / 5</Label.Detail>
                  <Icon name='star' color='yellow' />
                </Label>
              </Grid.Row>
              <Divider hidden />
              <Grid.Row>
              <Header as='h4' textAlign='left'>{this.props.restaurant.description}</Header>
              </Grid.Row>
            </Grid.Column>
              <Grid.Column width={6} >
                <Grid.Row>
                    <Header as='h4' textAlign='left'>Phone number: {this.props.restaurant.phoneNumber}</Header>
                </Grid.Row>
                <Divider hidden />
                <Grid.Row>
                    <Header as='h4' textAlign='left'>Hours: {this.props.restaurant.hours}</Header>
                </Grid.Row>
                <Divider hidden />
                <Grid.Row>
                </Grid.Row>
                <Divider hidden />
                <Grid.Row>
                    <Header as='h4' textAlign='left'>Address: {this.props.restaurant.address}</Header>
                </Grid.Row>
                <Divider hidden />
                <Grid.Row>
                <Header as='h4' textAlign='left'>Website URL: {this.props.restaurant.website}</Header>
                </Grid.Row>
              </Grid.Column>
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
